import {Request, Response} from "express";
import {BlogService} from "./services/blog-service";
import {Blog} from "./model/blog";

export class BlogRoutes {
    public static routes(app: any): void {
        /* ------------------------------------------------ */
        /* Blog                                             */
        /* ------------------------------------------------ */
        // app.route('/blogs').post((request: Request, response: Response) => {
        //     BlogService.createBlog(request.body.blog)
        //         .then(function(blog) {
        //             response.status(201).send(blog);
        //         }).catch(function(error: any){
        //         response.status(404).send("Blog wasn't created: " + error)
        //     });
        // })

        // app.route('/blogs/:uuidBlog').put((request: Request, response: Response) => {
        //     BlogService.updateBlog(request.body.blog)
        //         .then(function(blog) {
        //             response.status(201).send(blog);
        //         }).catch(function(error: any){
        //         response.status(404).send("Blog wasn't updated: " + error)
        //     });
        // })

        // app.route('/blogs/:uuidBlog').delete((request: Request, response: Response) => {
        //     BlogService.deleteBlog(request.params.uuidBlog)
        //         .then(function(blog) {
        //             response.status(200).send(blog);
        //         }).catch(function(error: any){
        //         response.status(404).send("Blog wasn't deleted: " + error)
        //     });
        // })

        app.route('/blogs/:uuidBlog').get(async (request: Request, response: Response) => {
            BlogService.getBlog(request.params.uuidBlog)
                .then(function(blog: Blog) {
                    response.status(200).send(blog);
                }).catch(function(error: any){
                response.status(404).send("Blog wasn't found: " + error)
            });
        })
    }
}