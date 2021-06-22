// import * as fs from "fs";
// import {expressJwt} from 'express-jwt';

//const RSA_PUBLIC_KEY = fs.readFileSync(require('path').resolve(__dirname, './utils/public.key'));
// const checkIfAuthenticated = expressJwt({
//     secret: RSA_PUBLIC_KEY
// });

import {AuthenticationService} from "./services/authentication-service";
import {Request, Response} from "express";
import {UserAccount} from "./model/user-account";
import {RoleUser} from "../partner/model/roles/role-user";

export class AuthenticationRoutes {

    public static routes(app: any): void {

        app.route('/user/login').post((request: Request, response: Response) => {
            AuthenticationService.login(request.body.userName, request.body.password)
                .then(function(roleUser: RoleUser) {
                    response.status(200).send(roleUser);
                }).catch(function(error: any){
                    response.status(401).send("User isn't logged in: " + error)
            });
        })

        app.route('/user/register').post(async (request: Request, response: Response) => {
            AuthenticationService.register(request.body)
                .then(function(userAccount: UserAccount) {
                    response.status(200).send(userAccount);
                }).catch(function(error: any){
                    response.status(404).send("Registration wasn't successful: " + error)
            });
        })

        app.route('/user').put(AuthenticationService.checkIfAuthenticated, (request: Request, response: Response) => {
            AuthenticationService.updateUser(request.body)
                .then(function(roleUser: RoleUser) {
                    response.status(200).send(roleUser);
                }).catch(function(error: any){
                response.status(404).send("User wasn't found: " + error)
            });
        })

        app.route('/user/:uuidRoleUser').get(AuthenticationService.checkIfAuthenticated, (request: Request, response: Response) => {
            AuthenticationService.getUser(request.params.uuidRoleUser)
                .then(function(roleUser: RoleUser) {
                    response.status(200).send(roleUser);
                }).catch(function(error: any){
                response.status(404).send("User wasn't found: " + error)
            });
        })
    }
}
