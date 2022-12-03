export class Consent {
    public uuid!: string;
    public title!: string;
    public content!: string;
    public dateCreated!: Date;
    public dateCommitment!: Date;

    constructor(uuid: string, title: string, content: string) {
        this.uuid = uuid;
        this.title = title;
        this.content = content;
    }
}
