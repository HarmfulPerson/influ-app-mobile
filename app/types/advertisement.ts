import { User } from "./user";

export type Advertisement = {
    advertisementUserReceived: any;
    advertisementsUserSent: any;
    ageMax: number;
    ageMin: number;
    createdAt: Date;
    description: string;
    isPublishedByAdvertiser: boolean;
    neededSocials: string[];
    sexes: string[];
    startDate: Date;
    title: string;
    uid: string;
    updatedAt: Date;
    userUid: string;
    createdByUser: User;
    socialRanges: any;
    influencerCategories: any;
};
