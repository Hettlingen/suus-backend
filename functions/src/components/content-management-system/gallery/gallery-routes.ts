import {Request, Response} from "express";
import {GalleryService} from "./services/gallery-service";
import {Gallery} from "./model/gallery";

export class GalleryRoutes {
    public static routes(app: any): void {

        // Get a Gallery
        app.route('/galleries/:uuidGallery').get(async (request: Request, response: Response) => {
            GalleryService.getGallery(request.params.uuidGallery)
                .then(function(gallery: Gallery) {
                    response.status(200).send(gallery);
                }).catch(function(error: any){
                response.status(404).send("Gallery wasn't found: " + error)
            });
        })

        // Get an image
        app.route('/galleries/images/:uuidImage').get(async (request: Request, response: Response) => {
            GalleryService.getImage(request.params.uuidImage)
                .then(function(imageByteArray: String) {
                    response.setHeader('Content-Type', 'image/*');
                    response.status(200).send(imageByteArray);
                }).catch(function(error: any){
                response.status(404).send("Image wasn't found: " + error)
            });
        })
    }
}
