import {PostCategory} from "./post-category";

export class Blog {
    public uuid!: string;
    public title!: string;
    public description!: string;
    public author!: string;  // should be an author
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public datePublished!: Date;
    public listPostCategory: PostCategory[] = [];
}