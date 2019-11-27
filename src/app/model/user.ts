import { Organization } from './organization';

export class User {
    id: number;
    type: string;
    enabled: boolean;
    description: string;
    username: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    validToEpochSecond: number;
    validTo: string;
    roles: Role[];
    memberOf: Organization[];
}

export enum Role {
    ADMIN = 'ADMIN',
    OWNER = 'OWNER',
    SUPERVISOR = 'SUPERVISOR',
    OPERATOR = 'OPERATOR',
    SPONSOR = 'SPONSOR',
    API_CONSUMER = 'API_CONSUMER'
}

export enum RoleTarget {
    ADMIN = 'ADMIN',
    USER = 'USER',
    API_KEY = 'API_KEY'
}

export class RoleDescriptor {
    role: Role;
    target: RoleTarget;
    description: string;
}