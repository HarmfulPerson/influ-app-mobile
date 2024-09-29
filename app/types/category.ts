export type Category = {
  uid: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CategoriesResponseData = {
  data: Array<Category>;
};

export type Categories =
  | "fashion"
  | "beauty"
  | "travel"
  | "healthAndFitness"
  | "food"
  | "gaming"
  | "technology"
  | "educationAndScience"
  | "artAndCrafts"
  | "music"
  | "entertainment"
  | "lifestyle"
  | "kidsAndFamily"
  | "business"
  | "animals"
  | "homeAndGarden";
