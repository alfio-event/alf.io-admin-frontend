export class ExtensionLog {
    id: number;
    effectivePath: string;
    path: string;
    name: string;
    description: string;
    type: ExtensionLogType;
    timestamp: string;
}

export enum ExtensionLogType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
    INFO = 'INFO',
    WARNING = 'WARNING'
}