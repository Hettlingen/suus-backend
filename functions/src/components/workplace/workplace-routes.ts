import {Request, Response} from "express";
import {WorkplaceService} from "./services/workplace-service";

export class WorkplaceRoutes {

    public static routes(app: any): void {

        app.route('/workplace/terms-of-use/:uuidTermsOfUse').get(async (request: Request, response: Response) => {
            WorkplaceService.getTermsOfUse(request.params.uuidTermsOfUse)
                .then(function(termsOfUse: string) {
                    response.status(200).send(termsOfUse);
                }).catch(function(error: any){
                response.status(404).send("Terms-of-use wasn't found: " + error)
            });
        })
    }
}