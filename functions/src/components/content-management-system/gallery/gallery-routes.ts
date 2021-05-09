import {Request, Response} from "express";
import {GalleryService} from "./services/gallery-service";
import {Gallery} from "./model/gallery";
import {Image} from "./model/image";

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
                .then(function(image: Image) {
                    response.status(200).send(image);
                }).catch(function(error: any){
                response.status(404).send("Image wasn't found: " + error)
            });
        })

        // Save an image on gcp bucket
        app.route('/galleries/:uuidGallery/images').post(async (request: Request, response: Response) => {
            GalleryService.saveImage(request.params.uuidGallery, request.body)
                .then(function(result: boolean) {
                    response.status(200).send(result);
                }).catch(function(error: any){
                response.status(404).send("Image isn'tt saved successfully: " + error)
            });
        })

        // Delete image on gcp bucket
        app.route('/galleries/:uuidGallery/images/:uuidImage').delete(async (request: Request, response: Response) => {
            GalleryService.deleteImage(request.params.uuidImage)
                .then(function(result: boolean) {
                    response.status(200).send(result);
                }).catch(function(error: any){
                response.status(404).send("Image couldn't deleted successfully: " + error)
            });
        })
    }
}
