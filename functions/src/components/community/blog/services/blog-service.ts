import {Blog} from "../model/blog";
import {BlogDatabseService} from "./database/blog-databse-service";
import {Post} from "../model/post";
import {PostCategory} from "../model/post-category";

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

    static async getPostCategory(uuidPostCategory: string): Promise<PostCategory> {
        console.log('START: BlogService.getBlog: ' + uuidPostCategory);
        if (!uuidPostCategory) throw new Error('Post-Category-ID is required');

        try {
            return await BlogDatabseService.readPostCategory(uuidPostCategory);
        } catch(error){
            throw new Error('[myfarmer] BlogService.getPostCategory - Error reading Post-Category' + error);
        }
    }

    static async getPost(uuidPost: string): Promise<Post> {
        console.log('START: BlogService.getBlog: ' + uuidPost);
        if (!uuidPost) throw new Error('Post-ID is required');

        try {
            return await BlogDatabseService.readPost(uuidPost);
        } catch(error){
            throw new Error('[myfarmer] BlogService.getPost - Error reading Post' + error);
        }
    }
}