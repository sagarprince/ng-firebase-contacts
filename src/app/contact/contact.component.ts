import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('scaleAnimation', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(500)
      ]),
      transition('* => void', [
        style({ transform: 'scale3d(.0, .0, .0)' }),
        animate(500)
      ])
    ])
  ]
})



export class ContactComponent implements OnInit {

  @Input() contact: any;
  @Output() editContactEvent: any = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  editContact() {    
    this.editContactEvent.emit(this.contact);
  }

}
