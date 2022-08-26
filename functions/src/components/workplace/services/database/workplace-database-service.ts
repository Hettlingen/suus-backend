import {Consent} from "../../model/consent";
import {DocumentSnapshot} from "firebase-functions/lib/providers/firestore";
import {databaseFirestore} from "../../../../config/firebase";

export class WorkplaceDatabaseService {

    static async readTermsOfUse(uuidTermsOfUse: string): Promise<Consent> {
        console.log('START: WorkplaceDatabseService.readTermsOfUse: ' + uuidTermsOfUse);
        if (!uuidTermsOfUse) throw new Error('[myfarmer] WorkplaceDatabseService.readTermsOfUse - Wrong parameters');

        return databaseFirestore.collection('terms-of-use').doc(uuidTermsOfUse).get().then(function (consentFromDb: DocumentSnapshot) {
            if (consentFromDb.exists) return consentFromDb.data() as Consent;
            return Promise.reject("No such document");
        });
    }
}