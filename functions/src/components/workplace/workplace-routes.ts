import {Request, Response} from "express";
import {WorkplaceService} from "./services/workplace-service";
import {Consent} from "./model/consent";
import {GalleryService} from "../content-management-system/gallery/services/gallery-service";

export class WorkplaceRoutes {

    public static routes(app: any): void {

        app.route('/workplace/terms-of-use/:uuidTermsOfUse').get(async (request: Request, response: Response) => {
            WorkplaceService.getTermsOfUse(request.params.uuidTermsOfUse)
                .then(function(termsOfUse: Consent) {
                    response.status(200).send(termsOfUse);
                }).catch(function(error: any){
                response.status(404).send("Terms-of-use wasn't found: " + error)
            });
        })

        app.route('/files').post(async (request: Request, response: Response) => {
            // todo extract uuidGallery from request
            GalleryService.saveImage('', request.body)
                .then(function(result: boolean) {
                    response.status(200).send(result);
                }).catch(function(error: any){
                response.status(404).send("Files weren't saved successfully: " + error)
            });
        })
    }
}
