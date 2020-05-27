import {Blog} from "../model/blog";
import {Post} from "../model/post";

export const mapBlogFromDbToBlog = (blogFromDb: any) => {
    const blog = new Blog();

    for (const row of blogFromDb) {
        blog.uuid = row.uuid;
        blog.title = row.title;
        blog.description = row.description;

        const post = new Post();
        post.uuid = row.uuid;
        post.title = row.titleOfPost;
        post.content = row.contentOfPost;
        post.imageName = row.imageNameOfPost;
        post.duration = row.durationOfPost;
        blog.listPost.push(post);
    }

    return blog;
}

export const mapPostFromDbToPost = (postFromDb: any) => {
    const post = new Post();
    post.uuid = postFromDb.uuid;
    post.title = postFromDb.title;
    post.content = postFromDb.content;
    post.imageName = postFromDb.imageName;
    post.duration = postFromDb.duration;
    return post;
}