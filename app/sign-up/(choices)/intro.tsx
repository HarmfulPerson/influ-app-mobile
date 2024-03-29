import { router } from "expo-router";
import { View, Text } from "tamagui";
import { ArrowLeft, Camera } from "lucide-react-native";
import { Circle } from "tamagui";
import { styles } from "./styles/intro";
import TopBox from "../../components/TopBox/TopBox";
export default function Intro() {
    return (
        <View style={styles.container}>
            <TopBox
                onBackPress={() => router.replace("/sign-in")}
                headerText="Wybierz typ konta"
            />
            {/* <View style={styles.topBox}>
                <View
                    marginTop="$10"
                    marginLeft="$5"
                    style={styles.backButtonContainer}>
                    <View
                        onPress={() => router.replace("/sign-in")}
                        style={styles.backButton}>
                        <ArrowLeft />
                        <Text>Cofnij</Text>
                    </View>
                </View>
                <View
                    paddingTop="$7"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Text fontSize="$8">Wybierz typ konta</Text>
                </View>
            </View> */}
            <View style={styles.bottomBox}>
                <View padding="$6" style={styles.choice}>
                    <Circle
                        onPress={() =>
                            router.replace("/sign-up/(choices)/influencer")
                        }
                        size={100}
                        backgroundColor={"$blue1"}>
                        <Camera size={48} />
                    </Circle>
                    <Text>Influencer</Text>
                </View>
                <View padding="$6" style={styles.choice}>
                    <Circle
                        size={100}
                        onPress={() =>
                            router.replace("/sign-up/(choices)/advertiser")
                        }
                        backgroundColor={"$blue1"}>
                        <Camera size={48} />
                    </Circle>
                    <Text>Advertiser</Text>
                </View>
            </View>
        </View>
    );
}
