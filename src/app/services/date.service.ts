import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: Date) {
    // If the date is before 24 hours ago
    if(moment(date).isBefore(moment().subtract(1, 'days').format())) {
      return moment(date).format('DD/MM');
    }
    return moment(date).format('LT');
  }

  formatDateFull(date: Date) {
    return moment(date).format('lll');
  }

  generateStringDate() {
    return moment().format();
  }
}
