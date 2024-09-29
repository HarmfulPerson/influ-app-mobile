import { CheckCircle2, LucideIcon } from "lucide-react-native";
import { ReactElement } from "react";
import { Categories } from "../app/types/category";

interface CategoryMapper {
  name: string;
  icon: React.ComponentType;
}

export const categoriesMapper: Record<
  Categories,
  { name: string; icon: LucideIcon }
> = {
  fashion: { name: "Moda", icon: CheckCircle2 },
  beauty: { name: "Uroda", icon: CheckCircle2 },
  travel: { name: "Podróże", icon: CheckCircle2 },
  healthAndFitness: { name: "Fitness i zdrowie", icon: CheckCircle2 },
  food: { name: "Jedzenie", icon: CheckCircle2 },
  gaming: { name: "Gaming", icon: CheckCircle2 },
  technology: { name: "Technologia", icon: CheckCircle2 },
  educationAndScience: { name: "Edukacja i nauka", icon: CheckCircle2 },
  artAndCrafts: { name: "Sztuka i rękodzieło", icon: CheckCircle2 },
  music: { name: "Muzyka", icon: CheckCircle2 },
  entertainment: { name: "Rozrywka", icon: CheckCircle2 },
  lifestyle: { name: "Lifestyle", icon: CheckCircle2 },
  kidsAndFamily: { name: "Rodzina i dzieci", icon: CheckCircle2 },
  business: { name: "Biznes", icon: CheckCircle2 },
  animals: { name: "Zwierzęta", icon: CheckCircle2 },
  homeAndGarden: { name: "Dom i ogród", icon: CheckCircle2 },
};
