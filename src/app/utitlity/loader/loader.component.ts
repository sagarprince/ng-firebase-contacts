import { Component } from '@angular/core';
import { Observable } from "rxjs/Observable";

declare var $;

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  constructor() { 
    
  }

  ngAfterContentInit() {
    this.show();
  }

  show() {
    $('#modal-loader').modal();
  }

  hide(): Observable<any> {
    return Observable.create((observer) => {          
      $('#modal-loader').modal('hide');
      observer.next('hide');
      observer.complete();
    });
  }

}
