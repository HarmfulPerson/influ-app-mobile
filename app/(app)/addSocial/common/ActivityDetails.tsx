import { RadioGroup, View, YStack, Text } from "tamagui";
import Colors from "../../../../constants/Colors";
import Input from "../../../components/Input/Input";
import DateTimePicker from "../../../components/DatePicker/DatePicker";
import { styles } from "../styles/activities";
import { SOCIAL_TYPES } from "../../../../constants/Main";
import { Errors } from "../steps/Activities";
import * as yup from "yup";
import { useState, useImperativeHandle, forwardRef } from "react";
import { validate } from "../../../../utils/yup";
import { EXPOSITION_TYPES, SOCIAL_ALL_TYPES, SOCIAL_TYPES_POSSIBILITIES } from "../../../../constants/Social";
import React from "react";
import { addDays, setHours, setMinutes, setSeconds } from "date-fns";
import { SocialCreateBody } from "../../../types/social";

const validationSchema = yup.object().shape({
  payment: yup.object().shape({
    price: yup.number().required("Cena jest wymagana").min(0, "Cena nie może być ujemna"),
  }),
  livePeriod: yup.number().when("type", ([type], schema) => {
    if (type === "live") {
      return schema.min(1, "Ilość godzin nie może być ujemna").required("Ilość godzin jest wymagana");
    }
    return schema.notRequired();
  }),
  minimalAverageViewers: yup.number().when("type", ([type], schema) => {
    if (type === "live") {
      return schema.min(1, "Minimalna średnia widownia musi być większa niż 0").required("Minimalna średnia widownia jest wymagana");
    }
    return schema.notRequired();
  }),
  platform: yup.string().required("Platforma jest wymagana"),
  expositionType: yup.string().when(["platform", "type"], ([platform, type], schema) => {
    if (platform === SOCIAL_TYPES.twitch || (platform === SOCIAL_TYPES.youtube && type === SOCIAL_ALL_TYPES.live)) {
      return schema.required("Typ ekspozycji jest wymagany");
    }
    return schema.notRequired();
  }),
  type: yup.string().required("Typ jest wymagany"),
});

type Props = {
  platform: SocialCreateBody;
  setPlatformsToComplete: React.Dispatch<React.SetStateAction<SocialCreateBody[]>>;
};

