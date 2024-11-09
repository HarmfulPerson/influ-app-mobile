import { User } from "./user";

export type AdvertisementUserReceivedOrSent = {
    advertisementUid: string;
    createdAt: Date;
    status: "remaining" | "accepted" | "rejected";
    uid: string;
    updatedAt: Date;
    userUid: string;
    user: User;
};

export type Advertisement = {
    advertisementUserReceived: Array<AdvertisementUserReceivedOrSent>;
    advertisementsUserSent: Array<AdvertisementUserReceivedOrSent>;
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
