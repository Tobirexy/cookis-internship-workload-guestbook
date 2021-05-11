import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GuestBookPost } from '../models/guest-book-post';

//make service injectable = provide ready to use object in components
@Injectable({
  providedIn: 'root'
})
export class GuestbookService {

  //add http injectable
  constructor(private http: HttpClient) {}

  //rest api backend url
  private backendUrl = "http://127.0.0.1:3000/api/posts/"

  //return all posts from backend
  getGuestbookPosts(): Observable<GuestBookPost[]> {
    return this.http.get<GuestBookPost[]>(this.backendUrl);
  }

  //add new post to backend
  addNewGuestbookPost(post: GuestBookPost): Observable<GuestBookPost>{
    return this.http.post<GuestBookPost>(this.backendUrl,post);
  }

}
