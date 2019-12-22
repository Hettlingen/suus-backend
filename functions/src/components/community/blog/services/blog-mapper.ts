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
    blog.setUuid(blogFromDb.data().uuid);
    blog.setTitle(blogFromDb.data().title);
    blog.setDescription(blogFromDb.data().description);
    return blog;
}