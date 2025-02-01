import {UserInfoType} from "./user-info.type";

export type LoginResponseType = {
    error: boolean,
    tokens?: {accessToken: string, refreshToken: string},
    user?: UserInfoType
}