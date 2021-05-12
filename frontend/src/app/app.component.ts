import { Component } from '@angular/core';
import { GuestbookService } from './services/guestbook.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public guestbookService: GuestbookService, public dialog: MatDialog){}

  ngOnInit(){
    
  }

  openInfoDialog():void{
    const dialogRef = this.dialog.open(InfoDialogComponent);
  }
}
