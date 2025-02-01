import {HttpUtils} from "../utils/http-utils";


export class AuthService {
    static async login(data: any) {
        const result = await HttpUtils.request('/login', "POST", false, data)

        if (result.error || !result.response.tokens || !result.response.user) {
            return false;
        }

        return result.response;
    }
    static async signup(data: any) {
        const result = await HttpUtils.request('/signup', "POST", false, data)

        if (result.error || !result.response.tokens || !result.response.user) {
            return false;
        }

        return result.response;
    }

    static async logout(data: any) {
        await HttpUtils.request('/logout', "POST", false, data)
    }
}