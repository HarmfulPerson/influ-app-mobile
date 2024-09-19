import { router } from "expo-router";
import { ReactNode } from "react";
import { View, Button as TamaguiButton, Text, Progress } from "tamagui";
import Colors from "../../../../constants/Colors";
import { ChevronLeft } from "lucide-react-native";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";

type Props = {
    mainArea?: ReactNode;
    bottomArea?: ReactNode;
    progress?: number;
};
export const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        width: 44,
        height: 44,
        top: 64,
        left: 32,
        zIndex: 1,
        backgroundColor: "transparent",
    },
    wrapper: {
        paddingTop: 32,
        paddingRight: 32,
        paddingLeft: 32,
        paddingBottom: 32,
    },
    bottomArea: {
        marginTop: 32,
        width: "100%",
        height: 72,
    },
    title: {
        marginTop: 44,
        fontSize: 12,
        width: "100%",
        textAlign: "center",
        color: Colors.grayscale.text.title,
    },
    progressBar: { marginTop: 32, marginBottom: 24 },
    mainAreaContainer: {
        flex: 1,
        width: "100%",
    },
});
export default function Background(props: Props) {
    const { mainArea, bottomArea, progress = 0 } = props;
    return (
        <View
            flex={1}
            backgroundColor={Colors.grayscale.surface.darker}
            style={styles.wrapper}
            alignItems="center">
            <TamaguiButton
                borderColor={Colors.grayscale.surface.subtle}
                onPress={() => {
                    if (router.canGoBack()) router.back();
                }}
                style={styles.backButton}>
                <ChevronLeft color={Colors.grayscale.text.body} />
            </TamaguiButton>
            <Text style={styles.title}>DODAJ OGŁOSZENIE</Text>
            <Progress
                backgroundColor={Colors.grayscale.surface.subtle}
                style={styles.progressBar}
                value={progress}>
                <Progress.Indicator
                    backgroundColor={Colors.secondary.surface.lighter}
                    animation={progress > 0 ? "bouncy" : null}
                />
            </Progress>
            <View style={styles.mainAreaContainer}>
                <TouchableWithoutFeedback
                    style={{ flex: 1 }}
                    onPress={() => Keyboard.dismiss()}>
                    {mainArea}
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.bottomArea}>{bottomArea}</View>
        </View>
    );
}
