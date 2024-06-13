import { Dimensions, ImageBackground, StyleSheet } from "react-native";
import { Text, View } from "tamagui";
import Colors from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import SuseuSvg from "../../assets/images/Suseu-Vector-Welcome.svg";
import Button from "../components/Button/Button";
import { router } from "expo-router";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
    gradient: {
        position: "absolute",
        top: 0,
        left: 0,
        height: Dimensions.get("window").height * 0.8,
        width: "100%",
        zIndex: 1,
    },
    image: {
        height: screenHeight * 0.4,
        width: screenWidth,
        justifyContent: "center",
        alignItems: "center",
    },
    contentContainer: {
        zIndex: 3,
        backgroundColor: Colors.grayscale.surface.superDarker,
        height: screenHeight * 0.6,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingLeft: 16,
        paddingRight: 16,
    },
    textInfo: {
        fontSize: 20,
        width: "100%",
        textAlign: "center",
        color: Colors.grayscale.text.title,
    },
    navigateToRegisterButton: {
        height: 56,
        marginTop: 48,
        marginBottom: 12,
        width: "100%",
    },
    navigateToLogin: {
        height: 56,
        marginBottom: 12,
        width: "100%",
    },
    appName: {
        fontSize: 68,
        fontWeight: "900",
        color: Colors.grayscale.text.title,
    },
});

export default function WelcomeScreen() {
    return (
        <View
            style={{
                flex: 1,
            }}>
            <LinearGradient
                colors={[
                    "rgba(21, 21, 24, 0)",
                    Colors.grayscale.surface.superDarker,
                    Colors.grayscale.surface.superDarker,
                ]}
                style={styles.gradient}
            />
            <ImageBackground
                source={require("../../assets/images/Normal_x4_Leonardo.jpg")}
                resizeMode="cover"
                style={styles.image}
            />
            <View style={styles.contentContainer}>
                <SuseuSvg width={134} height={131} />
                <Text style={styles.appName}>Suseu</Text>
                <Text style={styles.textInfo}>
                    Znajdz odpowiednch tworcow do swoich kampani juz teraz!
                </Text>
                <Button
                    style={styles.navigateToRegisterButton}
                    variant="primary"
                    onPress={() => router.push("/signUp")}
                    text="Jestem tu nowy"
                />
                <Button
                    variant="secondary"
                    style={styles.navigateToLogin}
                    onPress={() => router.push("/signIn")}
                    text="Posiadam juz konto"
                />
            </View>
        </View>
    );
}
/* Vector */
