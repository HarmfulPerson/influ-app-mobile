import { Text, View, Button as TamaguiButton } from "tamagui";
import Colors from "../../../../constants/Colors";
import { router } from "expo-router";
import { ChevronLeft } from "lucide-react-native";
import Button from "../../../components/Button/Button";
import { ImageBackground } from "react-native";
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
                        Witaj w kreatorze ogłoszenia!
                    </Text>
                    <Text style={styles.subtitle}>
                        Ten kreator przeprowadzi Cię przez proces tworzenia
                        nowego ogloszenia do współpracy z influencerami.
                    </Text>
                </View>
                <ImageBackground
                    source={require("../../../../assets/images/gopher-add-collaboration.png")}
                    resizeMode="stretch"
                    style={{ flex: 1 }}></ImageBackground>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Zaczynamy!"
                        onPress={() =>
                            router.push("addCollaboration/steps/pickCategories")
                        }
                        variant="primary"
                        style={styles.navigatToNextPageButton}></Button>
                </View>
            </View>
        </View>
    );
}
