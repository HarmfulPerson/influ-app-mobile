import { ScrollView, Sheet, Text, View } from "tamagui";
import Colors from "../../../constants/Colors";
import { useEffect, useState } from "react";
import { CategoriesResponseData, Category } from "../../types/category";
import { getData } from "../../hooks/useGetData";
import { URL } from "../../../constants/urls";
import { categoriesMapper } from "../../../constants/Categories";
import { StyleSheet, TouchableWithoutFeedback } from "react-native";

const CategoryPicker = (props: any) => {
  const { handleSetCategories, previouslyPicked = [] } = props;
  const [categories, setCategories] = useState<Category[]>([]);
  const [pickedCategories, setPickedCategories] =
    useState<Category[]>(previouslyPicked);

  useEffect(() => {
    if (!categories.length)
      getData<CategoriesResponseData>(URL.category).then(
        (res: CategoriesResponseData | void) => {
          if (res) setCategories(res.data);
        }
      );
  }, []);

  useEffect(() => {
    handleSetCategories(pickedCategories);
  }, [pickedCategories]);

  const handleCategoryClick = (category: Category) => {
    setPickedCategories((prevCategories) => {
      const isPicked = prevCategories.some(
        (item) => item.name === category.name
      );

      if (isPicked) {
        return prevCategories.filter((item) => item.name !== category.name);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const CategoryComponent = ({ category }: { category: Category }) => {
    const categoryMapped =
      categoriesMapper[category.name as keyof typeof categoriesMapper];

    if (!category) {
      return <Text>Category not found</Text>;
    }
    const isPicked = pickedCategories.some(
      (item: Category) => item.name === category.name
    );

    const IconComponent = categoryMapped.icon;

    return (
      <View
        onPress={() => handleCategoryClick(category)}
        style={[
          styles.eachCategorySquare,
          {
            backgroundColor: isPicked
              ? Colors.primary.surface.lighter
              : Colors.grayscale.surface.default,
          },
        ]}
      >
        <View style={styles.iconContainer}>
          <IconComponent
            width={34}
            height={34}
            color={
              isPicked
                ? Colors.grayscale.text.negative
                : Colors.grayscale.border.default
            }
          />
        </View>
        <View style={styles.categoryNameContainer}>
          <Text
            style={[
              styles.categoryName,
              {
                color: isPicked
                  ? Colors.grayscale.text.negative
                  : Colors.grayscale.border.default,
              },
            ]}
          >
            {categoryMapped.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.categoriesContainer}>
      {categories.map((category) => (
        <CategoryComponent key={category.name} category={category} />
      ))}
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  navigationButton: {
    height: 56,
    width: "100%",
    marginTop: 36,
    marginBottom: 24,
  },
  categoriesContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  eachCategorySquare: {
    width: "30%",
    aspectRatio: 1,
    margin: "1.5%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    padding: 16,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
  },
  categoryNameContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.5,
    width: "100%",
  },
  categoryName: {
    marginTop: 2,
    fontSize: 10,
    textAlign: "center",
  },
  header: {
    fontWeight: "700",
    fontSize: 24,
    marginBottom: 16,
    color: Colors.grayscale.text.title,
    paddingLeft: 24,
    marginTop: 36,
    marginLeft: "1.5%",
  },
  navigateNextButton: { width: "100%", height: "100%" },
});

export default CategoryPicker;
