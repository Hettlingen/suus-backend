import {BlogRoutes} from "./components/content-management-system/blog/blog-routes";
import {ShopRoutes} from "./components/shop/shop-routes";
import {AuthenticationRoutes} from "./components/identity-access-management/authentication/authentication-routes";
import {WorkplaceRoutes} from "./components/workplace/workplace-routes";
import {PartnerRoutes} from "./components/identity-access-management/partner/partner-routes";
import {NewsletterRoutes} from "./components/content-management-system/newsletter/newsletter-routes";
import {NotificationRoutes} from "./components/content-management-system/notification/notification-routes";
import {GalleryRoutes} from "./components/content-management-system/gallery/gallery-routes";

export class Routes {
    public static routes(app: any): void {
        AuthenticationRoutes.routes(app);
        PartnerRoutes.routes(app);
        BlogRoutes.routes(app);
        ShopRoutes.routes(app);
        NewsletterRoutes.routes(app);
        NotificationRoutes.routes(app);
        WorkplaceRoutes.routes(app);
        GalleryRoutes.routes(app);
    }
}
