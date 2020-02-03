import {Blog} from "../model/blog";
import {mapBlogFromDbToBlog} from "./blog-mapper";
import {BlogDatabseService} from "./database/blog-databse-service";

export class BlogService {

    static async getBlog(uuidBlog: string): Promise<Blog> {
        console.log('START: BlogService.getBlog: ' + uuidBlog);
        if (!uuidBlog) throw new Error('Blog-ID is required');

        try {
            const blogFromDb = await BlogDatabseService.readBlog(uuidBlog);

            if (blogFromDb === null || blogFromDb === undefined) {
                throw new Error('[myfarmer] BlogService.getBlog - Blog not found');
            }

            return mapBlogFromDbToBlog(blogFromDb);
        } catch(error){
            throw new Error('[myfarmer] BlogService.getBlog - Error reading Blog');
        }
    }
}