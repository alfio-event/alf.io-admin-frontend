import { ConfigurationKey } from './configuration';

export class ProviderAndKeys {
    provider: GeoInfoProvider;
    keys: {[key in ConfigurationKey]? : string};
}

export enum GeoInfoProvider {
    GOOGLE = 'GOOGLE', HERE = 'HERE', NONE = 'NONE'
}