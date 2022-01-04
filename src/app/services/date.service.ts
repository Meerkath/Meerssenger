import { Injectable } from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() { }

  formatDate(date: string) {
    // If the date is before 24 hours ago
    if(moment(date).isBefore(moment().subtract(1, 'days').format())) {
      return moment(date).format('DD/MM');
    }
    return moment(date).format('hh:mm');
  }

  formatDateFull(date: string) {
    return moment(date).format('lll');
  }
}
