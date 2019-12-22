import * as fs from "fs";

export class AuthenticationService {

    RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

    // static login(userName: string, password: string): Promise<Object> {
    //     return AuthenticationServiceMysql.readUserAccountByUserNamePassword(userName, password)
    //         .then(function(userAccount) {
    //             if (userAccount != null && userName === userAccount.getCredentialUserNamePassword().userName) {
    //                 bcrypt.compare(password, userAccount.getCredentialUserNamePassword().password, function(err, isMatch) {
    //                     if (err || isMatch === false) {
    //                         return err;
    //                     }
    //
    //                     const jwtBearerToken = jwt.sign({}, this.RSA_PRIVATE_KEY, {
    //                         algorithm: 'RS256',
    //                         expiresIn: 120,
    //                         subject: userAccount.uuid
    //                     });
    //
    //                     return jwtBearerToken;
    //                 });
    //             } else {
    //                 throw new Error('[AuthenticationService] Bad Username or Password');
    //             }
    //             return userAccount;
    //         }).catch(function(error){
    //             throw new Error('[AuthenticationService] Error during login: ' + error);
    //     });
    // };
    //
    // static logout(uuidUserAccount: string): Promise<boolean> {
    //     return null;
    // }

    // static register(person: Person): Promise<UserAccount> {
    //     console.log('Register - Service');
    //
    //     return AuthenticationServiceMysql.createUserAccount(person)
    //         .then(function(userAccount: UserAccount) {
    //             return userAccount;
    //         }).catch(function(error: any){
    //             throw new Error('Error during login: ' + error);
    //         });
    // }
}
