import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GuestBookPost } from '../models/guest-book-post';
import { GuestbookService } from '../services/guestbook.service';

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
  constructor(private guestbookService: GuestbookService) { }

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

}
