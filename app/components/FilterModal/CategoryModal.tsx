import { Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";
import CategoryPicker from "../CategoryPicker/CategoryPicker";
import Button from "../Button/Button";

const CategoryModal = (props: any) => {
    const { setPickedCategories, closeModal, pickedCategories } = props;
    return (
        <TouchableWithoutFeedback>
            <View style={styles.container}>
                <View style={styles.whitebar} onPress={closeModal}></View>
                <View style={styles.wrapper}>
                    <View style={styles.categoriesPickerContainer}>
                        <Text style={styles.header}>Wybierz kategorie</Text>
                        <CategoryPicker
                            handleSetCategories={setPickedCategories}
                            previouslyPicked={pickedCategories}
                        />
                    </View>
                    <Button
                        text="Zastosuj"
                        variant="primary"
                        size="medium"
                        style={styles.setButton}
                        onPress={closeModal}
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export const styles = StyleSheet.create({
    wrapper: {
        paddingLeft: 24,
        paddingRight: 24,
        flex: 1,
        display: "flex",
        justifyContent: "space-between",
    },
    categoriesPickerContainer: { height: "70%" },
    header: {
        fontWeight: "700",
        fontSize: 24,
        marginBottom: 16,
        marginTop: 48,
        color: Colors.grayscale.text.title,
    },
    setButton: { width: "100%", height: 56, marginBottom: 24 },
    container: {
        width: "100%",
        height: "79%",
        backgroundColor: Colors.grayscale.surface.superDarker,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
    },
    whitebar: {
        marginLeft: "auto",
        marginRight: "auto",
        width: 40,
        height: 4,
        borderRadius: 40,
        marginTop: 10,
        backgroundColor: "white",
    },
});

export default CategoryModal;
