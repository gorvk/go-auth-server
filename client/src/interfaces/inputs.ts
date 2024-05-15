export interface IRegisterInput {
    email: string;
    firstName: string;
    lastName: string;
    accountPassword: string;
}

export interface ILoginInput {
    email: string;
    accountPassword: string;
}