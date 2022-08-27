import {AuthenticationService} from "./services/authentication-service";
import {Request, Response} from "express";
import {UserAccount} from "./model/user-account";
import {RoleUser} from "../partner/model/roles/role-user";
import {ErrorService} from "../../../utils/error/error-service";
import {ErrorServiceCodes} from "../../../utils/error/error-service-codes";
import {ErrorHttpCodes} from "../../../utils/error/error-http-codes";

/**
 * Curl URL's
 * - LOGIN        => curl -X "POST" --data '{"userName":"John","password":"Dada"}' http://localhost:5001/api/v1/user/login
 * - REGISTRATION => curl -X "POST" --data '{"userName":"John","password":"Doe"}' http://localhost:5001/api/v1/user/register
 */
export class AuthenticationRoutes {

    public static routes(app: any): void {

        app.route('/user/login').post((request: Request, response: Response) => {
            AuthenticationService.login(request.body.userName, request.body.password)
                .then(function(roleUser: RoleUser) {
                    response.status(ErrorHttpCodes.OK).send(roleUser);
                }).catch(function(error: ErrorService){
                    if (error.errorCode === ErrorServiceCodes.BAD_USERNAME || error.errorCode === ErrorServiceCodes.NOT_AUTHORIZED) {
                        response.status(ErrorHttpCodes.NOT_AUTHORIZED).send(error.errorCodeDescription)
                    } else {
                        response.status(ErrorHttpCodes.INTERNAL_SERVER);
                    }
            });
        })

        app.route('/user').post(async (request: Request, response: Response) => {
            AuthenticationService.registerUser(request.body)
                .then(function(userAccount: UserAccount) {
                    response.status(ErrorHttpCodes.OK).send(userAccount);
                }).catch(function(error: ErrorService){
                    response.status(ErrorHttpCodes.NOT_FOUND).send("Registration wasn't successful: " + error)
            });
        })

        app.route('/user/:uuidUserAccount').delete(AuthenticationService.checkIfAuthenticated, (request: Request, response: Response) => {
            AuthenticationService.deregisterUser(request.params.uuidUserAccount)
                .then(() => {
                    response.status(ErrorHttpCodes.OK).send();
                }).catch(function(error: ErrorService){
                response.status(ErrorHttpCodes.NOT_FOUND).send("Deregistration wasn't successful: " + error)
            });
        })

        app.route('/user').put(AuthenticationService.checkIfAuthenticated, (request: Request, response: Response) => {
            AuthenticationService.updateUser(request.body)
                .then(function(roleUser: RoleUser) {
                    response.status(ErrorHttpCodes.OK).send(roleUser);
                }).catch(function(error: any){
                response.status(ErrorHttpCodes.NOT_FOUND).send("User wasn't found: " + error)
            });
        })

        app.route('/user/:uuidRoleUser').get(AuthenticationService.checkIfAuthenticated, (request: Request, response: Response) => {
            AuthenticationService.getUser(request.params.uuidRoleUser)
                .then(function(roleUser: RoleUser) {
                    response.status(ErrorHttpCodes.OK).send(roleUser);
                }).catch(function(error: any){
                response.status(404).send("User wasn't found: " + error)
            });
        })
    }
}
