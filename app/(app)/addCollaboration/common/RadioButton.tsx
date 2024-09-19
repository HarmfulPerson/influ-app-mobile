import { RadioGroup, Text, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { styles } from "../styles/startDate";

const RadioButton = (props: any) => {
    const {
        setValue,
        incomingValue,
        radioValue,
        firstRowText,
        secondRowText,
        Icon,
    } = props;

    const textColor =
        incomingValue === radioValue
            ? Colors.grayscale.text.negative
            : Colors.grayscale.border.default;
    const backgroundColor =
        incomingValue === radioValue
            ? Colors.primary.surface.lighter
            : Colors.grayscale.surface.default;
    const radioButton =
        incomingValue === radioValue
            ? Colors.grayscale.text.negative
            : Colors.grayscale.surface.default;
    const radioBorder =
        incomingValue === radioValue
            ? Colors.grayscale.text.negative
            : Colors.grayscale.border.default;
    const radioFill =
        incomingValue === radioValue
            ? Colors.primary.surface.lighter
            : Colors.grayscale.surface.default;
    return (
        <View
            onPress={() => setValue(radioValue)}
            style={[
                styles.radioContainer,
                { backgroundColor: backgroundColor },
            ]}>
            <View style={styles.radioCircleContainer}>
                <RadioGroup.Item
                    borderColor={radioBorder}
                    backgroundColor={radioFill}
                    style={styles.circle}
                    value={radioValue}>
                    <RadioGroup.Indicator
                        backgroundColor={radioButton}
                        width={14}
                        height={14}
                    />
                </RadioGroup.Item>
            </View>
            <View style={styles.textContainer}>
                <View style={styles.firstRowText}>
                    <Text style={[styles.firstRowTitle, { color: textColor }]}>
                        {firstRowText}
                    </Text>
                    {Icon && (
                        <Icon style={{ marginLeft: 8 }} fill={textColor} />
                    )}
                </View>

                <Text style={[styles.secondRowSubtitle, { color: textColor }]}>
                    {secondRowText}
                </Text>
            </View>
        </View>
    );
};

export default RadioButton;
