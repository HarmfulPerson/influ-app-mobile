import React, { ReactElement, useState } from "react";
import {
    Modal,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import Colors from "../../../constants/Colors";
import Button from "../Button/Button";
import GopherOkSvg from "../../../assets/images/gopher_ok_popup.svg";
import ModalMechanism from "../ModalMechanism/ModalMechanism";

type Props = {
    triggerButton: ReactElement<{ onPress: () => void }>;
    header: string;
    subHeader: string;
    buttonText: string;
    buttonClick: () => any;
};
const CustomModal = (props: Props) => {
    const { triggerButton, header, subHeader, buttonText, buttonClick } = props;
    const [isVisible, setIsVisible] = useState(false);

    const openModal = () => setIsVisible(true);
    const closeModal = () => setIsVisible(false);

    const handleButtonClick = () => {
        closeModal();
        buttonClick();
    };
    return (
        <ModalMechanism
            closeModal={closeModal}
            isVisible={isVisible}
            triggerButton={triggerButton}
            openModal={openModal}
            children={
                <View style={styles.modalContent}>
                    <GopherOkSvg
                        style={{
                            position: "absolute",
                            top: -183,
                            left: 72,
                        }}
                    />
                    <Text style={styles.headerText}>{header}</Text>
                    <Text style={styles.subHeaderText}>{subHeader}</Text>
                    <Button
                        style={{ marginTop: 12, width: "100%" }}
                        text={buttonText}
                        onPress={() => handleButtonClick()}
                        variant="primary"
                    />
                </View>
            }
        />
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    subHeaderText: {
        fontSize: 16,
        color: Colors.grayscale.text.body,
        marginBottom: 20,
    },
    modalContent: {
        width: 329,
        marginTop: 24,
        paddingTop: 32,
        paddingBottom: 32,
        paddingLeft: 24,
        paddingRight: 24,
        minHeight: 200,
        backgroundColor: Colors.grayscale.surface.superDarker,
        borderRadius: 24,
        alignItems: "center",
        borderWidth: 1,
        borderColor: Colors.primary.surface.lighter,
        position: "relative",
    },
    headerText: {
        fontSize: 24,
        fontFamily: "PoppinsSemiBold",
        color: Colors.grayscale.text.body,
        marginBottom: 20,
    },
    closeButton: {
        padding: 10,
        backgroundColor: "#2196F3",
        borderRadius: 5,
    },
    closeButtonText: {
        color: "white",
        fontWeight: "bold",
    },
});

export default CustomModal;
