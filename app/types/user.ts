import { Categories } from "./category";

type UserRole = {
  uid: string;
  userUid: string;
  roleUid: string;
  createdAt: string;
  updatedAt: string;
};

type Role = {
  uid: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  UserRole: UserRole;
};

type UserCategory = {
  uid: string;
  userUid: string;
  influencerCategoryUid: string;
  createdAt: string;
  updatedAt: string;
};

type InfluencerCategory = {
  uid: string;
  name: Categories;
  createdAt: string;
  updatedAt: string;
  UserCategory: UserCategory;
};

export type User = {
  uid: string;
  nameOfCompany: string;
  username: string;
  email: string;
  phoneNumber: string;
  city: string;
  street: string;
  streetNumber: string;
  typeOfReckoning: string;
  NIP: string;
  zipCode: string | null;
  taxOffice: string | null;
  pesel: string | null;
  description: string;
  country: string | null;
  businessIdentifier: string | null;
  accountNumber: string | null;
  isActive: boolean;
  isVatPayer: boolean | null;
  isBefore26: boolean | null;
  isAgreementOverSixMonths: boolean | null;
  endDateOfAgreement: string | null;
  startOfAgreement: string | null;
  studentCardExpirationDate: string | null;
  legalFormOfTheCompany: string | null;
  KRS: string | null;
  registrationAuthority: string | null;
  avatarUrl: string | null;
  shareCapital: string | null;
  createdAt: string;
  updatedAt: string;
  roles: Role[];
  influencerCategories: InfluencerCategory[];
};
