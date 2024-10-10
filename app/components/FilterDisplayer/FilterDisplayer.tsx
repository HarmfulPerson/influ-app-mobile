import { ScrollView, View } from "react-native";
import Colors from "../../../constants/Colors";
import { Button, Text } from "tamagui";
import { Settings2, Target, Users } from "lucide-react-native";
import { categoriesMapper } from "../../../constants/Categories";
import { styles } from "./styles";
import { Category } from "../../types/category";
import { SocialRange } from "../../types/social";

const sexMapper = {
    female: "Kobieta",
    male: "Mężczyzna",
};

type Props = {
    filters: {
        ageMin: number;
        ageMax: number;
        sexes: Array<string>;
        advertisementSocialRanges: Array<SocialRange>;
        categories: Array<Category>;
        isPublishedByAdvertiser?: boolean;
    };
    isFromList?: boolean;
};

const FilterDisplayer = (props: Props) => {
    const { filters, isFromList = false } = props;

    const combinePeopleText = {
        icon: Users,
        name: `${filters.ageMin}-${filters.ageMax} lat ${filters.sexes
            .reduce(
                (acc: any, sex: string, index: number) =>
                    acc.concat(sexMapper[sex as keyof typeof sexMapper]),
                []
            )
            .join("/")}`,
    };

    const reachTexts = filters.advertisementSocialRanges.map(
        (eachRange: SocialRange) => ({
            name: eachRange.displayName,
            icon: Target,
        })
    );

    const categories = filters.categories.map(
        (category: Category) =>
            categoriesMapper[category.name as keyof typeof categoriesMapper]
    );

    const publisher = {
        icon: Settings2,
        name: filters.isPublishedByAdvertiser
            ? "Publikacja przez reklamodawcę"
            : "Publikacja przez twórcę",
    };

    const CategoryComponent = ({
        filter,
    }: {
        filter: { icon: any; name: string };
    }) => {
        const IconComponent = filter.icon;

        return (
            <Button
                pressStyle={{ borderColor: Colors.grayscale.border.default }}
                style={isFromList ? styles.eachListPill : styles.eachPill}>
                <IconComponent
                    color={isFromList ? Colors.grayscale.text.caption : "white"}
                    width={10}
                    height={10}
                    strokeWidth={2}
                />
                <Text
                    color={isFromList ? Colors.grayscale.text.caption : "white"}
                    style={{ fontSize: 10 }}>
                    {filter.name}
                </Text>
            </Button>
        );
    };

    const allFilters = [combinePeopleText, ...reachTexts, ...categories];
    if (filters.isPublishedByAdvertiser !== undefined)
        allFilters.push(publisher);
    const firstRow = allFilters.filter(
        (item: { icon: any; name: string }, index) => index % 2 === 0
    );
    const secondRow = allFilters.filter(
        (item: { icon: any; name: string }, index) => index % 2 === 1
    );

    return (
        <View>
            <ScrollView
                horizontal={true}
                contentContainerStyle={styles.container}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.eachRow}>
                    {firstRow.map((filter: { icon: any; name: string }) => (
                        <CategoryComponent key={filter.name} filter={filter} />
                    ))}
                </View>
                <View style={styles.eachRow}>
                    {secondRow.map((filter: { icon: any; name: string }) => (
                        <CategoryComponent key={filter.name} filter={filter} />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

export default FilterDisplayer;
