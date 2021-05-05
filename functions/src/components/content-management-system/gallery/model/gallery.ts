import {Image} from "./image";

export class Gallery {
    public uuid!: string;
    public title!: string;
    public description!: string;
    public bucketName!: string;
    public bucketDirectory!: string;
    public dateCreated!: Date;
    public dateUpdated!: Date;
    public listImages: Image[] = [];
}
