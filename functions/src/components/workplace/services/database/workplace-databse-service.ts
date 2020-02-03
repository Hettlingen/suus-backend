import {databaseFirestore} from "../../../../index";
import {mapTermsOfUseFromDbToString} from "../workplace-mapper";

export class WorkplaceDatabseService {

    static async readTermsOfUse(uuidTermsOfUse: string): Promise<string> {
        console.log('START: WorkplaceDatabseService.readTermsOfUse: ' + uuidTermsOfUse);
        if (!uuidTermsOfUse) throw new Error('[myfarmer] WorkplaceDatabseService.readTermsOfUse - Wrong parameters');

        try {
            const termsOfUseFromDb = await databaseFirestore.collection('terms-of-use').doc(uuidTermsOfUse).get();

            if (!termsOfUseFromDb.exists){
                throw new Error('[myfarmer] WorkplaceDatabseService.readTermsOfUse - Terms of use doesnt exist.')
            }

            console.log('Resultat von der DB: ' + JSON.stringify(termsOfUseFromDb));

            return mapTermsOfUseFromDbToString(termsOfUseFromDb);
        } catch(error){
            throw new Error('[myfarmer] WorkplaceDatabseService.readTermsOfUse - Error reading terms-of-use from database: ' + error);
        }
    }
}