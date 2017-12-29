# sdk-js
> Javascript SDK for Availity

[![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square&label=license)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://img.shields.io/david/dev/Availity/sdk-js.svg?style=flat-square)](https://david-dm.org/Availity/sdk-js)
[![Build](https://img.shields.io/travis/Availity/sdk-js.svg?style=flat-square&label=build)](https://travis-ci.org/Availity/sdk-js)

## Supported Browsers

* Internet Explorer 11 and newer
* Google Chrome
* Mozilla Firefox

## Documentation

- [api-core](packages/api-core/README.md) - Base API definitions used by [api-axios](packages/api-axios/README.md) and [api-angular](api-angular/README.md) for the Availity REST API.
    * [AvUser](api-core/src/resources/README.md#avuser)
    * [AvRegions](api-core/src/resources/README.md#avregions)
    * [AvPermissions](api-core/src/resources/README.md#avpermissions)
    * [AvUserPermissions](api-core/src/resources/README.md#avuserpermissions)
    * [AvNavigation](api-core/src/resources/README.md#avnavigation)
    * [AvSpaces](api-core/src/resources/README.md#avspaces)
    * [AvOrganizations](api-core/src/resources/README.md#avorganizations)
    * [AvProviders](api-core/src/resources/README.md#avproviders)
    * [AvLogMessage](api-core/src/resources/README.md#avlogmessage)
    * [AvProxy](api-core/src/resources/README.md#avproxy)
- [api-axios](packages/api-axios/README.md) - A package wrapping [@av/api-core](../api-core/README.md) with [axios](https://github.com/axios/axios) and native ES6 Promise. 
- [api-angular](packages/api-angular/README.md) - A package wrapping [@av/api-core](../api-core/README.md) with Angular `$http`.
- [localalstorage-core](packages/localstorage-core/README.md) - Wraps localStorage with utility functions. 

## License
[MIT](./LICENSE)
