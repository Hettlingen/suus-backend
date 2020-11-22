import {BlogRoutes} from "./components/community/blog/blog-routes";
import {ShopRoutes} from "./components/shop/shop-routes";
import {AuthenticationRoutes} from "./components/authentication/authentication-routes";
import {WorkplaceRoutes} from "./components/workplace/workplace-routes";
import {PartnerRoutes} from "./components/community/partner/partner-routes";
import {NewsletterRoutes} from "./components/community/newsletter/newsletter-routes";
import {NotificationRoutes} from "./components/community/notification/notification-routes";

export class Routes {
    public static routes(app: any): void {
        AuthenticationRoutes.routes(app);
        PartnerRoutes.routes(app);
        BlogRoutes.routes(app);
        ShopRoutes.routes(app);
        NewsletterRoutes.routes(app);
        NotificationRoutes.routes(app);
        WorkplaceRoutes.routes(app);
    }
}
