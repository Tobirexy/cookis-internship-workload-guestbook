import { Component, Inject, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { GuestBookPost } from '../models/guest-book-post';
import { GuestbookPostsComponent } from '../guestbook-posts/guestbook-posts.component';
import { GuestbookService } from '../services/guestbook.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.css']
})
export class CreatePostDialogComponent implements OnInit {

  // configuration for WYSIWYG Editor
  editorConfig: AngularEditorConfig = {
    editable: true,
    toolbarHiddenButtons: [
      [
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'indent',
        'outdent',
        'heading',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  }

  constructor(private dialogRef: MatDialogRef<CreatePostDialogComponent>, private guestbookService: GuestbookService, private snackBar: MatSnackBar) { }

  post: GuestBookPost = new GuestBookPost;

  ngOnInit(): void {
  }

  // close dialog 
  close(): void {
    console.log(this.post);
    // send post to backend 
    if(this.post.message != null && this.post.name != null){
      console.log("sending post request")
      this.guestbookService.addNewGuestbookPost(this.post).subscribe(
        (resp) => {
          console.log(resp)
        },
        (err) => {
          console.log("Error");
          console.log(err);
        }
      );
      this.dialogRef.close("success");
      // bottom snackbar with success message
      this.snackBar.open('Post created', 'Ok');
    }
    else{
      this.dialogRef.close();
    }

  }
}
