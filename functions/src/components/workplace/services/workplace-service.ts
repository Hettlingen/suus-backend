import {WorkplaceDatabseService} from "./database/workplace-databse-service";


export class WorkplaceService {

    static async getTermsOfUse(uuidTermsOfUse: string): Promise<string> {
        if (!uuidTermsOfUse) throw new Error('[myfarmer] Terms-Of-Use-ID is required');

        try {
            return WorkplaceDatabseService.getTermsOfUse(uuidTermsOfUse);
        } catch(error) {
            throw new Error('[myfarmer] Error reading terms-of-use from database: ' + error);
        }
    }
}
