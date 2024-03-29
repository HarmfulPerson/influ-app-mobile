import {
    Archive,
    DollarSign,
    EqualSquare,
    List,
    MessageCircle,
    PlusCircle,
    Radical,
    Search,
    Sheet as SheetIcon,
    UserPlus,
    Users,
} from "lucide-react-native";
import { Adapt, Circle, Dialog, Text, Sheet, View } from "tamagui";
import { styles } from "./styles";
import { useEffect, useState } from "react";
import { Stack, router } from "expo-router";

function ManageCollaborationMenu(props: {
    hideMenuFunction: React.Dispatch<React.SetStateAction<MenuItems | null>>;
}) {
    const { hideMenuFunction } = props;

    return (
        <View marginTop="$20">
            <Dialog.Close asChild>
                <Circle
                    size={100}
                    padding="$3"
                    margin="$5"
                    onPress={() => {
                        hideMenuFunction(null);
                        router.replace(
                            "/(app)/(tabs)/(manageCollaboration)/ongoing"
                        );
                    }}
                    backgroundColor={"$blue1"}>
                    <Radical size={32} />
                    <Text fontSize="$1" textAlign="center">
                        W trakcie
                    </Text>
                </Circle>
            </Dialog.Close>
            <Dialog.Close asChild>
                <Circle
                    padding="$3"
                    size={100}
                    margin="$5"
                    onPress={() => {
                        hideMenuFunction(null);
                        router.replace(
                            "/(app)/(tabs)/(manageCollaboration)/archive"
                        );
                    }}
                    backgroundColor={"$blue1"}>
                    <Archive size={32} />
                    <Text fontSize="$1" textAlign="center">
                        Archiwum
                    </Text>
                </Circle>
            </Dialog.Close>
        </View>
    );
}

function StartCollaborationMenu(props: {
    hideMenuFunction: React.Dispatch<React.SetStateAction<MenuItems | null>>;
}) {
    const { hideMenuFunction } = props;
    return (
        <View
            style={{ position: "absolute", top: -150, left: 0 }}
            marginTop="$20">
            <View>
                <Dialog.Close asChild>
                    <Circle
                        style={{ position: "absolute", left: 80, top: 90 }}
                        size={100}
                        onPress={() => {
                            hideMenuFunction(null);
                            router.replace(
                                "/(app)/(tabs)/(collaboration)/market"
                            );
                        }}
                        backgroundColor={"$blue1"}>
                        <List size={32} />
                        <Text fontSize="$1" textAlign="center">
                            Giełda
                        </Text>
                        <Text fontSize="$1" textAlign="center">
                            ogłoszeń
                        </Text>
                    </Circle>
                </Dialog.Close>
                <Dialog.Close asChild>
                    <Circle
                        style={{ position: "absolute", left: -30, top: 120 }}
                        size={100}
                        onPress={() => {
                            hideMenuFunction(null);
                            router.replace("/(app)/(tabs)/(collaboration)/add");
                        }}
                        backgroundColor={"$blue1"}>
                        <PlusCircle size={32} />
                        <Text fontSize="$1" textAlign="center">
                            Dodaj
                        </Text>
                        <Text fontSize="$1" textAlign="center">
                            współprace
                        </Text>
                    </Circle>
                </Dialog.Close>
            </View>
            <View style={{ position: "absolute", bottom: -150, left: 0 }}>
                <Dialog.Close asChild>
                    <Circle
                        style={{ position: "absolute", left: -50, top: 80 }}
                        size={100}
                        onPress={() => {
                            hideMenuFunction(null);
                            router.replace(
                                "/(app)/(tabs)/(collaboration)/applications"
                            );
                        }}
                        backgroundColor={"$blue1"}>
                        <DollarSign size={32} />
                        <Text fontSize="$1" textAlign="center">
                            Aplikacje
                        </Text>
                    </Circle>
                </Dialog.Close>
                <Dialog.Close asChild>
                    <Circle
                        style={{ position: "absolute", left: 20, top: 170 }}
                        size={100}
                        onPress={() => {
                            hideMenuFunction(null);
                            router.replace(
                                "/(app)/(tabs)/(collaboration)/invite"
                            );
                        }}
                        backgroundColor={"$blue1"}>
                        <UserPlus size={32} />
                        <Text fontSize="$1" textAlign="center">
                            Zaproś
                        </Text>
                        <Text fontSize="$1" textAlign="center">
                            influencera
                        </Text>
                    </Circle>
                </Dialog.Close>
            </View>
        </View>
    );
}

type MenuItems =
    | "communicator"
    | "manageCollaborations"
    | "reports"
    | "startCooperation";

export default function TabOneScreen() {
    const [menuItem, setMenuItem] = useState<MenuItems | null>(null);

    return (
        <View flex={1} alignItems="center">
            <Dialog modal>
                <View style={styles.containerTop}></View>
                <View style={styles.containerBottom}>
                    <View style={styles.menuItem}>
                        <Circle size={120} backgroundColor={"$blue1"}>
                            <MessageCircle size={48} />
                            <Text fontSize="$1">Komunikator</Text>
                        </Circle>
                    </View>
                    <View style={styles.menuItem}>
                        <Dialog.Trigger asChild>
                            <Circle
                                size={120}
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                                onPress={() =>
                                    setMenuItem("manageCollaborations")
                                }
                                backgroundColor={"$blue1"}>
                                <EqualSquare size={48} />
                                <Text fontSize="$1" textAlign="center">
                                    Zarządzaj publikacjami
                                </Text>
                            </Circle>
                        </Dialog.Trigger>
                    </View>
                    <View style={styles.menuItem}>
                        <Circle size={120} backgroundColor={"$blue1"}>
                            <SheetIcon size={48} />
                            <Text fontSize="$1">Raporty</Text>
                        </Circle>
                    </View>
                    <View style={styles.menuItem}>
                        <Dialog.Trigger asChild>
                            <Circle
                                onPress={() => setMenuItem("startCooperation")}
                                size={120}
                                backgroundColor={"$blue1"}>
                                <Users size={48} />
                                <Text fontSize="$1" textAlign="center">
                                    Współprace
                                </Text>
                            </Circle>
                        </Dialog.Trigger>
                    </View>
                </View>
                <Dialog.Portal>
                    <Dialog.Close asChild>
                        <Dialog.Overlay
                            key="overlay"
                            animation="slow"
                            opacity={0.5}
                            enterStyle={{ opacity: 0 }}
                            exitStyle={{ opacity: 0 }}
                        />
                    </Dialog.Close>

                    <Dialog.Content
                        key="content"
                        style={{ backgroundColor: "transparent" }}
                        animateOnly={["transform", "opacity"]}
                        animation={[
                            "quick",
                            {
                                opacity: {
                                    overshootClamping: true,
                                },
                            },
                        ]}
                        enterStyle={{ x: 0, y: -60, opacity: 0, scale: 0.9 }}
                        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}>
                        {menuItem === "startCooperation" && (
                            <StartCollaborationMenu
                                hideMenuFunction={setMenuItem}
                            />
                        )}
                        {menuItem === "manageCollaborations" && (
                            <ManageCollaborationMenu
                                hideMenuFunction={setMenuItem}
                            />
                        )}
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog>
        </View>
    );
}
