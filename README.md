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
            '<url>': '<unic url or guid>',
            '<url>': '<unic url or guid>'
            },
            ocpApimSubscriptionKey: '<id>',
            organizationId: '<id>',
            getRoleUrl: '<url>'
        }
    }
    ...
}
```


