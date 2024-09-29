import { ReactElement, useState, useRef, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../../../constants/Colors";
import ModalMechanism from "../ModalMechanism/ModalMechanism";
import { Button as TamaguiButton, Text } from "tamagui";
import { ChevronLeft, ChevronRight } from "lucide-react-native";
import FilterComponent, { FilterRef } from "../Filters/Filters";
import Button from "../Button/Button";
import CategoryModal from "./CategoryModal";
import { Category } from "../../types/category";
import { SocialRange } from "../../types/social";

type Props = {
  triggerButton: ReactElement<{ onPress: () => void }>;
  pickedCategories: Category[];
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  setPickedCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export type Filter = {
  sexes: Array<string>;
  ageRange: Array<number>;
  socialRanges: Array<SocialRange>;
  categories: Category[];
};

const BUTTON_WIDTH = 100;

const FilterModal = (props: Props) => {
  const {
    triggerButton,
    pickedCategories,
    setPickedCategories,
    setFilter,
    filter,
  } = props;
  const filterRef = useRef<FilterRef>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const closeModal = () => setIsVisible(false);
  const [isVisibleCategories, setIsVisibleCategories] =
    useState<boolean>(false);

  const closeModalCategories = () => setIsVisibleCategories(false);
  const [innerFilter, setInnerFilter] = useState<{
    sexes: Array<string>;
    ageRange: Array<number>;
    socialRanges: Array<SocialRange>;
    categories: Category[];
  }>({
    sexes: [],
    ageRange: [],
    socialRanges: [],
    categories: pickedCategories,
  });
  const handleSetFilter = (data: {
    age: Array<number>;
    range: Array<SocialRange>;
    sexes: Array<string>;
  }) => {
    setInnerFilter({
      ...filter,
      sexes: data.sexes,
      ageRange: data.age,
      socialRanges: data.range,
    });
  };

  useEffect(() => {
    setInnerFilter(filter);
  }, [filter]);

  const handleClickSet = async () => {
    closeModal();
    if (filterRef.current)
      filterRef.current.setInitial(
        innerFilter.ageRange,
        innerFilter.socialRanges,
        innerFilter.sexes
      );
    setFilter(innerFilter);
  };

  const handleCleanClick = () => {
    setInnerFilter({
      categories: [],
      sexes: [],
      ageRange: [24, 60],
      socialRanges: [],
    });
    if (filterRef.current) {
      filterRef.current.reset();
      setPickedCategories([]);
    }
  };

  return (
    <ModalMechanism
      open={isVisible}
      setOpen={setIsVisible}
      triggerButton={triggerButton}
      children={
        <View style={styles.modalContent}>
          <View>
            <View style={styles.topBar}>
              <View style={styles.backButtonContainer}>
                <TamaguiButton
                  borderColor={Colors.grayscale.surface.subtle}
                  onPress={closeModal}
                  style={styles.backButton}
                >
                  <ChevronLeft color={Colors.grayscale.text.body} />
                </TamaguiButton>
              </View>
              <View style={styles.header}>
                <Text>FILTRY</Text>
              </View>
              <View style={styles.cleanText}>
                <Text onPress={handleCleanClick} style={styles.rightButtonText}>
                  Wyczyść
                </Text>
              </View>
            </View>
            <View style={styles.categoryBar}>
              <View>
                <Text style={styles.categoryHeader}>Kategorie</Text>
              </View>
              <View style={styles.categoriesContainer}>
                <ModalMechanism
                  open={isVisibleCategories}
                  setOpen={setIsVisibleCategories}
                  triggerButton={
                    <Text style={styles.categoriesSeeAllText}>
                      Zobacz wszystkie
                    </Text>
                  }
                  children={
                    <CategoryModal
                      setPickedCategories={setPickedCategories}
                      pickedCategories={pickedCategories}
                      closeModal={closeModalCategories}
                    />
                  }
                />

                <ChevronRight
                  color={Colors.grayscale.text.subtitle}
                  width={16}
                  height={16}
                />
              </View>
            </View>
            <Text style={styles.sexText}>Płeć grupy docelowej</Text>
            <FilterComponent
              ref={filterRef}
              outerAge={filter.ageRange}
              outerRange={filter.socialRanges}
              outerSexes={filter.sexes}
              onChange={(data) => handleSetFilter(data)}
            />
          </View>

          <Button
            variant="primary"
            style={styles.navigationButton}
            text="Pokaz"
            onPress={handleClickSet}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  categoriesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  cleanText: {
    width: 100,
    height: 50,
    display: "flex",
    justifyContent: "center",
  },
  categoryHeader: {
    fontSize: 16,
    color: Colors.grayscale.text.title,
    fontFamily: "PoppinsSemiBold",
  },
  categoriesSeeAllText: {
    fontSize: 12,
    color: Colors.grayscale.text.subtitle,
    fontFamily: "PoppinsSemiBold",
  },
  sexText: {
    marginTop: 32,
    marginBottom: 8,
    fontWeight: "700",
    fontSize: 16,
    color: Colors.grayscale.text.caption,
  },
  navigationButton: { height: 56, width: "100%" },
  categoryBar: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  header: {
    flex: 1,
    height: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 12,
    color: Colors.grayscale.text.title,
  },
  modalContent: {
    width: "100%",
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 24,
    paddingRight: 24,
    height: "100%",
    backgroundColor: Colors.grayscale.surface.superDarker,
    borderTopLeftRadius: 48,
    borderTopRightRadius: 48,
    alignSelf: "flex-end",
    position: "relative",
    display: "flex",
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  backButton: {
    width: 50,
    height: 50,
    backgroundColor: Colors.grayscale.surface.darker,
  },
  backButtonContainer: {
    width: BUTTON_WIDTH,
  },
  rightButtonText: {
    color: Colors.grayscale.text.title,
    textAlign: "right",
    fontSize: 12,
    fontFamily: "PoppinsSemiBold",
  },
});

export default FilterModal;
