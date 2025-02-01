import {HttpUtils} from "./http-utils";
import {UserInfoType} from "../types/user-info.type";
import {GetAuthType} from "../types/get-auth.type";
import {DefaultResponseType} from "../types/default-response.type";

export class AuthUtils {
    public static accessTokenKey: string = 'accessToken';
    public static refreshTokenKey: string = 'refreshToken';
    public static userInfoKey: string = 'userInfo';

    public static setAuthInfo(accessToken: string, refreshToken: string, userInfo: UserInfoType | null = null): void {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        if (userInfo) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        }
    }

    static getAuthInfo(key: string | null): string | null;
    static getAuthInfo(): GetAuthType;


    // static getAuthInfo(key: string | null = null): string | null | GetAuthType {
    //     if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoKey].includes(key)) {
    //         return localStorage.getItem(key);
    //     } else {
    //         return {
    //             [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
    //             [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
    //             [this.userInfoKey]: localStorage.getItem(this.userInfoKey),
    //         }
    //     }
    // }
    static getAuthInfo(key: string | null = null): string | null | GetAuthType {
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoKey].includes(key)) {
            return localStorage.getItem(key); // string | null
        } else {
            // Возвращаем объект с типом GetAuthType
            return {
                accessToken: localStorage.getItem(this.accessTokenKey),  // string | null
                refreshToken: localStorage.getItem(this.refreshTokenKey),  // string | null
                userInfoKey: localStorage.getItem(this.userInfoKey),  // string | null
            };
        }
    }

    public static removeAuthInfo(): void {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);
    }

    public static async updateRefreshToken(): Promise<boolean> {
        let resultUpdateRefreshToken: boolean = false;
        const refreshToken: string | null = this.getAuthInfo(this.refreshTokenKey);
        if (refreshToken) {
            const result: DefaultResponseType = await HttpUtils.request('/refresh', 'POST', false, {
                refreshToken: refreshToken
            })
            if (!result.error && result.response && result.response.tokens) {
                    this.setAuthInfo(result.response.tokens.accessToken, result.response.tokens.refreshToken);
                    resultUpdateRefreshToken = true;
            }
        }
        if (!resultUpdateRefreshToken) {
            this.removeAuthInfo();
        }
        return resultUpdateRefreshToken;
    }
}