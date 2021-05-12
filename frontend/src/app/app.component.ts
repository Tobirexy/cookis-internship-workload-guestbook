import { Component } from '@angular/core';
import { GuestbookService } from './services/guestbook.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public guestbookService: GuestbookService){}

  ngOnInit(){
    
  }
}
