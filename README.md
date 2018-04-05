# Description

This is module of angular 5 destributed as folder.
Modul based on adal.js library and support authorization throw receiving roles and privileges throw http request.

# Install

```
npm install ccs-security-ng5
```

## Integrate to project

add module to ts compiling paths
```json
  "include": [
    "src/**/*",
    "node_modules/ccs-security-ng5/authorisation.module.ts"
  ]
```
add module to app
```ts
import { AuthorisationModule } from 'ccs-security-ng5/authorisation.module';
```

```ts
@NgModule({
...
imports: [
    ...
        AuthorisationModule
    ],
...
```

## Initialize
```ts
import { AuthorisationService } from 'ccs-security-ng5/authorisation.module';
...
export class AppComponent {
    constructor(service: AuthorisationService) {
        service.init({
            redirectUrl: '<url>',
            tenant: '<guid>',
            clientId: '<guid>',
            redirectUri: '<url>',
            postLogoutRedirectUri: '<url>',
            endpoints: {
            '<url>': '<unique url or guid>',
            '<url>': '<unique url or guid>'
            },
            ocpApimSubscriptionKey: '<id>',
            organizationId: '<id>',
            getRoleUrl: '<url>'
        }
    }
    ...
}
```

## Guard

AuthorisationGuard is protecting pages of app

```ts
import { AuthorisationGuard } from 'ccs-security-ng5/authorisation.module';

const siteRouting: ModuleWithProviders = RouterModule.forChild([
    {
        path: '<url>',        
        canActivate: [AuthorisationGuard],
        data: {
            privileges: ['read'],
            roles:['admin']
        }
    }
]);

@NgModule({
    imports: [
        siteRouting,
        ...
```

## Interceptor

AuthorisationInterceptor add access token to all requests described in config of module (endpoints section)

```ts
import { AuthorisationInterceptor } from 'ccs-security-ng5/authorisation.module';

@NgModule({
    ...
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthorisationInterceptor,
            multi: true
        }
    ]
    ...
})
```


