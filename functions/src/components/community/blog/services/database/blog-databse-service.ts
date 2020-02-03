import {Blog} from "../../model/blog";
import {databaseBlog} from "../../../../../index";

export class BlogDatabseService {

    static async readBlog(uuidBlog: string): Promise<Blog> {
        console.log('START: BlogDatabseService.readBlog: ' + uuidBlog);
        if (!uuidBlog) throw new Error('[myfarmer] BlogDatabseService.readBlog - Wrong parameters');

        const query = `SELECT * FROM blog WHERE uuid='${uuidBlog}'`;

        try {
            const blogFromDb = await databaseBlog.query(query);

            if (blogFromDb === null || blogFromDb === undefined) {
                throw new Error('[myfarmer] BlogDatabseService.readBlog - Blog doesnt exist on database');
            }

            return blogFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] BlogDatabseService.readBlog - Error reading user-account from database: ' + error);
        }
    }
}