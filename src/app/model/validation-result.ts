export class ValidationResult {

    errorDescriptors: ErrorDescriptor[];
    errorCount: number;
}

export class ErrorDescriptor {
    fieldName: string;
    message: string;
    code: string;
    arguments: any[];
}