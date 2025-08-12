export const EXPOSITION_TYPES = {
  passive: "passive",
  active: "active",
};

export const SOCIAL_ALL_TYPES = {
  live: "live",
  post: "post",
  video: "video",
  story: "story",
  short: "short",
};

export const SOCIAL_TYPES_POSSIBILITIES = {
  tiktok: [SOCIAL_ALL_TYPES.video],
  instagram: [SOCIAL_ALL_TYPES.post, SOCIAL_ALL_TYPES.video, SOCIAL_ALL_TYPES.story],
  facebook: [SOCIAL_ALL_TYPES.post, SOCIAL_ALL_TYPES.video, SOCIAL_ALL_TYPES.story],
  youtube: [SOCIAL_ALL_TYPES.live, SOCIAL_ALL_TYPES.video, SOCIAL_ALL_TYPES.short],
  x: [SOCIAL_ALL_TYPES.post],
  twitch: [SOCIAL_ALL_TYPES.live],
  linkedin: [SOCIAL_ALL_TYPES.post],
  spotify: [SOCIAL_ALL_TYPES.post],
};

export const SOCIAL_STATUSES = {
  offerSet: "offerSet",
  offerRejected: "offerRejected",
  offerAccepted: "offerAccepted",
  productSent: "productSent",
  productReceived: "productReceived",
  brief: "brief",
  briefAccepted: "briefAccepted",
  briefRejected: "briefRejected",
  materialsSet: "materialsSet",
  materialsAccepted: "materialsAccepted",
  materialsRejected: "materialsRejected",
  published: "published",
  publicationAccepted: "publicationAccepted",
  statisticsOneDay: "staticticsOneDay",
  statisticsOneWeek: "statisticsOneWeek",
  finished: "finished",
} as const;

export const SOCIAL_STATUS_NEXT_STEP = {
  offerSet: {
    title: "Oczekiwanie na akceptację oferty",
    subtitle: "Musisz poczekać na akceptację oferty przez influencera.",
  },
  offerRejected: {
    title: "Oferta odrzucona",
    subtitle: "Niestety, oferta została odrzucona.",
  },
  offerAccepted: {
    title: "Wysyłanie produktu",
    subtitle: "Oczekiwanie na wysłanie produktu.",
  },
  productSent: {
    title: "Akceptacja produktu",
    subtitle: "Oczekiwanie na odebranie produktu.",
  },
  productReceived: {
    title: "Stworzenie briefu",
    subtitle: "Oczekiwanie na stworzenie briefu.",
  },
  brief: {
    title: "Akceptacja briefu",
    subtitle: "Brief oczekuje na akceptację.",
  },
  briefAccepted: {
    title: "Stworzenie materiałów",
    subtitle: "Oczekiwanie na stworzenie materiałów.",
  },
  briefRejected: {
    title: "Brief odrzucony",
    subtitle: "Oczekiwanie na poprawienie briefu.",
  },
  materialsSet: {
    title: "Akceptacja materiałow",
    subtitle: "Oczekiwanie na akceptację.",
  },
  materialsAccepted: {
    title: "Publikacja",
    subtitle: "Oczekiwanie na opublikowanie.",
  },
  materialsRejected: {
    title: "Materiały odrzucone",
    subtitle: "Oczekiwanie na poprawienie.",
  },
  published: {
    title: "Akceptacja publikacji",
    subtitle: "Oczekiwanie na akceptację publikacji.",
  },
  publicationAccepted: {
    title: "Statystyki po jednym dniu",
    subtitle: "Oczekiwanie na statystyki.",
  },
  statisticsOneDay: {
    title: "Statystyki po tygodniu.",
    subtitle: "Oczekiwanie na statystyki tygodniowe.",
  },
  statisticsOneWeek: {
    title: "Zakończenie współpracy",
    subtitle: "Oczekiwanie na zakończenie współpracy.",
  },
  finished: {
    title: "Zakończone",
    subtitle: "Dziękujemy za współpracę!",
  },
};

export const SOCIAL_STATUSES_ACTION_FOR_ADVERTISER: (keyof typeof SOCIAL_STATUSES)[] = [
  SOCIAL_STATUSES.offerAccepted,
  SOCIAL_STATUSES.productReceived,
  SOCIAL_STATUSES.briefAccepted,
  SOCIAL_STATUSES.briefRejected,
  SOCIAL_STATUSES.materialsAccepted,
  SOCIAL_STATUSES.materialsRejected,
  SOCIAL_STATUSES.published,
];

export const SOCIAL_STATUS_MAPPER_ADVERTISER: Record<string, keyof typeof SOCIAL_STATUSES> = {
  [SOCIAL_STATUSES.offerAccepted]: SOCIAL_STATUSES.productSent,
  [SOCIAL_STATUSES.productReceived]: SOCIAL_STATUSES.brief,
  [SOCIAL_STATUSES.briefRejected]: SOCIAL_STATUSES.brief,
  [SOCIAL_STATUSES.briefAccepted]: SOCIAL_STATUSES.materialsSet,
  [SOCIAL_STATUSES.materialsRejected]: SOCIAL_STATUSES.materialsSet,
  [SOCIAL_STATUSES.statisticsOneWeek]: SOCIAL_STATUSES.finished,
};
