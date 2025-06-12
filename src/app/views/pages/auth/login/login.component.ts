import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-login',
    imports: [
        NgStyle,
        RouterLink,
        FormsModule
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  returnUrl: any;
  loggedin: boolean = false;
  Uemail: string = '';
  Upassword: string = '';
  userRole$: Observable<string | undefined>;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(form: NgForm) {
    localStorage.setItem('isLoggedin', 'true');
    if (localStorage.getItem('isLoggedin') === 'true') {
      this.router.navigate([this.returnUrl]);
    }
  }

}
