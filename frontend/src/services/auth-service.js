import {HttpUtils} from "../utils/http-utils";


export class AuthService {
    static async login(data) {
        const result = await HttpUtils.request('/login', "POST", false, data)

        if (result.error || !result.response.tokens || !result.response.user) {
            return false;
        }

        return result.response;
    }
    static async signup(data) {
        const result = await HttpUtils.request('/signup', "POST", false, data)

        if (result.error || !result.response.tokens || !result.response.user) {
            return false;
        }

        return result.response;
    }

    static async logout(data) {
        await HttpUtils.request('/logout', "POST", false, data)
    }
}