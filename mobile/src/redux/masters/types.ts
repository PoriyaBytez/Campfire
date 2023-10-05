import { LoadingState } from "~screens/types";

export type MasterState = {
    loading: LoadingState,
    describes: Describes[],
    countries: Country[],
    character: Character[],
}

export type Describes = {
    _id?: string;
    label?: string;
    value?: string;
}

export type Country = {
    _id?: string;
    name?: string;
    code?: string;
    multi_digit_code?: string;
    initial?: string;
}

export type Character = {
    _id?: string;
    character?: string;
    description?: string;
    gender?: string;
}
