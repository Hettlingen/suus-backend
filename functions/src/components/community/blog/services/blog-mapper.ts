import {Blog} from "../model/blog";
import {PostCategory} from "../model/post-category";
import {Post} from "../model/post";

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

    for (const row of blogFromDb) {
        blog.uuid = row.uuid;
        blog.title = row.title;
        blog.description = row.description;

        const postCategory = new PostCategory();
        postCategory.title = row.titleOfPostCategory;
        postCategory.description = row.descriptionOfPostCategory;
        blog.listPostCategory.push(postCategory);
    }

    return blog;
}

export const mapPostCategoryFromDbToPostCategory = (postCategoryFromDb: any) => {
    const postCategory = new PostCategory();
    postCategory.uuid = postCategoryFromDb.uuid;
    postCategory.title = postCategoryFromDb.title;
    postCategory.description = postCategoryFromDb.description;
    return postCategory;
}

export const mapPostFromDbToPost = (postFromDb: any) => {
    const post = new Post();
    post.uuid = postFromDb.uuid;
    post.title = postFromDb.title;
    post.content = postFromDb.content;
    return post;
}