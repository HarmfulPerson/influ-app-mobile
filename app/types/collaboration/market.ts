export type CollaboraitonApplicationStatuses =
    | "remaining"
    | "accepted"
    | "rejected";

export type CollaborationUserReceived = {
    uid: string;
    offeredSocials: Array<string>;
    status: CollaboraitonApplicationStatuses;
    userUid: string;
    collaborationUid: string;
    createdAt: Date;
    updatedAt: Date;
};

export type CollaborationUserSent = {
    uid: string;
    offeredSocials: Array<string>;
    status: CollaboraitonApplicationStatuses;
    userUid: string;
    collaborationUid: string;
    createdAt: Date;
    updatedAt: Date;
};

export type Collaboration = {
    uid: string;
    campaignName: string;
    shortDescription: string;
    longDescription: string;
    startDate: Date;
    isPrivate: boolean;
    neededSocials: Array<string>;
    userUid: string;
    createdAt: Date;
    updatedAt: Date;
    collaborationsUserReceived: Array<CollaborationUserReceived>;
    collaborationsUserSent: Array<CollaborationUserSent>;
};

export type CollaborationUserReceivedWithCollaboration =
    CollaborationUserReceived & {
        collaboration: Collaboration;
    };
