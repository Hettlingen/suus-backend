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
        // app.route('/api/v1/user-account/login').post((request: Request, response: Response) => {
        //     response.status(200).send('SCOOP API Call was succesfull');
        //     // AuthenticationServiceRest.login(request, response);
        // })
        // app.route('/api/v1/user-account/logout').post((request: Request, response: Response) => {
        //     AuthenticationService.logout(request, response);
        // })
        app.route('/api/v1/user-account/register').post(async (request: Request, response: Response) => {
            AuthenticationService.register(request.body)
                .then(function(userAccount: UserAccount) {
                    response.status(200).send(userAccount);
                }).catch(function(error: any){
                    response.status(404).send("Shop wasn't found: " + error)
            });
        })
        // app.route('/api/v1/user-account/activate/:activationCode').post((request: Request, response: Response) => {
        //     AuthenticationService.activateUserAccount(request, response);
        // })
    }
}