import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    public init(config) {
        this.config = config;
        this.adal.init(config);
        this.getData();
    }

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

    public hasRole(role: string): Promise<boolean> {
        return this.getRoles().then(roles => roles.some(r => r === role));
    }
    public hasPrivilege(privilege: string): Promise<boolean> {
        return this.getPrivileges().then(privileges => privileges.some(p => p === privilege));
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

            let headers = new HttpHeaders();
            headers = headers.set('Ocp-Apim-Subscription-Key', that.config.ocpApimSubscriptionKey);
            headers = headers.set('OrganizationId', that.config.organizationId);
            headers = headers.set('Accept', '*/*');
            that.http.get(that.config.getRoleUrl, { headers: headers })
                .subscribe(data => {
                    resolve(<Array<string>>((<any>data).Result));
                });
        });
        return promise;
    }

}
