import { Text, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import { ReactNode } from "react";

export const styles = StyleSheet.create({
  whitebar: {
    marginLeft: "auto",
    marginRight: "auto",
    width: 40,
    height: 4,
    borderRadius: 40,
    marginTop: 10,
    backgroundColor: "white",
  },
  wrapper: {
    paddingLeft: 24,
    paddingRight: 24,
    flex: 1,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 36,
  },
  content: {
    height: "100%",
    marginTop: 36,
  },
});

type DropdownBottomProps = {
  closeModal: () => void;
  children: ReactNode;
  height?: string;
};

export default function DropdownBottom(props: DropdownBottomProps) {
  const { closeModal, children, height = "100%" } = props;
  return (
    <TouchableWithoutFeedback>
      <View
        style={{
          width: "100%",
          height: height,
        }}
      >
        <View style={styles.wrapper}>
          <View style={styles.content}>{children}</View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
