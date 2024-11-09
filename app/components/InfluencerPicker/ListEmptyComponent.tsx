import { Text, View } from "tamagui";
import Button from "../Button/Button";
import { Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Colors from "../../../constants/Colors";
import { useState } from "react";
import Input from "../Input/Input";
import * as yup from "yup";
import { validate } from "../../../utils/yup";

const emailSchema = yup.object().shape({
    email: yup
        .string()
        .email("Nieprawidłowy email")
        .required("Email jest wymagany"),
});

const ListEmptyComponent = () => {
    const [inviteEmailModal, setInviteEmailModal] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<{ email?: string }>({});

    const handleSendEmailInvitation = async () => {
        const errors = await validate(emailSchema, { email });
        if (Object.values(errors).length) return setError(errors);
        setError({ email: "" });
        setInviteEmailModal(false);
    };

    return (
        <View style={styles.infoContainer}>
            <Text
                color={Colors.grayscale.text.body}
                fontSize={20}
                style={styles.title}>
                Brak wyników
            </Text>
            <Text
                style={styles.subtitle}
                color={Colors.grayscale.text.caption}
                fontSize={16}>
                Twórca nie ma konta Suseu? Teraz mozesz wyslac mu zaproszenie
                email
            </Text>
            <Button
                text="Wyślij zaproszenie email"
                variant="primary"
                onPress={() => setInviteEmailModal(true)}
                style={styles.buttonInvite}
            />
            <Modal
                transparent={true}
                visible={inviteEmailModal}
                animationType="slide">
                <TouchableWithoutFeedback
                    onPress={() => setInviteEmailModal(false)}>
                    <View style={styles.background}>
                        <TouchableWithoutFeedback style={{ flex: 1 }}>
                            <View style={styles.container}>
                                <Text style={styles.titleModal}>
                                    Zaproszenie Email
                                </Text>
                                <Text style={styles.subtitleModal}>
                                    Wprowadź adres email na który mamy wysłać
                                    zaproszenie.
                                </Text>
                                <Input
                                    styleInput={styles.phoneInput}
                                    onChangeText={(text: string) =>
                                        setEmail(text)
                                    }
                                    value={email}
                                    error={!!error.email}
                                    infoMessage={error.email}
                                    placeholder="Wprowadź adres email"
                                />
                                <Button
                                    text="Wyślij"
                                    onPress={handleSendEmailInvitation}
                                    variant="primary"
                                    style={styles.sendButton}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};
export default ListEmptyComponent;

const styles = StyleSheet.create({
    sendButton: {
        width: "100%",
        marginTop: 16,
        marginBottom: 16,
    },
    phoneInput: { marginTop: 16 },
    infoContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 100,
    },
    title: {
        fontFamily: "PoppinsSemiBold",
    },
    titleModal: {
        fontWeight: "700",
        fontSize: 24,
        color: Colors.grayscale.text.body,
        textAlign: "center",
    },
    subtitleModal: {
        marginTop: 16,
        fontSize: 16,
        color: Colors.grayscale.text.body,
        textAlign: "center",
    },
    subtitle: { paddingBottom: 16 },
    background: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    buttonInvite: {
        height: 44,
        width: 220,
    },
    container: {
        width: "90%",
        backgroundColor: Colors.grayscale.surface.darker,
        borderWidth: 1,
        borderRadius: 24,
        borderColor: Colors.primary.surface.lighter,
        paddingHorizontal: 24,
        paddingVertical: 32,
        flexDirection: "column",
        justifyContent: "flex-start",
    },
});
