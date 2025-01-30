import {HttpUtils} from "./http-utils";

export class AuthUtils {
    static accessTokenKey = 'accessToken';
    static refreshTokenKey = 'refreshToken';
    static userInfoKey = 'userInfo';

    static setAuthInfo(accessToken, refreshToken, userInfo = null) {
        localStorage.setItem(this.accessTokenKey, accessToken);
        localStorage.setItem(this.refreshTokenKey, refreshToken);
        if (userInfo) {
            localStorage.setItem(this.userInfoKey, JSON.stringify(userInfo));
        }
    }

    static getAuthInfo(key = null) {
        if (key && [this.accessTokenKey, this.refreshTokenKey, this.userInfoKey].includes(key)) {
            return localStorage.getItem(key);
        } else {
            return {
                [this.accessTokenKey]: localStorage.getItem(this.accessTokenKey),
                [this.refreshTokenKey]: localStorage.getItem(this.refreshTokenKey),
                [this.userInfoKey]: localStorage.getItem(this.userInfoKey),
            }
        }
    }

    static removeAuthInfo() {
        localStorage.removeItem(this.accessTokenKey);
        localStorage.removeItem(this.refreshTokenKey);
        localStorage.removeItem(this.userInfoKey);
    }

    static async updateRefreshToken() {
        let resultUpdateRefreshToken = false;
        const refreshToken = this.getAuthInfo(this.refreshTokenKey);
        if (refreshToken) {
            const result = await HttpUtils.request('/refresh', 'POST', false, {
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