import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CreatePostDialogComponent } from '../create-post-dialog/create-post-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // input event to send to child component for reloading posts
  refreshPostsSubject: Subject<any> = new Subject();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // display dialog with form for creating a new post
  openDialog(): void{
    console.log("dialog oppened")
    const dialogRef = this.dialog.open(CreatePostDialogComponent, { 

    })
    // send event to child component when post was created successfully
    dialogRef.afterClosed().subscribe(result => {
      if(result = "success"){
        this.refreshPostsSubject.next();
      }
    });
  }

}
