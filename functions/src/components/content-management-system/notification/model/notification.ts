import {Partner} from "../../../identity-access-management/partner/model/partner";

export class Notification {
    public uuid!: string;
    public title!: string;
    public message!: string;
    public recipient!: Partner;
}
