import { Stack, router } from "expo-router";
import {
    Paragraph,
    Separator,
    XStack,
    Text,
    View,
    Button,
    Form,
} from "tamagui";
import { styles } from "./styles/add";
import CustomInput from "../../../components/CustomInput";
import { useCallback, useEffect, useState } from "react";
import { CheckboxWithLabel } from "../../../components/CheckboxWithLabel";
import CustomTextarea from "../../../components/CustomTextarea";
import {
    Keyboard,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
} from "react-native";
import * as yup from "yup";
import { isErrorYupType } from "../../../../utils/yup";
import { addDays } from "date-fns";
import { nullAllKeys } from "../../../../utils/utils";
import DateTimePicker from "@react-native-community/datetimepicker";
import useAuthPostData from "../../../hooks/usePostAuthData";
import { useFocusEffect } from "@react-navigation/native";
import {
    AddCollaborationData,
    AddCollaborationDataErrors,
} from "../../../types/collaboration/add";
import { SOCIAL_TYPES } from "../../../../constants/Main";

const addCollaborationSchema = yup.object().shape({
    startDate: yup
        .date()
        .min(
            addDays(new Date(), 1),
            "Data startu musi być conajmnije jutrzejsza"
        )
        .required("Data startu jest wymagana"),
    campaignName: yup.string().required("Nazwa kampanii jest wymagana"),
    shortDescription: yup.string().required("Krótki opis jest wymagany"),
    neededSocials: yup.array().min(1, "Trzeba wybrać chociaż jedną platformę."),
});
const initialData = {
    startDate: addDays(new Date(), 1),
    campaignName: "",
    shortDescription: "",
    longDescription: "",
    isPrivate: false,
    neededSocials: [],
};
export default function Add() {
    const [addCollaborationData, setAddCollaborationData] =
        useState<AddCollaborationData>(initialData);
    const { postData: sendPostData } = useAuthPostData();
    const [errors, setErrors] = useState<AddCollaborationDataErrors>({
        startDate: null,
        campaignName: null,
        shortDescription: null,
        neededSocials: null,
    });

    useFocusEffect(
        useCallback(() => {
            return () => {
                setAddCollaborationData(initialData);
                setErrors(nullAllKeys(errors));
            };
        }, [])
    );

    const SocialBlock = (props: { label: string }) => {
        const { label } = props;
        return (
            <View
                onPress={() =>
                    handleSocial(
                        SOCIAL_TYPES[label as keyof typeof SOCIAL_TYPES]
                    )
                }
                style={
                    addCollaborationData.neededSocials.includes(
                        SOCIAL_TYPES[label as keyof typeof SOCIAL_TYPES]
                    )
                        ? styles.pickedSocial
                        : styles.socialPicker
                }>
                <Text>{label}</Text>
            </View>
        );
    };

    const handleSocial = (social: string) => {
        const hasSocial = addCollaborationData.neededSocials.includes(social);
        if (hasSocial) {
            setAddCollaborationData({
                ...addCollaborationData,
                neededSocials: addCollaborationData.neededSocials.filter(
                    (eachSocial: string) => eachSocial !== social
                ),
            });
        } else {
            setAddCollaborationData({
                ...addCollaborationData,
                neededSocials: [...addCollaborationData.neededSocials, social],
            });
        }
    };

    const handleAddCollaboration = async () => {
        try {
            await addCollaborationSchema.validate(addCollaborationData, {
                abortEarly: false,
            });
            sendPostData("/collaboration", addCollaborationData);
            router.replace("/(app)/(tabs)");
        } catch (err: any) {
            if (isErrorYupType(err)) {
                const newErrors = {};
                err.inner.forEach(
                    (error: { path: string; errors: Array<string> }) => {
                        (newErrors as any)[error.path] = error.errors[0];
                    }
                );
                const nulledErrors = nullAllKeys(errors);
                setErrors({ ...nulledErrors, ...newErrors });
            }
        }
    };

    return (
        <>
            <Stack.Screen
                options={{
                    headerShown: false,
                }}
            />
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <KeyboardAvoidingView style={styles.container}>
                    <Paragraph>Dodajesz współpracę</Paragraph>
                    <Separator marginVertical={15} />
                    <Form
                        alignItems="center"
                        gap="$2"
                        onSubmit={() => handleAddCollaboration()}
                        style={styles.form}
                        paddingTop="$6"
                        paddingBottom="$14">
                        <Form.Trigger asChild>
                            <>
                                <View style={styles.typeContainer}>
                                    <Text
                                        style={{
                                            alignSelf: "flex-start",
                                            fontSize: 10,
                                            paddingLeft: 12,
                                            paddingBottom: 4,
                                        }}>
                                        Data rozpoczęcia
                                    </Text>
                                    <DateTimePicker
                                        value={addCollaborationData.startDate}
                                        mode="date"
                                        is24Hour={true}
                                        onChange={(event, value) =>
                                            setAddCollaborationData({
                                                ...addCollaborationData,
                                                startDate: value as Date,
                                            })
                                        }
                                    />

                                    <CustomInput
                                        onChangeText={(e: string) =>
                                            setAddCollaborationData({
                                                ...addCollaborationData,
                                                campaignName: e,
                                            })
                                        }
                                        value={
                                            addCollaborationData.campaignName
                                        }
                                        placeholder="Nazwa kampanii"
                                        error={errors.campaignName}
                                    />
                                    <CustomTextarea
                                        label="Krótki opis"
                                        placeholder="wprowadź najważniejsze informacje..."
                                        onChangeText={(e: string) =>
                                            setAddCollaborationData({
                                                ...addCollaborationData,
                                                shortDescription: e,
                                            })
                                        }
                                        value={
                                            addCollaborationData.shortDescription
                                        }
                                        error={errors.shortDescription}
                                    />
                                    <CustomTextarea
                                        label="Szczegółowy opis (opcjonalnie)"
                                        placeholder="wprowadź szczegołowe informacje..."
                                        onChangeText={(e: string) =>
                                            setAddCollaborationData({
                                                ...addCollaborationData,
                                                longDescription: e,
                                            })
                                        }
                                        value={
                                            addCollaborationData.longDescription
                                        }
                                    />
                                    <CheckboxWithLabel
                                        size="$3"
                                        label="Kampania prywatna"
                                        value={
                                            addCollaborationData.isPrivate as string
                                        }
                                        onChange={() =>
                                            setAddCollaborationData({
                                                ...addCollaborationData,
                                                isPrivate:
                                                    !addCollaborationData.isPrivate,
                                            })
                                        }
                                    />
                                    <Paragraph>
                                        Wybierz platformy które Cie interesują
                                    </Paragraph>
                                    <XStack
                                        height={20}
                                        width="$20"
                                        alignItems="center">
                                        <SocialBlock
                                            label={SOCIAL_TYPES.facebook}
                                        />
                                        <SocialBlock
                                            label={SOCIAL_TYPES.instagram}
                                        />
                                        <SocialBlock
                                            label={SOCIAL_TYPES.youtube}
                                        />
                                    </XStack>
                                    <Separator
                                        alignSelf="stretch"
                                        marginVertical={5}
                                    />
                                    <XStack
                                        height={20}
                                        width="$20"
                                        alignItems="center">
                                        <SocialBlock label={SOCIAL_TYPES.x} />
                                        <SocialBlock
                                            label={SOCIAL_TYPES.tiktok}
                                        />
                                        <SocialBlock
                                            label={SOCIAL_TYPES.twitch}
                                        />
                                    </XStack>
                                    <Separator
                                        alignSelf="stretch"
                                        marginVertical={5}
                                    />
                                    <XStack
                                        height={20}
                                        width="$20"
                                        alignItems="center">
                                        <SocialBlock
                                            label={SOCIAL_TYPES.linkedin}
                                        />
                                        <SocialBlock
                                            label={SOCIAL_TYPES.spotify}
                                        />
                                    </XStack>
                                    {errors.neededSocials && (
                                        <Paragraph color="red">
                                            Musisz wybrać conajmniej jedną
                                            platformę
                                        </Paragraph>
                                    )}
                                </View>
                                <Form.Trigger asChild>
                                    <Button style={{ backgroundColor: "red" }}>
                                        Dodaj
                                    </Button>
                                </Form.Trigger>
                            </>
                        </Form.Trigger>
                    </Form>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
    );
}
