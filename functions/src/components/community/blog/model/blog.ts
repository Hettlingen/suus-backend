export class Blog {
    private uuid!: string;
    private title!: string;
    private description!: string;
    private author!: string;  // should be an author
    private dateCreated!: Date;
    private dateUpdated!: Date;
    private datePublished!: Date;

    getUuid(): string {
        return this.uuid;
    }

    setUuid(uuid: string) {
        this.uuid = uuid;
    }

    getTitle(): string {
        return this.title;
    }

    setTitle(title: string) {
        this.title = title;
    }

    getDescription(): string {
        return this.description;
    }

    setDescription(description: string) {
        this.description = description;
    }

    getAuthor(): string {
        return this.author;
    }

    setAuthor(author: string) {
        this.author = author;
    }

   getDateCreated(): Date {
        return this.dateCreated;
    }

    setDateCreated(dateCreated: Date) {
        this.dateCreated = dateCreated;
    }

    getDateUpdated(): Date {
        return this.dateUpdated;
    }

    setDateUpdated(dateUpdated: Date) {
        this.dateUpdated = dateUpdated;
    }

    getDatePublished(): Date {
        return this.datePublished;
    }

    setDatePublished(datePublished: Date) {
        this.datePublished = datePublished;
    }
}