import {WorkplaceDatabseService} from "./database/workplace-databse-service";
import {Consent} from "../model/consent";


export class WorkplaceService {

    static async getTermsOfUse(uuidTermsOfUse: string): Promise<Consent> {
        console.log('START: WorkplaceService.getTermsOfUse: ' + uuidTermsOfUse);
        if (!uuidTermsOfUse) throw new Error('[myfarmer] Terms-Of-Use-ID is required');

        try {
            return await WorkplaceDatabseService.readTermsOfUse(uuidTermsOfUse);
        } catch(error) {
            throw new Error('[myfarmer] Error reading terms-of-use from database: ' + error);
        }
    }
}
