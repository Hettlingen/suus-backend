import {Blog} from "../model/blog";

export const mapBlogsFromDbToBlogs = (blogsFromDb: any) => {
    let blogs: Blog[] = [];

    blogsFromDb.forEach(
        (blog: any) => {
            blogs.push(mapBlogFromDbToBlog(blog));
        }
    );

    return blogs;
}

export const mapBlogFromDbToBlog = (blogFromDb: any) => {
    let blog = new Blog();
    blog.setUuid(blogFromDb.data().uuid);
    blog.setTitle(blogFromDb.data().title);
    blog.setDescription(blogFromDb.data().description);
    return blog;
}