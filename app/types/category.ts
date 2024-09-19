export type Category = {
    uid: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
};

export type CategoriesResponseData = {
    data: Array<Category>;
};
