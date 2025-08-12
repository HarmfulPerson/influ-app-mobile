import { SOCIAL_STATUSES } from "../../constants/Social";
import { Campaign } from "./campaign";
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
  status: keyof typeof SOCIAL_STATUSES;
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
  executor: User;
  invitedUserUid?: string;
  campaignUid?: string;
  campaign: Campaign;
};
export type SocialCreateBody = {
  id: string;
  platform: string;
  title: string;
  description: string;
  executorUid: string;
  publishDate: Date;
  payment: { price: number };
  isCocreated?: boolean;
  advertisementType?: string;
  expositionType?: string;
  livePeriod?: number;
  minimalAverageViewers?: number;
  type: string;
  campaignUid?: string;
};
