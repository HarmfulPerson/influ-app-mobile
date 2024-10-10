import { ScrollView, Text, View } from "tamagui";
import { Advertisement } from "../../types/advertisement";
import Colors from "../../../constants/Colors";
import { styles } from "./styles";
import { Calendar, DatabaseIcon, Tv } from "lucide-react-native";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

export default function EachAdvertisementDashboard(item: {
    index: number;
    item: Advertisement;
}) {
    const { item: advertisement } = item;
    return (
        <View key={advertisement.uid} style={styles.wrapper}>
            <View style={styles.titleContainer}>
                <View style={styles.companyLogo}></View>
                <View style={styles.companyInfoContainer}>
                    <Text style={styles.nameOfCompany}>
                        {advertisement.createdByUser.nameOfCompany}
                    </Text>
                    <Text style={styles.title}>{advertisement.title}</Text>
                </View>
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
                            {advertisement.neededSocials.map(
                                (social: string) => (
                                    <Text
                                        key={social}
                                        style={styles.socialText}>
                                        {social}
                                    </Text>
                                )
                            )}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.calendarContainer}>
                    <View style={styles.calendar}>
                        <Calendar
                            height={16}
                            width={16}
                            color={Colors.grayscale.surface.disabled}
                        />
                    </View>
                    <View style={styles.publicationContainer}>
                        <Text style={styles.publicationText}>
                            Data publikacji
                        </Text>
                        <Text style={styles.publicationValue}>
                            {format(advertisement.startDate, "d LLL yyyy", {
                                locale: pl,
                            })}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}
