import {Blog} from "../../model/blog";
import {databaseBlog} from "../../../../../index";
import {mapBlogFromDbToBlog} from "../blog-mapper";

export class BlogDatabseService {

    static async readBlog(uuidBlog: string): Promise<Blog> {
        console.log('START: BlogDatabseService.readBlog: ' + uuidBlog);
        if (!uuidBlog) throw new Error('[myfarmer] BlogDatabseService.readBlog - Wrong parameters');

        // const query = `SELECT * FROM Blog, PostCategory WHERE Blog.uuid='${uuidBlog}' AND Blog.uuid=PostCategory.uuidBlog`;
        const query = `SELECT * FROM Blog, PostCategory WHERE Blog.uuid='${uuidBlog}' AND Blog.uuid=PostCategory.uuidBlog`;

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
}