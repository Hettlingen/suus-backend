import {Request, Response} from "express";
import {BlogService} from "./services/blog-service";
import {Blog} from "./model/blog";
import {Post} from "./model/post";
import {PostCategory} from "./model/post-category";

export class BlogRoutes {
    public static routes(app: any): void {
        app.route('/blogs/:uuidBlog').get(async (request: Request, response: Response) => {
            BlogService.getBlog(request.params.uuidBlog)
                .then(function(blog: Blog) {
                    response.status(200).send(blog);
                }).catch(function(error: any){
                response.status(404).send("Blog wasn't found: " + error)
            });
        })

        app.route('/post-categories/:uuidBlogCategory').get(async (request: Request, response: Response) => {
            BlogService.getPostCategory(request.params.uuidBlogCategory)
                .then(function(postCategory: PostCategory) {
                    response.status(200).send(postCategory);
                }).catch(function(error: any){
                response.status(404).send("Post-category wasn't found: " + error)
            });
        })

        app.route('/posts/:uuidPost').get(async (request: Request, response: Response) => {
            BlogService.getPost(request.params.uuidPost)
                .then(function(post: Post) {
                    response.status(200).send(post);
                }).catch(function(error: any){
                response.status(404).send("Post wasn't found: " + error)
            });
        })
    }
}