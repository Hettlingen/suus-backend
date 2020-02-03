import {databaseFirestore} from "../../../../index";

export class WorkplaceDatabseService {

    static async readTermsOfUse(uuidTermsOfUse: string): Promise<string> {
        console.log('START: WorkplaceDatabseService.readTermsOfUse: ' + uuidTermsOfUse);
        if (!uuidTermsOfUse) throw new Error('[myfarmer] WorkplaceDatabseService.readTermsOfUse - Wrong parameters');

        return databaseFirestore.collection('terms-of-use').doc(uuidTermsOfUse).get().then(function (doc) {
            if (doc.exists) return doc.data()!.content;
            return Promise.reject("No such document");
        });
    }
}