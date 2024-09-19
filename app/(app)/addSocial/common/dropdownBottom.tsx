import { Text, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

export const styles = StyleSheet.create({
    whitebar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 40,
        height: 4,
        borderRadius: 40,
        marginTop: 10,
        backgroundColor: "white",
    },
    wrapper: {
        paddingLeft: 24,
        paddingRight: 24,
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
        marginBottom: 36,
    },
    content: {
        height: "100%",
        marginTop: 36,
    },
});
export default function DropdownBottom(props: any) {
    const { closeModal, children } = props;
    return (
        <TouchableWithoutFeedback>
            <View
                style={{
                    width: "100%",
                    height: "79%",
                    backgroundColor: Colors.grayscale.surface.superDarker,
                    borderTopLeftRadius: 48,
                    borderTopRightRadius: 48,
                }}>
                <View style={styles.whitebar} onPress={closeModal}></View>
                <View style={styles.wrapper}>
                    <View style={styles.content}>{children}</View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
