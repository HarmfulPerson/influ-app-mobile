import { View, Text, Button as TamaguiButton, Image } from "tamagui";
import { styles } from "../styles/choosePhoto";
import BackgroundSvg from "../../../assets/images/suseu-gradient-colour.svg";
import Button from "../../components/Button/Button";
import Colors from "../../../constants/Colors";
import SuseuSvg from "../../../assets/images/register-background.svg";
import { Plus } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { router } from "expo-router";
import { useSession } from "../../hooks/session/authenticationProvider";
import * as FileSystem from "expo-file-system";
import useAuthPatchData from "../../hooks/usePatchAuth";

export default function ChoosePhoto() {
    const [image, setImage] = useState<string | null>(null);
    const { session } = useSession();
    const { patchData: updateUserImage } = useAuthPatchData();
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

    const handleNavigateWithPhoto = async () => {
        const response = await FileSystem.uploadAsync(
            `http://192.168.0.102:4000/api/v1/file/userAvatar/${session.data.userData.uid}`,
            image as string,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    authorization: `Bearer ${session.data.tokens.token}`,
                },
                httpMethod: "POST",
                uploadType: FileSystem.FileSystemUploadType.MULTIPART,
                fieldName: "file",
                mimeType: `image/jpeg`,
            }
        );

        if (response.status === 200) {
            updateUserImage("/user", {
                avatarUrl: JSON.parse(response.body).data.file,
            });
        }

        naviateToNotificationsPage();
    };

    const naviateToNotificationsPage = () => {
        router.push("/signUp/steps/notifications");
    };

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
                        onPress={handleNavigateWithPhoto}
                    />
                    <Button
                        variant="secondary"
                        style={styles.skipButton}
                        text="Pomiń"
                        onPress={naviateToNotificationsPage}
                    />
                </View>
            </View>
        </View>
    );
}
