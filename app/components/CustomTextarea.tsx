import { StyleSheet } from "react-native";
import { Input, Text, TextArea, View } from "tamagui";

const styles = StyleSheet.create({
    helperText: {
        alignSelf: "flex-start",
        fontSize: 10,
        paddingLeft: 6,
        paddingBottom: 4,
    },
    input: { borderColor: "red", borderWidth: 5 },
});

export default function CustomTextarea(props: any) {
    const {
        error,
        placeholder,
        onChangeText,
        password = false,
        label,
        value,
    } = props;
    return (
        <View
            paddingBottom="$2"
            style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.helperText}>{label}</Text>
            <TextArea
                width="$20"
                height="$10"
                value={value}
                onChangeText={(e) => onChangeText(e)}
                placeholder={placeholder}
                secureTextEntry={password}
                borderColor={error && "#ff3333"}
            />
            {error && (
                <Text style={styles.helperText} color="red">
                    {error}
                </Text>
            )}
        </View>
    );
}
