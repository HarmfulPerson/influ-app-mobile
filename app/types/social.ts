import { User } from "./user";

export type SocialRange = {
    uid: string;
    displayName: string;
    maxReach: number;
    minReach: number;
    name: string;
};

export type SocialStatus = {
    uid: string;
    status: string;
    previousStatus?: string;
    socialUid?: string;
};

export type Social = {
    uid: string;
    publishDate: Date;
    platform: string;
    title: string;
    description: string;
    url?: string;
    facebookType?: string;
    instagramType?: string;
    isVideo?: boolean;
    advertisementType?: string;
    isCocreated?: boolean;
    isLive?: boolean;
    expositionType?: string;
    minimalAverageViewers?: number;
    livePeriod?: number;
    youtubeType?: string;
    socialStatus: SocialStatus;
    userUid: string;
    invitedUser: User;
    invitedUserUid?: string;
    campaignUid?: string;
};
