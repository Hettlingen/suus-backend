import {BlogRoutes} from "./components/community/blog/blog-routes";
import {ShopRoutes} from "./components/shop/shop-routes";
import {AuthenticationRoutes} from "./components/authentication/authentication-routes";

export class Routes {
    public static routes(app: any): void {
        AuthenticationRoutes.routes(app);
        BlogRoutes.routes(app);
        ShopRoutes.routes(app);
    }
}
