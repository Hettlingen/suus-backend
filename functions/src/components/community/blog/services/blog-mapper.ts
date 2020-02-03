import {Blog} from "../model/blog";

export const mapBlogsFromDbToBlogs = (blogsFromDb: any) => {
    const blogs: Blog[] = [];

    blogsFromDb.forEach(
        (blog: any) => {
            blogs.push(mapBlogFromDbToBlog(blog));
        }
    );

    return blogs;
}

export const mapBlogFromDbToBlog = (blogFromDb: any) => {
    const blog = new Blog();
    return blog;
}