import { View, Text, Button as TamaguiButton, Image } from "tamagui";
import { styles } from "../styles/choosePhoto";
import BackgroundSvg from "../../../assets/images/suseu-gradient-colour.svg";
import Button from "../../components/Button/Button";
import Colors from "../../../constants/Colors";
import SuseuSvg from "../../../assets/images/register-background.svg";
import { Plus } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";

export default function Test() {
    const [image, setImage] = useState<string | null>(null);
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    // const takePhoto = async () => {
    //     // Request camera permissions
    //     const { status } = await ImagePicker.requestCameraPermissionsAsync();
    //     if (status !== "granted") {
    //         alert("Sorry, we need camera permissions to make this work!");
    //         return;
    //     }

    //     // Open camera
    //     const result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //     });

    //     if (!result.canceled) {
    //         setImage(result.assets[0].uri);
    //     }
    // };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.smallLogo}>
                    <BackgroundSvg width={40} height={40} />
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.titleText}>
                        Wybierz zdjecie profilowe
                    </Text>
                    <Text style={styles.infoText}>
                        Posiadasz logo firmy? prześlij je teraz!
                    </Text>
                    <View style={styles.centralAreaContainer}>
                        <View
                            style={styles.addPhotoContainer}
                            onPress={() => pickImage()}>
                            {image ? (
                                <Image
                                    source={{ uri: image }}
                                    style={styles.pickedImage}
                                />
                            ) : (
                                <SuseuSvg
                                    width="80%"
                                    height="80%"
                                    fill={Colors.grayscale.surface.darker}
                                />
                            )}
                            {!image && (
                                <View style={styles.plusSignContainer}>
                                    <Plus
                                        width={24}
                                        height={24}
                                        color={Colors.primary.border.default}
                                    />
                                </View>
                            )}
                        </View>
                    </View>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        style={styles.navigateNextButton}
                        variant="primary"
                        disabled={!image}
                        text="Dalej"
                    />
                    <Button
                        variant="secondary"
                        style={styles.skipButton}
                        text="Pomiń"
                    />
                </View>
            </View>
        </View>
    );
}
