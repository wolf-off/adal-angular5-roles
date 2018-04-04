import { Injectable, Output, EventEmitter } from '@angular/core';
import { promise } from 'protractor';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { resolve } from 'path';
import { AdalService } from './adal-service';

@Injectable()
export class AuthorisationService {

    constructor(private adal: AdalService, private http: HttpClient) {
    }

    roles: Array<string>[] = null
    privileges: Array<string>[] = null;
    promise: Promise<boolean>;
    data: any = null;
    config: any = {};

    login() {
        this.adal.login();
    }

    logout() {
        this.adal.logout();
    }

    handleCallback() {
        this.adal.handleCallback();
    }

    public get userInfo() {
        return this.adal.userInfo;
    }

    public getRoles(): Promise<Array<string>> {
        return this.getData().then(data => <Array<string>>data.map(r => r.RoleTag)
        );
    }
    public getPrivileges(): Promise<Array<string>> {
        return this.getData().then(data => {
            return data.reduce((acc, value) => { return acc.concat(value.Privileges.map(p => p.PrivilegeTag)) }, []);
        });
    }

    public init(config) {
        this.config = config;
        this.adal.init(config);
        this.getData();
    }

    public getData(): Promise<any> {
        let ser = (<any>this.adal).context;

        ser.handleWindowCallback();

        if (!this.adal.isAuthenticated) {
            this.adal.login();
        }

        if (this.data != null) {
            return Promise.resolve(this.data);
        }
        if (this.promise != null) {
            return this.promise;
        }

        let that = this;

        let promise = new Promise<Array<string>>(function (resolve, reject) {

            //ser.acquireToken('https://honidentitydev.onmicrosoft.com/dev-int-allegrettoapi/', (err, token) => {
            let headers = new HttpHeaders();
            // headers = headers.set('Authorization', 'Bearer ' + token);
            headers = headers.set('Ocp-Apim-Subscription-Key', '138ef26998ff483baca6c2818dcd2c6c');
            headers = headers.set('OrganizationId', 'Man63655995602947');
            headers = headers.set('Accept', '*/*');
            that.http.get("https://devintallegretto.azure-api.net/portal/v1/api/User/RolesAndPrivileges/Man63655995602947", { headers: headers })
                .subscribe(data => {
                    resolve(<Array<string>>((<any>data).Result));
                });
            //});
        });
        return promise;
    }

}
