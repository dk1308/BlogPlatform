import { RegisterRequest } from './../models/register-request.model';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnDestroy {
  repeatPassword: string | null = null;
  registerRequest: RegisterRequest;
  registerSubscription?: Subscription;
  @ViewChild('form', { static: false }) registerForm: NgForm = {} as NgForm;

  constructor(private authService: AuthService,
    private ngx: NgxUiLoaderService,
    private toastr: ToastrService,
    private router: Router) {
    this.registerRequest = {
      email: '',
      password: '',
      username: ''
    };
    
  }

  onFormSubmit() {
    this.ngx.start();
    if (this.registerRequest.password == this.repeatPassword) {
      this.registerSubscription = this.authService.register(this.registerRequest).subscribe({
        next: response => {
          this.ngx.stop();
          this.toastr.success('Register successfully!');
          this.router.navigateByUrl('/login');
        },
        error: error => {
          this.ngx.stop();
          this.registerForm.resetForm();
          this.toastr.error('Username already exists!');
        }
      });
    } else {
      this.ngx.stop();
      this.registerForm.resetForm();
      this.toastr.error('Password and confirm password must match together!');
    }
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
