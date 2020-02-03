import {Blog} from "../../model/blog";
import {databaseBlog} from "../../../../../index";

export class BlogDatabseService {

    static async readBlog(uuidBlog: string): Promise<Blog> {
        if (!uuidBlog) throw new Error('[myfarmer] BlogDatabseService.readBlog - Wrong parameters');

        const query = `SELECT * FROM Blog WHERE uuid='${uuidBlog}'`;

        try {
            const blogFromDb = await databaseBlog.query(query);
            return blogFromDb[0];
        } catch(error) {
            throw new Error('[myfarmer] BlogDatabseService.readBlog - Error reading user-account from database: ' + error);
        }
    }
}