import {Blog} from "../../model/blog";
import {databaseBlog} from "../../../../../index";
import {mapBlogFromDbToBlog, mapPostCategoryFromDbToPostCategory, mapPostFromDbToPost} from "../blog-mapper";
import {PostCategory} from "../../model/post-category";
import {Post} from "../../model/post";

export class BlogDatabseService {

    static async readBlog(uuidBlog: string): Promise<Blog> {
        console.log('START: BlogDatabseService.readBlog: ' + uuidBlog);
        if (!uuidBlog) throw new Error('[myfarmer] BlogDatabseService.readBlog - Wrong parameters');

        const query = `SELECT Blog.uuid, Blog.title, Blog.description, PostCategory.* FROM Blog, PostCategory WHERE Blog.uuid='${uuidBlog}' AND Blog.uuid=PostCategory.uuidBlog`;

        try {
            const blogFromDb = await databaseBlog.query(query);

            console.log('SCOOP Datenbank Resultat: ' + JSON.stringify(blogFromDb));

            if (blogFromDb === null || blogFromDb === undefined) {
                throw new Error('[myfarmer] BlogDatabseService.readBlog - Blog doesnt exist on database');
            }

            return mapBlogFromDbToBlog(blogFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] BlogDatabseService.readBlog - Error reading blog from database: ' + error);
        }
    }

    static async readPostCategory(uuidPostCategory: string): Promise<PostCategory> {
        console.log('START: BlogDatabseService.readPostCategory: ' + uuidPostCategory);
        if (!uuidPostCategory) throw new Error('[myfarmer] BlogDatabseService.readPostCategory - Wrong parameters');

        const query = `SELECT * from PostCategory WHERE PostCategory.uuid='${uuidPostCategory}' AND PostCategory.uuid=Post.uuidPostCategory;`;

        try {
            const postCategoryFromDb = await databaseBlog.query(query);

            if (postCategoryFromDb === null || postCategoryFromDb === undefined) {
                throw new Error('[myfarmer] BlogDatabseService.readPostCategory - Post-category doesnt exist on database');
            }

            return mapPostCategoryFromDbToPostCategory(postCategoryFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] BlogDatabseService.readPostCategory - Error reading post-category from database: ' + error);
        }
    }

    static async readPost(uuidPost: string): Promise<Post> {
        console.log('START: BlogDatabseService.readPost: ' + uuidPost);
        if (!uuidPost) throw new Error('[myfarmer] BlogDatabseService.readPost - Wrong parameters');

        const query = `SELECT * FROM Post WHERE Post.uuid='${uuidPost}'`;

        try {
            const postFromDb = await databaseBlog.query(query);

            if (postFromDb === null || postFromDb === undefined) {
                throw new Error('[myfarmer] BlogDatabseService.readPost - Post doesnt exist on database');
            }

            return mapPostFromDbToPost(postFromDb[0]);
        } catch(error) {
            throw new Error('[myfarmer] BlogDatabseService.readPost - Error reading Post from database: ' + error);
        }
    }
}