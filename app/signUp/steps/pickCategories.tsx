import { View, Text, Button as TamaguiButton } from "tamagui";
import { styles } from "../styles/pickCategories";
import { useEffect, useState } from "react";
import BackgroundSvg from "../../../assets/images/suseu-gradient-colour.svg";
import { LinearGradient } from "tamagui/linear-gradient";
import { getData } from "../../hooks/useGetData";
import Button from "../../components/Button/Button";
import Colors from "../../../constants/Colors";
import { CheckCircle2 } from "lucide-react-native";
import { router, useLocalSearchParams } from "expo-router";
import usePostData from "../../hooks/usePostData";
import { useSession } from "../../hooks/session/authenticationProvider";
import { CategoriesResponseData, Category } from "../../types/category";
import { URL } from "../../../constants/urls";
import { categoriesMapper } from "../../../constants/Categories";

type RoleResponseData = {
    data: Array<Category>;
};

type Role = {
    uid: string;
    name: string;
};

type SearchParams = {
    phoneNumber: string;
    country: string;
    email: string;
    username: string;
    password: string;
    repeatPassword: string;
};

export default function PickCategories() {
    const { phoneNumber, country, email, username, password, repeatPassword } =
        useLocalSearchParams() as SearchParams;
    const { postData: signUp } = usePostData();
    const { signIn } = useSession();
    const [categories, setCategories] = useState<Category[]>([]);
    const [pickedCategories, setPickedCategories] = useState<Category[]>([]);
    const [influencerRoles, setInfluencerRoles] = useState<Role[]>([]);

    useEffect(() => {
        getData<CategoriesResponseData>(URL.category).then(
            (res: CategoriesResponseData | void) => {
                if (res) setCategories(res.data);
            }
        );
        getData<RoleResponseData>(URL.role).then(
            (res: RoleResponseData | void) => {
                if (res) setInfluencerRoles(res.data);
            }
        );
    }, []);

    const handleCategoryClick = (category: Category) => {
        setPickedCategories((prevCategories) => {
            const isPicked = prevCategories.some(
                (item) => item.name === category.name
            );

            if (isPicked) {
                return prevCategories.filter(
                    (item) => item.name !== category.name
                );
            } else {
                return [...prevCategories, category];
            }
        });
    };

    const getClientRoles = (roles: Role[]) =>
        roles
            .filter(
                (roleItem: Role) =>
                    roleItem.name === "client" || roleItem.name === "user"
            )
            .map((roleItem: Role) => ({ roleUid: roleItem.uid }));

    const parseCategories = (categoriesToParse: Category[]) =>
        categoriesToParse.map((category: Category) => ({
            influencerCategoryUid: category.uid,
        }));

    const handleNavigateToNextPage = async () => {
        await signUp("/auth/signUp", {
            phoneNumber,
            country,
            username,
            email,
            password,
            repeatPassword,
            userCategories: parseCategories(pickedCategories),
            userRoles: getClientRoles(influencerRoles),
        });
        await signIn({ password, phoneNumber });
        router.push({
            pathname: "/signUp/steps/choosePhoto",
            params: {
                phoneNumber,
                country,
                username,
                email,
                password,
                repeatPassword,
                influencerCategories: pickedCategories,
            },
        });
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
                            {categories.map((category: Category) => (
                                <LinearGradient
                                    style={styles.gradientStyle}
                                    colors={
                                        pickedCategories.some(
                                            (item: Category) =>
                                                item.name === category.name
                                        )
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
                                        {pickedCategories.some(
                                            (item: Category) =>
                                                item.name === category.name
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
                                                pickedCategories.some(
                                                    (item: Category) =>
                                                        item.name ===
                                                        category.name
                                                )
                                                    ? styles.pickedStyle
                                                    : styles.unpickedStyle
                                            }>
                                            {
                                                categoriesMapper[
                                                    category.name as keyof typeof categoriesMapper
                                                ].name
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
                    text="Zarejestruj się"
                    onPress={handleNavigateToNextPage}
                />
            </View>
        </View>
    );
}
