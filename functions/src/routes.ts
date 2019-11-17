import {BlogRoutes} from "./components/community/blog/blog-routes";

export class Routes {
    public static routes(app: any): void {
        // AuthenticationRoutes.routes(app);
        BlogRoutes.routes(app);
        // PartnerRoutes.routes(app);
    }
}
