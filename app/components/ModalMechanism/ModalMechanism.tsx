import React, { Dispatch, ReactElement, SetStateAction } from "react";
import { StyleSheet } from "react-native";
import { Sheet } from "tamagui";

type Props = {
  children: ReactElement;
  triggerButton: ReactElement<{ onPress: () => void }>;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  zIndex?: number;
};
const ModalMechanism = (props: Props) => {
  const { children, triggerButton, open, setOpen, zIndex = 100_100 } = props;
  const [modal, setModal] = React.useState(true);
  const [position1, setPosition1] = React.useState(0);

  return (
    <>
      {React.cloneElement(triggerButton, { onPress: () => setOpen(true) })}
      <Sheet
        forceRemoveScrollEnabled={open}
        modal={modal}
        open={open}
        onOpenChange={setOpen}
        snapPoints={[85, 60, 40]}
        dismissOnOverlayPress
        snapPointsMode="percent"
        dismissOnSnapToBottom
        position={position1}
        onPositionChange={setPosition1}
        zIndex={zIndex}
        animation="medium"
      >
        <Sheet.Overlay
          animation="quick"
          enterStyle={{ opacity: 0.3 }} // Adjusted opacity for a slight overlay
          exitStyle={{ opacity: 0 }} // Keep the exit animation fully transparent if needed
          style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
        />

        <Sheet.Handle />
        <Sheet.Frame
          style={{
            borderTopLeftRadius: 48,
            borderTopRightRadius: 48,
          }}
        >
          {children}
        </Sheet.Frame>
      </Sheet>
      {/* <Modal
        transparent={true}
        visible={isVisible}
        animationType="slide"
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View
            style={[
              styles.modalOverlay,
              {
                justifyContent: position ? position : "center",
              },
            ]}
          >
            <TouchableWithoutFeedback>{children}</TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
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
