import { CheckedState } from "tamagui";

export type AddCollaborationData = {
    startDate: Date;
    campaignName: string;
    shortDescription: string;
    longDescription: string;
    isPrivate: boolean | "indeterminate";
    neededSocials: Array<string>;
};

export type AddCollaborationDataErrors = {
    startDate: null | string;
    campaignName: null | string;
    shortDescription: null | string;
    neededSocials: null | string;
};
