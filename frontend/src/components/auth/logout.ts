import {AuthUtils} from "../../utils/auth-utils";
import {AuthService} from "../../services/auth-service";
import {OpenNewRouteType} from "../../types/openNewRoute.type";

export class Logout {
    readonly openNewRoute: OpenNewRouteType;

    constructor(openNewRoute: OpenNewRouteType) {
        this.openNewRoute = openNewRoute;

        if (!AuthUtils.getAuthInfo(AuthUtils.accessTokenKey) || !AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)) {
            this.openNewRoute('/login');
        }

        this.logout().then();
    }


    private async logout(): Promise<void> {
        await AuthService.logout({
            refreshToken: AuthUtils.getAuthInfo(AuthUtils.refreshTokenKey)
        })
        AuthUtils.removeAuthInfo();
        await this.openNewRoute('/login');
    }
}