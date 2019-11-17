import {Post} from "./post";

export class PostCategory {
    private _uuid!: string;
    private _title!: string;
    private _description!: string;
    private _dateCreated!: Date;
    private _dateUpdated!: Date;

    private _listPost!: Post[];

    get uuid(): string {
        return this._uuid;
    }

    set uuid(value: string) {
        this._uuid = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get dateCreated(): Date {
        return this._dateCreated;
    }

    set dateCreated(value: Date) {
        this._dateCreated = value;
    }

    get dateUpdated(): Date {
        return this._dateUpdated;
    }

    set dateUpdated(value: Date) {
        this._dateUpdated = value;
    }

    get listPost(): Post[] {
        return this._listPost;
    }

    set listPost(value: Post[]) {
        this._listPost = value;
    }
}