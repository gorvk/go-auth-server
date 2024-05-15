import { ILoginInput, IRegisterInput } from "../interfaces/inputs";
import { ICommonOutput, IGetUserOutput } from "../interfaces/outputs";
import { getMethodGetHeader, getMethodPostHeader } from "../utils/https";
import { API_URL } from "../utils/constants";

const baseUrl = API_URL + "/auth";

export const loginApi = async (payload: ILoginInput): Promise<ICommonOutput> => {
    const url: string = '/login';
    const requestInit: RequestInit | undefined = getMethodPostHeader(payload);
    const response: Response = await fetch(baseUrl + url, requestInit)
    const json: ICommonOutput = await response.json()
    return json;
}

export const isLoggedInApi = async (): Promise<IGetUserOutput> => {
    const url: string = '/is-logged-in';
    const requestInit: RequestInit | undefined = getMethodGetHeader();
    const response: Response = await fetch(baseUrl + url, requestInit)
    const json: IGetUserOutput = await response.json()
    return json;
}

export const registerApi = async (payload: IRegisterInput): Promise<ICommonOutput> => {
    const url = '/register'
    const requestInit: RequestInit | undefined = getMethodPostHeader(payload);
    const response: Response = await fetch(baseUrl + url, requestInit)
    const json: ICommonOutput = await response.json()
    return json;
}

export const logoutApi = async (): Promise<ICommonOutput> => {
    const url: string = '/logout'
    const requestInit: RequestInit | undefined = getMethodGetHeader();
    const response: Response = await fetch(baseUrl + url, requestInit)
    const json: ICommonOutput = await response.json()
    return json;
}