import { Text, View } from "tamagui";
import Background from "../common/background";
import Button from "../../../components/Button/Button";
import { useState } from "react";
import { Category } from "../../../types/category";
import { styles } from "../styles/pickCategories";
import { router } from "expo-router";
import CategoryPicker from "../../../components/CategoryPicker/CategoryPicker";

export default function PickCategories() {
    const [pickedCategories, setPickedCategories] = useState<Category[]>([]);

    const navigateNextPage = () => {
        router.push({
            pathname: "addCollaboration/steps/description",
            params: {
                advertisementCategories: JSON.stringify(pickedCategories),
            },
        });
    };

    const mainArea = (
        <View flex={1}>
            <Text style={styles.header}>Wybierz kategorie</Text>
            <CategoryPicker handleSetCategories={setPickedCategories} />
        </View>
    );
    const bototmArea = (
        <Button
            onPress={navigateNextPage}
            text="Dalej"
            variant="primary"
            disabled={!pickedCategories.length}
            style={styles.navigateNextButton}
        />
    );

    return (
        <Background mainArea={mainArea} bottomArea={bototmArea} progress={0} />
    );
}
