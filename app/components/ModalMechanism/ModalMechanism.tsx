import React, { ReactElement } from "react";
import {
    Modal,
    View,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";

type Props = {
    children: ReactElement;
    closeModal: () => void;
    isVisible: boolean;
    triggerButton: ReactElement<{ onPress: () => void }>;
    openModal: () => void;
    position?:
        | "flex-start"
        | "flex-end"
        | "space-between"
        | "space-around"
        | "space-evenly";
};
const ModalMechanism = (props: Props) => {
    const {
        children,
        closeModal,
        isVisible,
        triggerButton,
        openModal,
        position,
    } = props;
    return (
        <>
            {React.cloneElement(triggerButton, { onPress: openModal })}
            <Modal
                transparent={true}
                visible={isVisible}
                animationType="slide"
                onRequestClose={closeModal}>
                <TouchableWithoutFeedback onPress={closeModal}>
                    <View
                        style={[
                            styles.modalOverlay,
                            {
                                justifyContent: position ? position : "center",
                            },
                        ]}>
                        <TouchableWithoutFeedback>
                            {children}
                        </TouchableWithoutFeedback>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.4)", // Whiteish background with 50% opacity
    },
    absolute: {
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default ModalMechanism;
