import { Circle, Text, View } from "tamagui";
import { Advertisement } from "../../types/advertisement";
import Colors from "../../../constants/Colors";
import { ImageBackground } from "react-native";
import { styles } from "./styles";
import FilterDisplayer from "../FilterDisplayer/FilterDisplayer";
import SocialIcon from "../SocialIconParser";

export default function EachAdvertisement(item: {
    index: number;
    item: Advertisement;
}) {
    const { item: advertisement } = item;
    const filters = {
        ageMin: advertisement.ageMin,
        ageMax: advertisement.ageMax,
        sexes: advertisement.sexes,
        advertisementSocialRanges: advertisement.socialRanges,
        categories: advertisement.influencerCategories,
        isPublishedByAdvertiser: advertisement.isPublishedByAdvertiser,
    };

    const returnLeftTimeText = (startDate: Date) => {
        const now = new Date();
        const timeDifference = new Date(startDate).getTime() - now.getTime();

        if (timeDifference < 0) {
            return "Wystartowaliśmy";
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        if (days > 0) {
            return `${days} dni`;
        }

        const hours = Math.floor(timeDifference / (1000 * 60 * 60));
        if (hours > 0) {
            return `${hours} godzin`;
        }

        const minutes = Math.floor(timeDifference / (1000 * 60));
        if (minutes > 0) {
            return `${minutes} minut`;
        }

        const seconds = Math.floor(timeDifference / 1000);
        if (seconds > 0) {
            return "Zaraz zaczynamy";
        }

        return "Wystartowaliśmy";
    };

    return (
        <View key={advertisement.uid} style={styles.wrapper}>
            <View style={styles.container}>
                <View style={styles.subHeaderContainer}>
                    <Circle width={48} height={48} style={styles.avatarCircle}>
                        <ImageBackground
                            style={styles.avatarDisplayer}
                            source={require("../../../assets/images/menu-user-gopher.png")}
                        />
                    </Circle>
                </View>
                <View style={styles.companyAndTitleContainer}>
                    <Text style={styles.companyNameText}>
                        {advertisement.createdByUser.nameOfCompany}
                    </Text>
                    <Text style={styles.titleText}>{advertisement.title}</Text>
                </View>
            </View>
            <FilterDisplayer filters={filters} />
            <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                    {advertisement.description}
                </Text>
            </View>
            <View style={styles.footerContainer}>
                <View>
                    <Text style={styles.timeText}>
                        {returnLeftTimeText(advertisement.startDate)}
                    </Text>
                </View>

                <View style={styles.socialsContainer}>
                    {advertisement.neededSocials.map((social: string) => (
                        <SocialIcon
                            social={social}
                            width={20}
                            height={20}
                            fill={Colors.grayscale.text.subtitle}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}
