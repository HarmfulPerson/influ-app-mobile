import { Text, View, Button as TamaguiButton } from "tamagui";
import Colors from "../../../../constants/Colors";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import Button from "../../../components/Button/Button";
import { ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "../styles/start";

export default function Start() {
    return (
        <View flex={1} backgroundColor="#151419" alignItems="center">
            <TamaguiButton
                borderColor={Colors.grayscale.surface.subtle}
                onPress={() => {
                    if (router.canGoBack()) router.back();
                }}
                style={styles.backButton}>
                <ChevronLeft color={Colors.grayscale.text.body} />
            </TamaguiButton>
            <View style={styles.contentWrapper}>
                <View style={styles.titlesContainer}>
                    <Text style={styles.header}>
                        Witaj w kreatorze współpracy!
                    </Text>
                    <Text style={styles.subtitle}>
                        Ten kreator przeprowadzi Cię przez proces dodawania
                        współpracy z influencerami.
                    </Text>
                </View>

                <ImageBackground
                    source={require("../../../../assets/images/TwoGophers.png")}
                    resizeMode="stretch"
                    style={{
                        flex: 1,
                        justifyContent: "space-between",
                    }}>
                    <LinearGradient
                        colors={[
                            Colors.grayscale.surface.superDarker,
                            Colors.grayscale.surface.superDarker,
                            "rgba(21, 21, 24, 0)",
                        ]}
                        style={styles.gradient}
                    />
                    <LinearGradient
                        colors={[
                            "rgba(21, 21, 24, 0)",
                            Colors.grayscale.surface.superDarker,
                            Colors.grayscale.surface.superDarker,
                        ]}
                        style={styles.gradientBottom}
                    />
                </ImageBackground>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Zaczynamy!"
                        onPress={() =>
                            router.push("addSocial/steps/companyLink")
                        }
                        variant="primary"
                        style={styles.startButton}></Button>
                </View>
            </View>
        </View>
    );
}
