import { Injectable } from '@angular/core';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { AdalService } from '../services/adal-service';
import { AuthorisationService } from '../services/authorisation-service';

@Injectable()
export class AuthorisationGuard implements CanActivate {

    constructor(private router: Router, private adalService: AdalService, private service: AuthorisationService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {

        let i = 0;
        var result = new Promise<boolean>((resolve, reject) => {
            let reqRoles = [];
            let reqPrivileges = [];
            if (route.data && route.data["roles"]) {
                reqRoles = route.data["roles"] as Array<string>;
            }
            if (route.data && route.data["privileges"]) {
                reqPrivileges = route.data["privileges"] as Array<string>;
            }
            this.service.getRoles().then((roles) => {
                this.service.getPrivileges().then((privileges) => {
                    if (!Array.isArray(roles) || !Array.isArray(privileges)) {
                        resolve(false);
                        return;
                    }
                    if (reqRoles.some(reqRole => !roles.some(role => role === reqRole))) {
                        resolve(false);
                        return;
                    }
                    if (reqPrivileges.some(reqPriv => !privileges.some(priv => priv === reqPriv))) {
                        resolve(false);
                        return;
                    }
                    resolve(true);
                }).catch(r => resolve(false));
            }).catch(r => resolve(false));
        });

        // const navigationExtras: NavigationExtras = {
        //     queryParams: { 'redirectUrl': route.url }
        // };

        // if (!this.adalService.userInfo) {
        //     this.router.navigate(['login'], navigationExtras);
        // }

        return result;
    }
}
