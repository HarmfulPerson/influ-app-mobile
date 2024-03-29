import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Input, Text, View } from "tamagui";

const styles = StyleSheet.create({
    helperText: {
        alignSelf: "center",
        fontSize: 10,
        paddingLeft: 6,
        paddingBottom: 4,
    },
    input: { borderColor: "red", borderWidth: 5 },
});

export default function CustomNumericInput(props: any) {
    const { error, label, onChangeText, value } = props;
    const [counter, setCounter] = useState<number>(0);
    const handleChange = (text: string) => {
        // Allow only numbers
        const numericValue = text.replace(/[^0-9]/g, "");
        onChangeText(numericValue);
    };

    return (
        <View
            paddingBottom="$2"
            style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
            }}>
            <Text style={styles.helperText}>{label}</Text>
            <View flexDirection="row">
                <Button onPress={() => value > 0 && onChangeText(value - 1)}>
                    -
                </Button>
                <Input
                    minWidth="$5"
                    value={value?.toString()}
                    onChangeText={(e) => handleChange(e)}
                    textAlign="center"
                    borderColor={error && "#ff3333"}
                />
                <Button onPress={() => onChangeText(value + 1)}>+</Button>
            </View>
            {error && (
                <Text style={styles.helperText} color="red">
                    {error}
                </Text>
            )}
        </View>
    );
}
