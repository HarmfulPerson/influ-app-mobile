import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import {
    Bell,
    ChevronRight,
    LogOut,
    Palette,
    PencilLine,
    UserRoundCog,
    Workflow,
} from "lucide-react-native";
import { ImageBackground, TouchableOpacity } from "react-native";
import MenuIcon from "../../../assets/images/menu-suseu.svg";
import { styles } from "./styles/settings";
import { returnUserImage } from "../../../utils/user";
import { useSession } from "../../hooks/session/authenticationProvider";
import { router } from "expo-router";
import { useWS } from "../../hooks/useWS";

export default function Settings() {
    const { session, signOut } = useSession();
    const { disconnect } = useWS();
    const EachItem = ({
        text,
        iconLeft,
        onPress,
    }: {
        text: string;
        iconLeft: React.ReactNode;
        onPress?: () => void;
    }) => {
        return (
            <TouchableOpacity
                onPress={onPress}
                style={styles.eachItemContainer}>
                <View style={{ flexDirection: "row" }}>
                    {iconLeft}
                    <Text style={styles.eachItemText}>{text}</Text>
                </View>
                <ChevronRight
                    width={24}
                    height={24}
                    color={Colors.grayscale.surface.disabled}
                />
            </TouchableOpacity>
        );
    };

    const handleSignOut = () => {
        signOut();
        disconnect();
        router.push("/signIn");
    };
    return (
        <SafeAreaView edges={["top", "bottom"]} style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Text style={styles.title}>Ustawienia</Text>
                <View style={styles.usernameAndEditContainer}>
                    <ImageBackground
                        source={{
                            uri: returnUserImage(
                                session.data.userData.avatarUrl
                            ),
                        }}
                        style={styles.avatar}
                        imageStyle={styles.imageAvatar}
                    />
                    <View style={styles.usernameContainer}>
                        <Text style={styles.username}>Frendii</Text>
                        <Text style={styles.nameOfCompany}>testtest</Text>
                    </View>
                    <View style={styles.editIcon}>
                        <TouchableOpacity>
                            <PencilLine
                                height={24}
                                width={24}
                                color={Colors.grayscale.surface.disabled}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <EachItem
                    text="Ustawienia konta"
                    iconLeft={
                        <UserRoundCog
                            width={24}
                            height={24}
                            strokeWidth={1.5}
                            color={Colors.grayscale.surface.disabled}
                        />
                    }
                />
                <Text style={styles.preferenceText}>Preferencje</Text>
                <EachItem
                    text="Powiadomienia"
                    iconLeft={
                        <Bell
                            width={24}
                            height={24}
                            strokeWidth={1.5}
                            color={Colors.grayscale.surface.disabled}
                        />
                    }
                />
                <EachItem
                    text="Wygląd"
                    iconLeft={
                        <Palette
                            width={24}
                            height={24}
                            strokeWidth={1.5}
                            color={Colors.grayscale.surface.disabled}
                        />
                    }
                />
                <EachItem
                    text="Integracje"
                    iconLeft={
                        <Workflow
                            width={24}
                            height={24}
                            strokeWidth={1.5}
                            color={Colors.grayscale.surface.disabled}
                        />
                    }
                />
                <View style={{ height: 44 }}></View>
                <EachItem
                    text="Wyloguj się"
                    onPress={handleSignOut}
                    iconLeft={
                        <LogOut
                            width={24}
                            height={24}
                            strokeWidth={1.5}
                            color={Colors.grayscale.surface.disabled}
                        />
                    }
                />
            </View>
            <View style={styles.logoContainer}>
                <MenuIcon
                    height={48}
                    width={48}
                    fill={Colors.grayscale.surface.disabled}
                />
                <Text style={styles.suseuText}>Suseu</Text>
                <Text style={styles.versionText}>Wersja 1.0</Text>
            </View>
        </SafeAreaView>
    );
}
