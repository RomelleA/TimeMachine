import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToHebrew',
})
export class dateToHebrewPipe implements PipeTransform {
  transform(month: string) {
    switch (month) {
      case 'January': {
        'ינואר';
        break;
      }
      case 'February': {
        'פברואר';
        break;
      }
      case 'March': {
        'מרץ';
        break;
      }
      case 'April': {
        'אפריל';
        break;
      }
      case 'May': {
        'מאי';
        break;
      }
      case 'June': {
        'יוני';
        break;
      }
      case 'July': {
        'יולי';
        break;
      }
      case 'August': {
        'אוגוסט';
        break;
      }
      case 'September': {
        'ספטמבר';
        break;
      }

    }
  }
}
