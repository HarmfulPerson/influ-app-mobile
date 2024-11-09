import { FlatList, ImageBackground } from "react-native";
import { Text, View } from "tamagui";
import { User } from "../../../types/user";

type CreatorListProps = {
    influencers: User[];
};

const CreatorList = (props: CreatorListProps) => {
    const { influencers } = props;

    return (
        <View style={{ width: "100%", paddingHorizontal: 12 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={influencers}
                renderItem={(item: { item: User }) => (
                    <View
                        style={{
                            height: 36,
                            width: "100%",
                            flexDirection: "row",
                            marginBottom: 8,
                        }}>
                        <ImageBackground
                            source={require("../../../../assets/images/influencer-profile.jpeg")}
                            style={{ height: 36, width: 36, borderRadius: 18 }}
                            imageStyle={{ borderRadius: 18 }}
                        />
                        <View
                            style={{
                                flexDirection: "column",
                                justifyContent: "flex-start",
                                marginLeft: 16,
                                flex: 1,
                            }}>
                            <Text
                                style={{
                                    fontFamily: "PoppinsSemiBold",
                                    fontSize: 16,
                                    lineHeight: 19.2,
                                    color: "white",
                                }}>
                                {item.item.username}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    lineHeight: 14.4,
                                    color: "white",
                                }}>
                                {item.item.nameOfCompany}
                            </Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item: User) => item.uid}
            />
        </View>
    );
};

export default CreatorList;
