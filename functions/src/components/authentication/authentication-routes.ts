// import * as fs from "fs";
// import {expressJwt} from 'express-jwt';

//const RSA_PUBLIC_KEY = fs.readFileSync(require('path').resolve(__dirname, './utils/public.key'));
// const checkIfAuthenticated = expressJwt({
//     secret: RSA_PUBLIC_KEY
// });

import {AuthenticationService} from "./services/authentication-service";
import {Request, Response} from "express";
import {UserAccount} from "./model/user-account";

export class AuthenticationRoutes {

    public static routes(app: any): void {

        app.route('/user-account/login').post((request: Request, response: Response) => {
            AuthenticationService.login(request.body.userName, request.body.password)
                .then(function(userAccount: UserAccount) {
                    response.status(200).send(userAccount);
                }).catch(function(error: any){
                    response.status(401).send("User isn't authorized: " + error)
            });
        })

        app.route('/user-account/logout').post((request: Request, response: Response) => {
            AuthenticationService.logout(request.body.uuidUserAccount)
                .then(function(logoutSuccessful: boolean) {
                    response.status(200).send(logoutSuccessful);
                }).catch(function(error: any){
                    response.status(404).send("Logout wasn't successful: " + error)
            });
        })

        app.route('/user-account/register').post(async (request: Request, response: Response) => {
            AuthenticationService.register(request.body)
                .then(function(userAccount: UserAccount) {
                    response.status(200).send(userAccount);
                }).catch(function(error: any){
                    response.status(404).send("Registration wasn't successful: " + error)
            });
        })

        app.route('/user-account/:uuidUserAccount').get(AuthenticationService.checkIfAuthenticated, (request: Request, response: Response) => {
            AuthenticationService.getUserAccount(request.params.uuidUserAccount)
                .then(function(userAccount: UserAccount) {
                    response.status(200).send(userAccount);
                }).catch(function(error: any){
                response.status(404).send("User-Account wasn't found: " + error)
            });
        })
    }
}