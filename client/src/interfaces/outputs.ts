import { IUser } from "./models";

export interface IGetUserOutput {
    isSuccess: boolean,
    result: IUser
}

export interface ICommonOutput {
    isSuccess: boolean,
    result: boolean
}