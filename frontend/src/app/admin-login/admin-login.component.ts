import { Component, OnInit } from '@angular/core';
import { Admin } from '../models/admin';
import { GuestbookService } from '../services/guestbook.service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  admin: Admin = new Admin();

  constructor(private guestbookService: GuestbookService, private router: Router ) { }

  ngOnInit(): void {
  }

  //on login form submit
  onSubmit(): void{
    this.guestbookService.authenticateAdmin(this.admin).subscribe(
      () => {
        console.log("ausgeführt");

        //clear form if credentials wrong
        if(!this.guestbookService.isAuthed){
          this.admin = new Admin();
          console.log("wrong")
        }
        //navigate back to dashboard when logged in
        else{
          console.log("true");
          this.router.navigate(["/"]);
        }
      }
    );
  }

}
