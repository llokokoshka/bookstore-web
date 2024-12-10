import { RatingBook } from "./bookTypes";

export type UserType = {
    id?: number;
    fullName?: string;
    email?: string;
    password?: string;
    passwordNew?: string;
    avatar?: string;
    rating: RatingBook[];
};

export type PartialUserType = {
    id: number;
    fullName: string;
    avatar: string;
    email?: string;
}

export interface IUserRating {
    id: number;
    value: number;
};

export interface IUserRatingWithTotalRate extends IUserRating {
    avarageRating: number;
};

export interface IUserResponseData {
    access_token: string;
    refresh_token: string;
    user: UserType;
};

export interface IFormReg {
    email: string;
    password: string;
};

export interface IFormInput extends IFormReg {
    passwordRep: string;
};

export interface IFormInfo {
    fullName: string;
    email: string;
};

export interface IFormPass {
    password: string;
    passwordNew: string;
    passwordRep: string;
};

export interface IAuthState {
    user: UserType | null;
    error: string | null;
    loading: boolean;
};

export type ProfileInputPropsType = {
    img: string;
    label: string;
    typeP: string;
    register: any;
    name: string;
    disable: boolean;
    errors: any;
};