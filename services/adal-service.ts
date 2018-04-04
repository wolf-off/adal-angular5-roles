/// <reference path="../../../node_modules/@types/adal/index.d.ts" />
import { Injectable, Output, EventEmitter } from '@angular/core';
import 'expose-loader?AuthenticationContext!../../../node_modules/adal-angular/lib/adal.js';
import { adal } from 'adal-angular';

const createAuthContextFn: adal.AuthenticationContextStatic = AuthenticationContext;

@Injectable()
export class AdalService {
    @Output() userInfoUpdated = new EventEmitter();
    private context: adal.AuthenticationContext;
    private config: any;
    start;
    constructor() {
    }

    init(config) {
        this.config = config;
        this.context = new createAuthContextFn(config);
    }

    login() {
        this.context.login();
        this.emitUserInfoChange();
    }

    logout() {
        this.context.logOut();
        this.emitUserInfoChange();
    }

    handleCallback() {
        this.context.handleWindowCallback();
        this.emitUserInfoChange();
    }

    public get userInfo() {
        if (this.context) {
            return this.context.getCachedUser();
        }
        return {};
    }

    public get accessToken() {
        return this.context.getCachedToken(this.config.clientId);
    }

    public getcontext() {
        return this.context;
    }

    public get isAuthenticated() {
        return this.userInfo && this.accessToken;
    }

    public get getAccessToken() {
        return new Promise((resolve, reject) => {
            this.context.acquireToken(this.config.clientId, (message, token) => {
                if (token) {
                    resolve(token);
                } else {
                    reject(message);
                }
            });
        });
    }

    private emitUserInfoChange() {
        this.userInfoUpdated.emit({ authenticatedUser: this.userInfo });
    }
}
