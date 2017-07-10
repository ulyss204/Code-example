import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'keys'})
export class JsonPipe implements PipeTransform {
  transform(value: any, args?: any[]): any[] {
        let keys = Object.keys(value),
            data = [];

        keys.forEach(key => {
            data.push(value[key]);
        });

        return data;
    }
}
