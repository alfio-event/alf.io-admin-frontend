export class Group {
    id: number;
    name: string;
    description: string;
    organizationId: number;
    active: boolean;
}

export class GroupWithDetails {
    id: number;
    name: string;
    description: string;
    organizationId: number;
    items: GroupItem[];
}

export class GroupItem {
    id: number;
    value: string;
    description: string;
}