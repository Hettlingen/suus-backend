import {Request, Response} from "express";
import {WorkplaceService} from "./services/workplace-service";
import {Consent} from "./model/consent";
import {ImageService} from "./services/image-service";
import {Image} from "../content-management-system/gallery/model/image";

export class WorkplaceRoutes {

    public static routes(app: any): void {

        // get terms of use of the digital services
        app.route('/workplace/terms-of-use/:uuidTermsOfUse').get(async (request: Request, response: Response) => {
            WorkplaceService.getTermsOfUse(request.params.uuidTermsOfUse)
                .then(function(termsOfUse: Consent) {
                    response.status(200).send(termsOfUse);
                }).catch(function(error: any){
                response.status(404).send("Terms-of-use wasn't found: " + error)
            });
        })

        // save image on gcp bucket
        app.route('/images').post(async (request: Request, response: Response) => {
            ImageService.saveImage(request.body)
                .then(function(result: boolean) {
                    response.status(200).send(result);
                }).catch(function(error: any){
                response.status(404).send("Image isn't saved successfully: " + error)
            });
        })

        // get image on gcp bucket
        app.route('/images/:uuidImage').post(async (request: Request, response: Response) => {
            ImageService.getImageWithByteStream(request.params.uuidImage)
                .then(function(image: Image) {
                    response.status(200).send(image);
                }).catch(function(error: any){
                response.status(404).send("Image wasn't found: " + error)
            });
        })

        // Delete image on gcp bucket
        app.route('/images/:uuidImage').delete(async (request: Request, response: Response) => {
            ImageService.deleteImage(request.params.uuidImage)
                .then(function(result: boolean) {
                    response.status(200).send(result);
                }).catch(function(error: any){
                response.status(404).send("Image wasn't deleted successfully: " + error)
            });
        })
    }
}
