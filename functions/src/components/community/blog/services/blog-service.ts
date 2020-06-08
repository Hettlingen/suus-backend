import {Blog} from "../model/blog";
import {BlogDatabseService} from "./database/blog-databse-service";
import {Post} from "../model/post";

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

    static async getPost(uuidPost: string): Promise<Post> {
        console.log('START: BlogService.getBlog: ' + uuidPost);
        if (!uuidPost) throw new Error('Post-ID is required');

        try {
            return await BlogDatabseService.readPost(uuidPost);
        } catch(error){
            throw new Error('[myfarmer] BlogService.getPost - Error reading Post with uuid '
                + uuidPost + ', error: ' +
                + error);
        }
    }
}