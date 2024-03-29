import { ArrowLeft } from "lucide-react-native";
import { Text, View } from "tamagui";
import { styles } from "./styles";
export default function TopBox(props: any) {
    const { onBackPress, headerText, onChangeText } = props;
    return (
        <View style={styles.topBox}>
            <View
                marginTop="$10"
                marginLeft="$5"
                style={styles.backButtonContainer}>
                <View onPress={() => onBackPress()} style={styles.backButton}>
                    <ArrowLeft />
                    <Text>Cofnij</Text>
                </View>
            </View>
            <View paddingTop="$7" style={styles.textContainer}>
                <Text fontSize="$8">{headerText}</Text>
            </View>
        </View>
    );
}