const ActivityDetails = forwardRef((props: Props, ref) => {
  const { platform, setPlatformsToComplete } = props;
  const cocreatedPossibilities = [SOCIAL_TYPES.instagram, SOCIAL_TYPES.facebook];
  const [error, setError] = useState<Errors>({});
  const tomorrow = setSeconds(setMinutes(setHours(addDays(new Date(), 1), 0), 0), 0);
  const handleChangeRecord = (newObject: SocialCreateBody) => {
    setPlatformsToComplete((prevValues: SocialCreateBody[]) =>
      prevValues.map((value: SocialCreateBody) => {
        if (value.id === newObject.id) {
          return { ...value, ...newObject };
        } else {
          return value;
        }
      })
    );
  };

  const handleValidate = async (): Promise<Errors> => {
    const validationData = {
      payment: {
        price: Number(platform.payment.price) ?? 0,
      },
      livePeriod: platform.livePeriod ?? 0,
      minimalAverageViewers: platform.minimalAverageViewers ?? 0,
      expositionType: platform.expositionType ?? "",
      type: platform.type ?? "",
      platform: platform.platform ?? "",
    };
    const errors = await validate(validationSchema as any, validationData);
    setError(errors);
    return errors;
  };

  useImperativeHandle(ref, () => ({
    handleValidate,
  }));

  return (
    <View>
      <RadioGroup value={platform.type} onValueChange={(value) => handleChangeRecord({ ...platform, type: value })}>
        <YStack gap={12}>
          <View style={styles.containerActivityDetails}>
            {SOCIAL_TYPES_POSSIBILITIES[platform.platform as keyof typeof SOCIAL_TYPES_POSSIBILITIES].map((type: string) => (
              <>
                <View onPress={() => handleChangeRecord({ ...platform, type })} style={error.type ? { ...styles.radioButton, borderColor: "red" } : styles.radioButton}>
                  <RadioGroup.Item value={type} borderColor={Colors.primary.surface.lighter} backgroundColor={Colors.grayscale.surface.default} style={styles.socialTypeRadio}>
                    <RadioGroup.Indicator backgroundColor={Colors.primary.surface.subtle} width={14} height={14} />
                  </RadioGroup.Item>
                  <Text style={styles.radioLabel}>{type}</Text>
                </View>
                {platform.type === type && (
                  <View style={styles.extraDataContainer}>
                    <Text style={styles.inputLabel}>Cena (PLN)</Text>
                    <Input value={`${platform.payment.price}`} onChangeText={(price) => handleChangeRecord({ ...platform, payment: { ...platform.payment, price: +price } })} keyboardType="numeric" styleInput={styles.priceInput} error={!!error.price} infoMessage={error.price} />
                    <Text style={styles.inputLabel}>Data realizacji</Text>
                    <DateTimePicker type="date" date={platform.publishDate} minimumDate={tomorrow} confirmText="Potwierdzam" cancelText="Anuluj" onChange={(value) => handleChangeRecord({ ...platform, publishDate: value })} />
                    {type === "live" && (
                      <View style={styles.liveTypeCotnainer}>
                        <Text style={styles.inputLabel}>Ilość godzin(miesiąc)</Text>
                        <Input
                          value={platform.livePeriod !== undefined ? `${platform.livePeriod}` : ""}
                          placeholder="0"
                          onChangeText={(livePeriod) =>
                            handleChangeRecord({
                              ...platform,
                              livePeriod: livePeriod === "" ? undefined : +livePeriod,
                            })
                          }
                          keyboardType="numeric"
                          styleInput={styles.priceInput}
                          error={!!error.livePeriod}
                          infoMessage={error.livePeriod}
                        />
                        <Text style={styles.inputLabel}>Minimalna średnia widownia</Text>
                        <Input
                          value={platform.minimalAverageViewers !== undefined ? `${platform.minimalAverageViewers}` : ""}
                          placeholder="0"
                          onChangeText={(minimalAverageViewers) =>
                            handleChangeRecord({
                              ...platform,
                              minimalAverageViewers: minimalAverageViewers === "" ? undefined : +minimalAverageViewers,
                            })
                          }
                          keyboardType="numeric"
                          styleInput={styles.priceInput}
                          error={!!error.minimalAverageViewers}
                          infoMessage={error.minimalAverageViewers}
                        />
                        <Text style={styles.inputLabel}>Typ ekspozycji live</Text>
                        <RadioGroup value={platform.expositionType} onValueChange={(expositionType) => handleChangeRecord({ ...platform, expositionType })}>
                          <View style={styles.passiveActiveContainer}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                              <View onPress={() => handleChangeRecord({ ...platform, expositionType: EXPOSITION_TYPES.passive })} style={styles.radioHalfWidthButton}>
                                <RadioGroup.Item value={EXPOSITION_TYPES.passive} borderColor={Colors.primary.surface.lighter} backgroundColor={Colors.grayscale.surface.default} style={styles.expositionRadio}>
                                  <RadioGroup.Indicator backgroundColor={Colors.primary.surface.subtle} width={8} height={8} />
                                </RadioGroup.Item>
                                <Text style={styles.radioLabelExpositionType}>Pasywny</Text>
                              </View>
                              <View onPress={() => handleChangeRecord({ ...platform, expositionType: EXPOSITION_TYPES.active })} style={styles.radioHalfWidthButton}>
                                <RadioGroup.Item value={EXPOSITION_TYPES.active} borderColor={Colors.primary.surface.lighter} backgroundColor={Colors.grayscale.surface.default} style={styles.expositionRadio}>
                                  <RadioGroup.Indicator backgroundColor={Colors.primary.surface.subtle} width={8} height={8} />
                                </RadioGroup.Item>
                                <Text style={styles.radioLabelExpositionType}>Aktywny</Text>
                              </View>
                            </View>
                            <View style={styles.expositionErrorContainer}>{error.expositionType && <Text style={styles.errorText}>{error.expositionType}</Text>}</View>
                          </View>
                        </RadioGroup>
                      </View>
                    )}
                    {cocreatedPossibilities.includes(platform.platform) && (
                      <>
                        <View style={styles.isCocreatedTitleContainer}>
                          <Text style={styles.inputLabel}>Stworzony w kolaboracji</Text>
                        </View>
                        <RadioGroup value={platform.isCocreated ? "true" : "false"} onValueChange={(isCocreated) => handleChangeRecord({ ...platform, isCocreated: isCocreated === "true" })}>
                          <View style={styles.isCocreatedContainer}>
                            <View onPress={() => handleChangeRecord({ ...platform, isCocreated: true })} style={styles.radioHalfWidthButton}>
                              <RadioGroup.Item value="true" borderColor={Colors.primary.surface.lighter} backgroundColor={Colors.grayscale.surface.default} style={styles.cocreatedRadio}>
                                <RadioGroup.Indicator backgroundColor={Colors.primary.surface.subtle} width={12} height={12} />
                              </RadioGroup.Item>
                              <Text style={styles.radioLabelCocreated}>Tak</Text>
                            </View>
                            <View onPress={() => handleChangeRecord({ ...platform, isCocreated: false })} style={styles.radioHalfWidthButton}>
                              <RadioGroup.Item value="false" borderColor={Colors.primary.surface.lighter} backgroundColor={Colors.grayscale.surface.default} style={styles.cocreatedRadio}>
                                <RadioGroup.Indicator backgroundColor={Colors.primary.surface.subtle} width={12} height={12} />
                              </RadioGroup.Item>
                              <Text style={styles.radioLabelCocreated}>Nie</Text>
                            </View>
                          </View>
                        </RadioGroup>
                      </>
                    )}
                  </View>
                )}
              </>
            ))}
          </View>
        </YStack>
      </RadioGroup>
    </View>
  );
});

export default ActivityDetails;
