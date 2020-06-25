import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'msToTime'
})
export class hourDifferencePipe implements PipeTransform {

  transform(difference: number): string {
      var hours = 0;
      var minutes = Math.floor(difference / 1000 / 60);
      if(minutes > 60) {
        hours = Math.floor(minutes / 60);
        minutes = minutes - (hours * 60);
      }
    return `${(hours < 10)?`0${hours}`:hours}:${(minutes < 10)?`0${minutes}`:minutes}`
  }
}
