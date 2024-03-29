import { Check as CheckIcon } from "lucide-react-native";
import type { CheckboxProps, CheckedState, SizeTokens } from "tamagui";
import { Checkbox, Label, XStack, YStack } from "tamagui";

export function CheckboxWithLabel({
    size,
    label,
    onChange,
    value,
    ...checkboxProps
}: CheckboxProps & {
    size: SizeTokens;
    label?: string;
    onChange: any;
    value: any;
}) {
    const id = `checkbox-${size.toString().slice(1)}`;
    return (
        <XStack width={300} alignItems="center" space="$4">
            <Checkbox
                id={id}
                name={id}
                size={size}
                checked={value}
                onCheckedChange={() => onChange()}
                {...checkboxProps}>
                <Checkbox.Indicator>
                    <CheckIcon />
                </Checkbox.Indicator>
            </Checkbox>

            <Label onPress={() => onChange()} size={size}>
                {label}
            </Label>
        </XStack>
    );
}
