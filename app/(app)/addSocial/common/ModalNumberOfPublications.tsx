import { Modal, TouchableWithoutFeedback } from "react-native";
import { View, Text } from "tamagui";
import Colors from "../../../../constants/Colors";
import Button from "../../../components/Button/Button";

const ModalNumberOfPublication = (props: any) => {
  const { isVisible, platform, setIsVisible, setPlaform, addPlatform, deletePlatform } = props;
  const handleAdd = () => setPlaform({ ...platform, numberOfPublications: platform.numberOfPublications + 1 });
  const handleDelete = () => setPlaform({ ...platform, numberOfPublications: platform.numberOfPublications === 1 ? platform.numberOfPublications : platform.numberOfPublications - 1 });
  const handleConfirm = () => {
    addPlatform(platform);
    setIsVisible(false);
  };
  const handleDeletePlatform = () => {
    deletePlatform(platform);
    setIsVisible(false);
  };
  return (
    <Modal transparent={true} visible={isVisible} animationType="slide">
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <TouchableWithoutFeedback>
            <View
              style={{
                width: 329,
                marginTop: 24,
                paddingTop: 32,
                paddingBottom: 32,
                paddingLeft: 24,
                paddingRight: 24,
                minHeight: 290,
                backgroundColor: Colors.grayscale.surface.superDarker,
                borderRadius: 24,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 1,
                borderColor: Colors.primary.surface.lighter,
                position: "relative",
              }}
            >
              <Text style={{ color: Colors.grayscale.text.body, fontSize: 24, fontWeight: "700", lineHeight: 28.8 }}>Liczba aktywności</Text>
              <Text style={{ color: Colors.grayscale.text.body, fontSize: 16, lineHeight: 19.2, marginTop: 8, textAlign: "center" }}>
                Podaj liczbe aktywności na platformie<Text style={{ color: Colors.grayscale.text.body, fontSize: 16, lineHeight: 19.2, textTransform: "capitalize" }}>{` ${platform?.name}`}</Text>
              </Text>
              <Text style={{ color: Colors.grayscale.text.body, fontSize: 48, lineHeight: 57.6, marginTop: 12, marginBottom: 12, textAlign: "center" }}>{platform?.numberOfPublications}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="secondary" onPress={handleDelete} style={{ height: 44, width: "48%" }} text="-" />
                <Button variant="primary" onPress={handleAdd} style={{ height: 44, width: "48%" }} text="+" />
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Button onPress={() => handleDeletePlatform()} variant="secondary" style={{ height: 44, width: "48%", marginTop: 8 }} text="Usuń" />
                <Button variant="primary" style={{ height: 44, width: "48%", marginTop: 8 }} text="Zatwierdź" onPress={() => handleConfirm()} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default ModalNumberOfPublication;
