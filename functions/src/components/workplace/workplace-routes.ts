import {Request, Response} from "express";
import {WorkplaceService} from "./services/workplace-service";
import {Consent} from "./model/consent";
import {FileService} from "./services/file-service";
import {MyFile} from "./model/my-file";

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
            FileService.saveFile(request.body)
                .then(function(successful: boolean) {
                    response.status(200).send(successful);
                }).catch(function(error: any){
                response.status(404).send("Files weren't saved successfully: " + error)
            });
        })

        app.route('/files/:uuidFile').get(async (request: Request, response: Response) => {
            FileService.getFile(request.params.uuidTermsOfUse)
                .then(function(file: MyFile) {
                    response.status(200).send(file);
                }).catch(function(error: any){
                response.status(404).send("Terms-of-use wasn't found: " + error)
            });
        })
    }
}
