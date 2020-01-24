import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'toNumber', pure: true})
export class ToNumberPipe implements PipeTransform {

    transform(input: string) {
        return parseInt(input);
    }
}