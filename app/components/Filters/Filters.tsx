import { useEffect, useImperativeHandle, useState, forwardRef } from "react";
import { View } from "react-native";
import Colors from "../../../constants/Colors";
import { Text, Button as TamaguiButton } from "tamagui";
import { SEXES } from "../../../constants/Main";
import Button from "../Button/Button";
import MaleIcon from "../../../assets/images/men-icon.svg";
import FemaleIcon from "../../../assets/images/female-icon.svg";
import SimpleSlider from "../Slider/Slider";
import { styles } from "./styles";
import { getData } from "../../hooks/useGetData";
import { URL } from "../../../constants/urls";
import { SocialRange } from "../../types/social";

type Props = {
    onChange: (data: {
        age: Array<number>;
        range: Array<SocialRange>;
        sexes: Array<string>;
    }) => void;
    outerAge?: Array<number>;
    outerRange?: Array<SocialRange>;
    outerSexes?: Array<string>;
};

type SocialRangeResponseData = {
    data: Array<SocialRange>;
};

export type FilterRef = {
    setInitial: (
        age: Array<number>,
        range: Array<SocialRange>,
        sexes: Array<string>
    ) => void;
    reset: () => void;
};
const FilterComponent = forwardRef<FilterRef, Props>(
    (props: Props, ref: any) => {
        const { onChange, outerAge, outerRange, outerSexes } = props;
        const [age, setAge] = useState(outerAge?.length ? outerAge : [24, 60]);
        const [range, setRange] = useState<Array<SocialRange>>(
            outerRange?.length ? outerRange : []
        );
        const [sexes, setSexes] = useState<Array<string>>(
            outerSexes?.length ? outerSexes : []
        );
        const ageRange = { min: 15, max: 80 };
        const [socialRanges, setSocialRanges] = useState<
            Record<string, SocialRange>
        >({});

        useEffect(() => {
            getData<SocialRangeResponseData>(URL.socialRange).then(
                (res: SocialRangeResponseData | void) => {
                    if (res)
                        setSocialRanges(
                            res.data.reduce(
                                (acc: {}, value: SocialRange) => ({
                                    ...acc,
                                    [value.name]: value,
                                }),
                                {}
                            )
                        );
                }
            );
        }, []);

        const handleClickSexesButton = (sex: string): void => {
            if (sexes.includes(sex))
                return setSexes(sexes.filter((eachSex) => eachSex !== sex));

            setSexes([...sexes, sex]);
        };

        useEffect(() => {
            onChange({ age, range, sexes });
        }, [age, range, sexes]);

        const reset = () => {
            setAge([24, 60]);
            setRange([]);
            setSexes([]);
        };

        const setInitial = (
            age: Array<number>,
            range: Array<SocialRange>,
            sexes: Array<string>
        ): void => {
            setAge(age);
            setRange(range);
            setSexes(sexes);
        };

        useImperativeHandle(ref, () => ({
            reset,
            setInitial,
        }));

        const handleSetRange = (range: SocialRange) => {
            setRange((prevSocialRanges: SocialRange[]) => {
                const isPicked = prevSocialRanges.some(
                    (item: SocialRange) => item.name === range.name
                );

                if (isPicked) {
                    return prevSocialRanges.filter(
                        (item: SocialRange) => item.name !== range.name
                    );
                } else {
                    return [...prevSocialRanges, range];
                }
            });
        };

        return (
            <>
                <View style={styles.twoButtonsContainer}>
                    <TamaguiButton
                        onPress={() => handleClickSexesButton(SEXES.male)}
                        backgroundColor={
                            sexes.includes(SEXES.male)
                                ? Colors.primary.surface.lighter
                                : Colors.grayscale.surface.default
                        }
                        style={styles.sexButton}>
                        <MaleIcon
                            fill={
                                sexes.includes(SEXES.male)
                                    ? Colors.grayscale.text.negative
                                    : Colors.grayscale.border.default
                            }
                        />
                        <Text
                            color={
                                sexes.includes(SEXES.male)
                                    ? Colors.grayscale.text.negative
                                    : Colors.grayscale.border.default
                            }
                            style={styles.sexLabel}>
                            Mężczyźni
                        </Text>
                    </TamaguiButton>
                    <View style={styles.sexButtonSeparator}></View>
                    <TamaguiButton
                        onPress={() => handleClickSexesButton(SEXES.female)}
                        backgroundColor={
                            sexes.includes(SEXES.female)
                                ? Colors.primary.surface.lighter
                                : Colors.grayscale.surface.default
                        }
                        style={styles.sexButton}>
                        <FemaleIcon
                            fill={
                                sexes.includes(SEXES.female)
                                    ? Colors.grayscale.text.negative
                                    : Colors.grayscale.border.default
                            }
                        />

                        <Text
                            color={
                                sexes.includes(SEXES.female)
                                    ? Colors.grayscale.text.negative
                                    : Colors.grayscale.border.default
                            }
                            style={styles.sexLabel}>
                            Kobiety
                        </Text>
                    </TamaguiButton>
                </View>
                <View style={styles.sliderContainer}>
                    <View style={styles.sliderLabelContainer}>
                        <Text style={styles.ageLabel}>Wiek</Text>
                        <Text style={styles.ageRangeLabel}>
                            {`${age[0]}-${age[1]}`}
                        </Text>
                    </View>
                    <SimpleSlider
                        value={age}
                        onValueChange={(value: any) => setAge(value)}
                        style={{ marginTop: 16 }}
                        width="100%"
                        step={1}
                        max={ageRange.max}
                        min={ageRange.min}
                    />
                    <View style={styles.minMaxAgeLabelContainer}>
                        <Text style={styles.minMaxLabel}>
                            {`${ageRange.min} lat`}
                        </Text>
                        <Text style={styles.minMaxLabel}>
                            {`${ageRange.max} lat`}
                        </Text>
                    </View>
                    <View style={styles.reachContainer}>
                        <Text style={styles.reachTitle}>
                            Zasięg na social mediach
                        </Text>
                        {!!Object.keys(socialRanges).length && (
                            <View style={styles.reachButtonsContainer}>
                                <Button
                                    text={socialRanges.micro.displayName}
                                    onPress={() =>
                                        handleSetRange(socialRanges.micro)
                                    }
                                    style={styles.buttonMicro}
                                    variant={
                                        range.some(
                                            (item: any) =>
                                                item.name ===
                                                socialRanges.micro.name
                                        )
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <View style={styles.separator}></View>
                                <Button
                                    text={socialRanges.small.displayName}
                                    onPress={() =>
                                        handleSetRange(socialRanges.small)
                                    }
                                    style={styles.buttonSmall}
                                    variant={
                                        range.some(
                                            (item: any) =>
                                                item.name ===
                                                socialRanges.small.name
                                        )
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <View style={styles.separator}></View>
                                <Button
                                    text={socialRanges.medium.displayName}
                                    onPress={() =>
                                        handleSetRange(socialRanges.medium)
                                    }
                                    style={styles.buttonMedium}
                                    variant={
                                        range.some(
                                            (item: any) =>
                                                item.name ===
                                                socialRanges.medium.name
                                        )
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                                <Button
                                    text={socialRanges.big.displayName}
                                    onPress={() =>
                                        handleSetRange(socialRanges.big)
                                    }
                                    variant={
                                        range.some(
                                            (item: any) =>
                                                item.name ===
                                                socialRanges.big.name
                                        )
                                            ? "primary"
                                            : "secondary"
                                    }
                                    style={styles.buttonBig}
                                />
                                <View style={styles.separator}></View>
                                <Button
                                    text={socialRanges.large.displayName}
                                    onPress={() =>
                                        handleSetRange(socialRanges.large)
                                    }
                                    style={styles.buttonLarge}
                                    variant={
                                        range.some(
                                            (item: any) =>
                                                item.name ===
                                                socialRanges.large.name
                                        )
                                            ? "primary"
                                            : "secondary"
                                    }
                                />
                            </View>
                        )}
                    </View>
                </View>
            </>
        );
    }
);

export default FilterComponent;
