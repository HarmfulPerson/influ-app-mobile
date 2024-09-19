import { Calendar, Clock } from "lucide-react-native";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { XStack, YStack, Input, Separator, Spacer } from "tamagui";
import Colors from "../../../constants/Colors";

interface datePickerProps {
    date?: Date;
    type: "date" | "time";
    confirmText?: string;
    cancelText?: string;
    accentColor?: string;
    textColor?: string;
    minimumDate?: Date;
    buttonTextColorIOS?: string;
    onChange?: (date: Date) => void;
    onConfirm?: (date: Date) => void;
}

const DateTimePicker = function DatePicker(props: datePickerProps) {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(props.date);

    useEffect(() => {
        setDate(props.date);
    }, [props.date]);

    const hideDatePicker = () => {
        setShow(false);
    };

    const handleConfirm = (date: Date) => {
        setDate(date);
        props.onConfirm && props.onConfirm(date);
        hideDatePicker();
    };

    const type = props.type || "date";

    return (
        <Pressable onPress={() => setShow(true)}>
            <XStack alignItems={"center"} justifyContent="flex-end">
                <Input
                    color={Colors.grayscale.border.disabled}
                    pointerEvents="none"
                    style={{
                        height: 60,
                    }}
                    editable={false}
                    backgroundColor={Colors.grayscale.surface.darker}
                    borderColor={Colors.grayscale.surface.default}
                    flexGrow={1}>
                    {type === "date" && date?.toLocaleDateString()}

                    {type === "time" && date?.toLocaleTimeString()}
                </Input>

                <XStack paddingRight={10} position="absolute">
                    {type === "date" && (
                        <Calendar
                            color={Colors.grayscale.text.body}
                            width={16}
                            strokeWidth={1}
                            style={{ marginRight: 4 }}
                            height={16}
                        />
                    )}

                    {type === "time" && (
                        <Clock
                            color={Colors.grayscale.text.body}
                            width={16}
                            style={{ marginRight: 4 }}
                            height={16}
                        />
                    )}
                </XStack>
            </XStack>

            <DateTimePickerModal
                cancelTextIOS={props.cancelText}
                confirmTextIOS={props.confirmText}
                date={date}
                isVisible={show}
                mode={type}
                // display="inline"
                minimumDate={props.minimumDate}
                accentColor={props.accentColor}
                textColor={props.textColor}
                buttonTextColorIOS={props.buttonTextColorIOS}
                onChange={props.onChange}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </Pressable>
    );
};

export default DateTimePicker;
