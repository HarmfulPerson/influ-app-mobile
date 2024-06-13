import { View, Text, Button as TamaguiButton } from "tamagui";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { styles } from "../styles/pickCategories";
import { useEffect, useState } from "react";
import BackgroundSvg from "../../../assets/images/suseu-gradient-colour.svg";
import { LinearGradient } from "tamagui/linear-gradient";
import { getData } from "../../hooks/useGetData";
import Button from "../../components/Button/Button";
import Colors from "../../../constants/Colors";
import { CheckCircle, CheckCircle2, X } from "lucide-react-native";
import { router } from "expo-router";

const url = "/categories";

const categoriesMapper = {
    fashion: "Moda",
    beauty: "Uroda",
    travel: "Podróże",
    healthAndFitness: "Fitness i zdrowie",
    food: "Jedzenie",
    gaming: "Gaming",
    technology: "Technologia",
    educationAndScience: "Edukacja i nauka",
    artAndCrafts: "Sztuka i rękodzieło",
    music: "Muzyka",
    entertainment: "Rozrywka",
    lifestyle: "Lifestyle",
    kidsAndFamily: "Rodzina i dzieci",
    business: "Biznes",
    animals: "Zwierzęta",
    homeAndGarden: "Dom i ogród",
};

type Category = {
    uid: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

type CategoriesResponseData = {
    data: Array<Category>;
};

export default function PickCategories() {
    const [categories, setCategories] = useState<string[]>([]);
    const [pickedCategories, setPickedCategories] = useState<string[]>([]);

    useEffect(() => {
        getData<CategoriesResponseData>(url).then(
            (res: CategoriesResponseData | void) => {
                if (res)
                    setCategories(
                        res.data.map((category: Category) => category.name)
                    );
            }
        );
    }, []);

    const handleCategoryClick = (category: string) => {
        if (pickedCategories.includes(category))
            setPickedCategories(
                pickedCategories.filter(
                    (presentCategory: string) => presentCategory !== category
                )
            );
        else setPickedCategories([...pickedCategories, category]);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.smallLogo}>
                    <BackgroundSvg width={40} height={40} />
                </View>
            </View>
            <View style={styles.contentWrapper}>
                <View>
                    <Text style={styles.titleText}>Okresl swoja kategorie</Text>
                    <Text style={styles.infoText}>
                        Wybierz kategorie klikajac na dowolny kafelek
                    </Text>
                    {!!categories.length && (
                        <View style={styles.buttonsContainer}>
                            {categories.map((category: string) => (
                                <LinearGradient
                                    style={styles.gradientStyle}
                                    colors={
                                        pickedCategories.includes(category)
                                            ? [
                                                  Colors.primary.surface
                                                      .lighter,
                                                  Colors.primary.text.label,
                                              ]
                                            : ["transparent", "transparent"]
                                    }
                                    start={{ y: 0.0, x: 1.0 }}
                                    end={{ y: 1.0, x: 0.0 }}>
                                    <TamaguiButton
                                        onPress={() =>
                                            handleCategoryClick(category)
                                        }
                                        style={styles.eachCategoryButton}>
                                        {pickedCategories.includes(
                                            category
                                        ) && (
                                            <CheckCircle2
                                                width={18}
                                                height={18}
                                                color="black"
                                            />
                                        )}
                                        <Text
                                            fontSize={14}
                                            style={
                                                pickedCategories.includes(
                                                    category
                                                )
                                                    ? styles.pickedStyle
                                                    : styles.unpickedStyle
                                            }>
                                            {
                                                categoriesMapper[
                                                    category as keyof typeof categoriesMapper
                                                ]
                                            }
                                        </Text>
                                    </TamaguiButton>
                                </LinearGradient>
                            ))}
                        </View>
                    )}
                </View>
                <Button
                    style={styles.nextStepButton}
                    variant="primary"
                    disabled={!pickedCategories.length}
                    text="Dalej"
                    onPress={() => router.push("/signUp/steps/choosePhoto")}
                />
            </View>
        </View>
    );
}
