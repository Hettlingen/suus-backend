import {Request, Response} from "express";
import {NotificationService} from "./services/notification-service";

export class NotificationRoutes {
    public static routes(app: any): void {

        // activate to notifications
        app.route('/notifications/activate').post(async (request: Request, response: Response) => {
            NotificationService.activateNotifications(request.params.uuidUserAccount, request.body)
                .then(function (successful: boolean) {
                    response.status(200).send(successful);
                }).catch(function (error: any) {
                response.status(404).send("Notifications weren't activated successfully: " + error);
            });
        });

        // deactivate notifications
        app.route('/notifications/deactivate').delete(async (request: Request, response: Response) => {
            NotificationService.deactivateNotifications(request.params.uuidUserAccount)
                .then(function (successful: boolean) {
                    response.status(200).send(successful);
                }).catch(function (error: any) {
                response.status(404).send("Notifications weren't deactivated successfully: " + error);
            });
        });
    }
}
