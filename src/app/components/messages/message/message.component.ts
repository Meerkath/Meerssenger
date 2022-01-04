import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../../models/Message';
import { DateService } from '../../../services/date.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() message: Message;
  class: string;
  displayDate: boolean;
  constructor(
    public dateService: DateService,
  ) { }

  ngOnInit() {
    this.class = this.message.sentByActualUser ? 'from-user' : 'from-other';
  }

  toggleDate() {
    this.displayDate = !this.displayDate;
  }
}
