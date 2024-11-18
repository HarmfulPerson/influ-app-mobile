import { Text, View } from "tamagui";
import { ImageBackground } from "react-native";
import SocialIcon from "../SocialIconParser";
import { styles } from "./styles";
import type { ViewStyle } from "react-native";

export type EachCooperationProps = {
  item: { status: string };
  containerStyle?: ViewStyle;
};

const EachCooperation = ({ item, containerStyle }: EachCooperationProps) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.rowWrapper}>
        <View style={styles.socialIconContainer}>
          <SocialIcon coloured width={32} height={32} social="instagram" />
        </View>
        <View style={styles.userContainer}>
          <View style={{ marginLeft: 8 }}>
            <View style={styles.userImageContainer}>
              <ImageBackground
                style={styles.userPhoto}
                source={require("../../../assets/images/menu-user-gopher.png")}
              />
            </View>
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={styles.username}>Freendi</Text>
            <Text style={styles.cooperationTitle}>Nazwa współpracy</Text>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.ugcContainer}>
                <Text style={styles.ugcText}>UGC</Text>
              </View>
              {item.status && item.status === "finished" && (
                <View style={styles.finishedContainer}>
                  <Text style={styles.finishedText}>ZAKOŃCZONA</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EachCooperation;
