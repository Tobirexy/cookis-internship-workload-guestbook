import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GuestBookPost } from '../models/guest-book-post';
import { GuestbookService } from '../services/guestbook.service';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-guestbook-posts',
  templateUrl: './guestbook-posts.component.html',
  styleUrls: ['./guestbook-posts.component.css']
})
export class GuestbookPostsComponent implements OnInit {

  // Input Event from parent component to reload posts when new post was created
  @Input() 
  refreshPostsSubject: Subject<any>;

  posts: GuestBookPost[] = [];
  isLoading: boolean = false;

  // add guestbook service
  constructor(public guestbookService: GuestbookService, private snackBar: MatSnackBar) { }

  // load posts when component is initialized or when refresh event from parent component received
  ngOnInit(): void {
    this.getPosts();
    this.refreshPostsSubject.subscribe(
      (event) => {
        this.getPosts();
      }
    );
  }

  //load all posts
  getPosts(): void {
    this.isLoading = true;
    this.guestbookService.getGuestbookPosts().subscribe(

      (resp) => {
        this.isLoading = false;
        this.posts = resp;
      },
      (err) => {
        console.log("Error");
        console.log(err);
      }
    );
  }
  
  //delete post by admin
  deletePost(post: GuestBookPost){
    this.guestbookService.deletePost(post).subscribe(
      (resp) => {
        if(resp["result"] == "deleted"){
          this.getPosts();
          // bottom snackbar with success message
          this.snackBar.open('Post deleted', 'Ok');
        }
        else{
          this.snackBar.open('Error deleting post', 'Ok');
        }
      },
      (err) => {
        this.snackBar.open('Network error', 'Ok');        
      } 
    );
  }

}
