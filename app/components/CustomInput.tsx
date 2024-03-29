import { StyleSheet } from "react-native";
import { Input, Text, View } from "tamagui";

const styles = StyleSheet.create({
    helperText: {
        alignSelf: "flex-start",
        fontSize: 10,
        paddingLeft: 6,
        paddingBottom: 4,
    },
    input: { borderColor: "red", borderWidth: 5 },
});

export default function CustomInput(props: any) {
    const { error, placeholder, onChangeText, value, password = false } = props;
    return (
        <View
            paddingBottom="$2"
            style={{ justifyContent: "center", alignItems: "center" }}>
            <Text style={styles.helperText}>{placeholder}</Text>
            <Input
                minWidth="$20"
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
