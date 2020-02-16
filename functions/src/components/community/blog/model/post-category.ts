import {Post} from "./post";

export class PostCategory {
    public uuid!: string;
    public title!: string;
    public description!: string;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public listPost!: Post[];
}