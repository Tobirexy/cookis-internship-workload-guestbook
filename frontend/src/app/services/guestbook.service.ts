import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Admin } from '../models/admin';
import { GuestBookPost } from '../models/guest-book-post';

//make service injectable = provide ready to use object in components
@Injectable({
  providedIn: 'root'
})
export class GuestbookService {

  //is Admin logged in right now
  private adminAuthed: boolean;
  
  //add http injectable
  constructor(private http: HttpClient) {}

  //rest api backend url
  private backendUrl = "http://127.0.0.1:3000/api/"

  //return all posts from backend
  getGuestbookPosts(): Observable<GuestBookPost[]> {
    return this.http.get<GuestBookPost[]>(this.backendUrl + "posts/");
  }

  //add new post to backend
  addNewGuestbookPost(post: GuestBookPost): Observable<GuestBookPost>{
    return this.http.post<GuestBookPost>(this.backendUrl + "posts/", post);
  }

  isAuthed(): boolean{
    return this.adminAuthed;
  }

  getApiKey(): String {
    return localStorage.getItem("apiKey");
  }

  //send credentials to backend and get api key
  authenticateAdmin(admin: Admin): Observable<boolean>{
    return new Observable<boolean>(
      (observer) => {
        this.http.post(this.backendUrl + "auth/", admin).subscribe(
          (resp) => {
            if(resp["apiKey"]){
              localStorage.setItem('apiKey', resp["apiKey"]);
              this.adminAuthed = true;
              observer.next(true);
            }
            console.log(resp);
          },
          (err) => {
            console.log(err);
            observer.next(false);
          }
        );
      }
    );
  }

  //delete post by admin
  deletePost(post: GuestBookPost): Observable<Object>{
    return this.http.delete(this.backendUrl + 'posts/' + post.id);
  }

  //log admin out
  logout(): void{
    this.adminAuthed = false;
    localStorage.removeItem("apiKey");
  }
}
