import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/views/auths/models/user.model';
import { AuthService } from 'src/app/views/auths/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit, OnDestroy {
  user: User | undefined;
  getUserSubscription?: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.getUserSubscription = this.authService.getUser().subscribe({
      next: response => {
        this.user = response;
      }
    });
    this.user = this.authService.getUserFromLocalStorage();
  }

  onLogout(): void{
    this.authService.logOut();
  }

  ngOnDestroy(): void {
    this.getUserSubscription?.unsubscribe();
  }
}
