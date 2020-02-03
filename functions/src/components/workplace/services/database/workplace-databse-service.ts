import {databaseFirestore} from "../../../../index";
import {mapTermsOfUseFromDbToString} from "../workplace-mapper";

export class WorkplaceDatabseService {

    static async getTermsOfUse(uuidTermsOfUse: string): Promise<string> {
        console.log('START: WorkplaceDatabaseService.getTermsOfUse: ' + uuidTermsOfUse);
        try {
            if (!uuidTermsOfUse) throw new Error('Terms-of-use-ID is required');

            const termsOfUseFromDb = await databaseFirestore.collection('terms-of-use').doc(uuidTermsOfUse).get();

            if (!termsOfUseFromDb.exists){
                throw new Error('Terms of use doesnt exist.')
            }

            return mapTermsOfUseFromDbToString(mapTermsOfUseFromDbToString);
        } catch(error){
            throw new Error('Terms of use doesnt exist.')
        }
    }
}