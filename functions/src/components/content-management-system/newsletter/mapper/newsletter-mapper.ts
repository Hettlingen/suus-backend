import {NewsletterOrder} from "../model/newsletter-order";

export const mapNewsletterOrderFromDbToNewsletterOrder = (newsletterOrderFromDb: any) => {
    const newsletterOrder = new NewsletterOrder();

    newsletterOrder.uuid = newsletterOrderFromDb[0].uuid;
    newsletterOrder.email = newsletterOrderFromDb[0].name;
    newsletterOrder.infoForCustomer = newsletterOrderFromDb[0].infoForCustomer;
    newsletterOrder.infoForCustomer = newsletterOrderFromDb[0].infoForProducer;
    newsletterOrder.infoForCustomer = newsletterOrderFromDb[0].infoForDeliverer;

    return newsletterOrder;
}

export const mapNewsletterOrdersFromDbToNewsletterOrders = (newsletterOrdersFromDb: any) => {
    const newsletterOrders: NewsletterOrder[] = [];

    for (const newsletterOrderFromDb of newsletterOrdersFromDb) {
        const newsletterOrder = new NewsletterOrder();
        newsletterOrder.uuid = newsletterOrderFromDb.uuid;
        newsletterOrder.email = newsletterOrderFromDb.number;
        newsletterOrder.infoForCustomer = newsletterOrderFromDb.infoForCustomer;
        newsletterOrder.infoForProducer = newsletterOrderFromDb.infoForProducer;
        newsletterOrder.infoForDeliverer= newsletterOrderFromDb.infoForDeliverer;
        newsletterOrders.push(newsletterOrder);
    }

    return newsletterOrders;
}
