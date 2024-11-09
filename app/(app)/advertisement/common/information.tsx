import { ScrollView, Text, View } from "tamagui";
import Colors from "../../../../constants/Colors";
import { StyleSheet } from "react-native";
import { Calendar, Copy, Target, UsersRound } from "lucide-react-native";
import { useState } from "react";
import SocialIcon from "../../../components/SocialIconParser";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { SocialRange } from "../../../types/social";
import { Category } from "../../../types/category";
import { categoriesMapper } from "../../../../constants/Categories";
import { Advertisement } from "../../../types/advertisement";
import { styles } from "../styles/information";

const sexMapper = {
    female: "Kobieta",
    male: "Mężczyzna",
};

const Information = (props: { advertisement: Advertisement }) => {
    const { advertisement } = props;
    const [scrollViewWidth, setScrollViewWidth] = useState(0);

    const combinePeopleText = {
        name: `${advertisement.ageMin}-${
            advertisement.ageMax
        } lat ${advertisement.sexes
            .reduce(
                (acc: any, sex: string, index: number) =>
                    acc.concat(sexMapper[sex as keyof typeof sexMapper]),
                []
            )
            .join("/")}`,
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.infoContainer}>
                <View style={styles.dateRow}>
                    <Calendar
                        height={25}
                        width={25}
                        color={Colors.grayscale.surface.disabled}
                    />
                    <View style={styles.dateRowInfo}>
                        <Text
                            color={Colors.grayscale.text.caption}
                            fontSize={10}
                            lineHeight={12}>
                            Data pierwszej publikacji
                        </Text>
                        <Text
                            color={Colors.grayscale.text.title}
                            fontSize={16}
                            style={{ fontFamily: "PoppinsSemiBold" }}
                            lineHeight={19}>
                            {format(advertisement.startDate, "d LLLL yyyy", {
                                locale: pl,
                            })}
                        </Text>
                    </View>
                </View>
                <View style={styles.infoMiddleRow}>
                    <View style={styles.filterContainer}>
                        <Target
                            width={18}
                            height={18}
                            color={Colors.grayscale.text.subtitle}
                        />
                        <Text
                            fontSize={10}
                            lineHeight={12}
                            paddingTop={4}
                            color={Colors.grayscale.text.caption}>
                            Zasięgi
                        </Text>
                        <ScrollView
                            style={{ maxHeight: 30 }}
                            contentContainerStyle={{ justifyContent: "center" }}
                            showsVerticalScrollIndicator={false}>
                            {advertisement.socialRanges.map(
                                (socialRange: SocialRange) => (
                                    <Text
                                        fontSize={12}
                                        color={Colors.grayscale.text.title}
                                        style={styles.filterValues}>
                                        {socialRange.displayName}
                                    </Text>
                                )
                            )}
                        </ScrollView>
                    </View>
                    <View style={styles.filterContainer}>
                        <UsersRound
                            width={18}
                            height={18}
                            color={Colors.grayscale.text.subtitle}
                        />
                        <Text
                            fontSize={10}
                            lineHeight={12}
                            paddingTop={4}
                            color={Colors.grayscale.text.caption}>
                            Grupa docelowa
                        </Text>
                        <Text
                            fontSize={12}
                            color={Colors.grayscale.text.title}
                            style={styles.filterValues}>
                            {combinePeopleText.name}
                        </Text>
                    </View>
                    <View style={styles.filterContainer}>
                        <Copy
                            width={18}
                            height={18}
                            color={Colors.grayscale.text.subtitle}
                        />
                        <Text
                            fontSize={10}
                            lineHeight={12}
                            paddingTop={4}
                            color={Colors.grayscale.text.caption}>
                            Kategorie
                        </Text>
                        <ScrollView
                            style={{ maxHeight: 30 }}
                            contentContainerStyle={{ justifyContent: "center" }}
                            showsVerticalScrollIndicator={false}>
                            {advertisement.influencerCategories.map(
                                (category: Category) => (
                                    <Text
                                        fontSize={12}
                                        color={Colors.grayscale.text.title}
                                        style={styles.filterValues}>
                                        {
                                            categoriesMapper[
                                                category.name as keyof typeof categoriesMapper
                                            ].name
                                        }
                                    </Text>
                                )
                            )}
                        </ScrollView>
                    </View>
                </View>
                <View
                    style={{ flex: 1 }}
                    onLayout={(event) => {
                        const width = event.nativeEvent.layout.width;
                        setScrollViewWidth(width);
                    }}>
                    <ScrollView
                        contentContainerStyle={styles.socialContainer}
                        horizontal
                        showsHorizontalScrollIndicator={false}>
                        {advertisement.neededSocials.map((value: string) => (
                            <View
                                style={{
                                    ...styles.eachSocialContainer,
                                    width:
                                        scrollViewWidth /
                                        (advertisement.neededSocials.length > 2
                                            ? 3
                                            : advertisement.neededSocials
                                                  .length),
                                }}>
                                <SocialIcon
                                    social={value}
                                    coloured
                                    width={20}
                                    height={20}
                                />
                                <Text
                                    fontSize={12}
                                    color={Colors.grayscale.text.title}
                                    style={styles.socialString}>
                                    {value}
                                </Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <Text
                fontSize={24}
                paddingBottom={16}
                style={{ fontFamily: "PoppinsSemiBold" }}
                color={Colors.grayscale.text.title}>
                Szczegóły zlecenia
            </Text>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Text fontSize={16} color={Colors.grayscale.text.body}>
                    {advertisement.description}
                </Text>
            </ScrollView>
        </View>
    );
};

export default Information;
