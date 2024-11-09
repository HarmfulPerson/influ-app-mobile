import { ScrollView, Text, View } from "tamagui";
import { Advertisement } from "../../types/advertisement";
import Colors from "../../../constants/Colors";
import { styles } from "./styles";
import { Calendar, Tv } from "lucide-react-native";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import FilterDisplayer from "../FilterDisplayer/FilterDisplayer";
import { router } from "expo-router";

const EachAdvertisement = ({ item }: { item: Advertisement }) => {
    const filters = {
        ageMin: item.ageMin,
        ageMax: item.ageMax,
        sexes: item.sexes,
        advertisementSocialRanges: item.socialRanges,
        categories: item.influencerCategories,
        isPublishedByAdvertiser: item.isPublishedByAdvertiser,
    };

    return (
        <View
            key={item.uid}
            style={styles.wrapper}
            onPress={() =>
                router.push({
                    pathname: "advertisement",
                    params: { advertisementUid: item.uid },
                })
            }>
            <View style={styles.titleContainer}>
                <View style={styles.companyLogo}></View>
                <View style={styles.companyInfoContainer}>
                    <Text style={styles.nameOfCompany}>
                        {item.createdByUser.nameOfCompany}
                    </Text>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text
                        ellipsizeMode="tail"
                        numberOfLines={5}
                        style={styles.description}>
                        {item.description}
                    </Text>
                </View>
            </View>

            <View
                style={{
                    height: 52,
                    width: "100%",
                    justifyContent: "flex-start",
                }}>
                <FilterDisplayer isFromList filters={filters} />
            </View>

            <View style={styles.platformAndPublicationContainer}>
                <View style={styles.platformsContainer}>
                    <View>
                        <Tv
                            height={16}
                            width={16}
                            color={Colors.grayscale.surface.disabled}
                        />
                    </View>
                    <View style={styles.platformTextContainer}>
                        <Text style={styles.platformsTitle}>Platformy</Text>
                        <ScrollView style={styles.platformContainer}>
                            {item.neededSocials.map((social: string) => (
                                <Text key={social} style={styles.socialText}>
                                    {social}
                                </Text>
                            ))}
                        </ScrollView>
                    </View>
                </View>

                <View style={styles.publicationContainer}>
                    <View style={styles.calendar}>
                        <Calendar
                            height={16}
                            width={16}
                            color={Colors.grayscale.surface.disabled}
                        />
                    </View>
                    <View style={styles.publicationTextContainer}>
                        <Text style={styles.publicationText}>
                            Data publikacji
                        </Text>
                        <Text style={styles.publicationValue}>
                            {format(item.startDate, "d LLL yyyy", {
                                locale: pl,
                            })}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default EachAdvertisement;
