export const SOCIAL_TYPES = {
    twitch: "twitch",
    instagram: "instagram",
    tiktok: "tiktok",
    youtube: "youtube",
    facebook: "facebook",
    x: "x",
    linkedin: "linkedin",
    spotify: "spotify",
};

export const SOCIAL_RANGES = {
    micro: { displayName: "1k - 10k", value: [1000, 10000], name: "micro" },
    small: { displayName: "10k - 50k", value: [10000, 50000], name: "small" },
    medium: {
        displayName: "50k - 500k",
        value: [50000, 500000],
        name: "medium",
    },
    big: { displayName: "500k - 1mln", value: [500000, 10000000], name: "big" },
    large: {
        displayName: "1mln+",
        value: [10000000, 9999999999],
        name: "large",
    },
};

export const SEXES = {
    male: "male",
    female: "female",
};
