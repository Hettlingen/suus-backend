import {Blog} from "../model/blog";
import {databaseFirestore} from "../../../../index";
import {mapBlogFromDbToBlog, mapBlogsFromDbToBlogs} from "./blog-mapper";

export class BlogService {

    static async createBlog(blogInput: Blog): Promise<Blog> {
        try {
            const data = {
                uuid: blogInput.getUuid(),
                title: blogInput.getTitle(),
                description: blogInput.getDescription()
            }
            const blogRef = await databaseFirestore.collection('blog').add(data);
            const blogFromDb = await blogRef.get();

            return mapBlogFromDbToBlog(blogFromDb);
        } catch(error){
            throw new Error('Fight doesnt exist.')
        }
    }

    static updateBlog(blog: Blog): Promise<Blog> {
        return new Promise<Blog>((resolve, reject) => {
            resolve(new Blog());
        });
    }

    static deleteBlog(uuidBlog: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            resolve(true);
        });
    }

    static async getBlogs(): Promise<Blog[]> {
        try {
            const blogsFromDb = await databaseFirestore.collection('blog').get();
            return mapBlogsFromDbToBlogs(blogsFromDb);
        } catch(error){
            throw new Error('No blogs available')
        }
    }

    static async getBlog(uuidBlog: string): Promise<Blog> {
        try {
            if (!uuidBlog) throw new Error('Product ID is required');

            const blogFromDb = await databaseFirestore.collection('blogs').doc(uuidBlog).get();

            if (!blogFromDb.exists){
                throw new Error('Product doesnt exist.')
            }

            return mapBlogFromDbToBlog(blogFromDb);
        } catch(error){
            throw new Error('Product doesnt exist.')
        }
    }
}