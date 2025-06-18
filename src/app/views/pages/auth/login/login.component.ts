import { NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import { User } from '../../../../core/interfaces/user';
import { map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

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
  Urfc: string = '';
  Upassword: string = '';
  userRole$: Observable<string | undefined>;

  public _userService = inject(UserService);

  constructor(private router: Router, private route: ActivatedRoute) {
    this.userRole$ = this._userService.currentUser$.pipe(
      map(user => user?.rol_users?.role?.name)
    );
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/solicitudes';

  }

  onLoggedin(form: NgForm) {

    const user: User = {
      rfc: form.value.Urfc,
      password: form.value.Upassword
    };

    this._userService.login(user).subscribe({
      next: (response: any) => {
        
        const token = response.token;
        const userData = response.user;
        const bandera =  response.bandera

        localStorage.setItem('myToken', token);
        localStorage.setItem('isLoggedin', 'true');

        this._userService.setCurrentUser(userData);
        this.userRole$.subscribe(role => {
        });
        
        if(bandera){
          this.router.navigate(['/registro']);
        }else{
          this.router.navigate([this.returnUrl]);
        }
        
      },
      error: (e: HttpErrorResponse) => {
        if (e.error && e.error.msg) {
          console.error('Error del servidor:', e.error.msg);
        } else {
          console.error('Error desconocido:', e);
        }
      },
    });
  }

}
