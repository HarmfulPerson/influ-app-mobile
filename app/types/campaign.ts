import { Social } from "./social";

export type Campaign = {
    uid: string;
    name: string;
    purpose: string;
    socials: Array<Social>;
};
