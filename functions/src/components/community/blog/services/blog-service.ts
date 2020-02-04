import {Blog} from "../model/blog";
import {BlogDatabseService} from "./database/blog-databse-service";

export class BlogService {

    static async getBlog(uuidBlog: string): Promise<Blog> {
        console.log('START: BlogService.getBlog: ' + uuidBlog);
        if (!uuidBlog) throw new Error('Blog-ID is required');

        try {
            return await BlogDatabseService.readBlog(uuidBlog);
        } catch(error){
            throw new Error('[myfarmer] BlogService.getBlog - Error reading Blog' + error);
        }
    }
}