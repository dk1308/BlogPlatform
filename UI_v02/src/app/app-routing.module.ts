import { authGuard } from './../../../UI/codepulse/src/app/features/auths/guards/auth.guard';
import { CategoryUpdateComponent } from './views/categories/category-update/category-update.component';
import { BlogPostUpdateComponent } from './views/blog-posts/blog-post-update/blog-post-update.component';
import { CategoryListComponent } from './views/categories/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/auths/login/login.component';
import { RegisterComponent } from './views/auths/register/register.component';
import { BlogPostAddComponent } from './views/blog-posts/blog-post-add/blog-post-add.component';
import { BlogPostListComponent } from './views/blog-posts/blog-post-list/blog-post-list.component';
import { CategoryAddComponent } from './views/categories/category-add/category-add.component';
import { HomeComponent } from './views/home/home/home.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { BlogPostDetailsComponent } from './views/blog-posts/blog-post-details/blog-post-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Homepage'
    }
  },
  {
    path: 'admin',
    component: DefaultLayoutComponent,
    canActivate: [authGuard],
    data: {
      title: 'Admin Homepage'
    },
    children: [
      {
        path: '',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then((m) => m.DashboardModule)
      },
      {
        path: 'forms',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./views/forms/forms.module').then((m) => m.CoreUIFormsModule)
      },
      {
        path: 'icons',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./views/icons/icons.module').then((m) => m.IconsModule)
      },
      {
        path: 'widgets',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./views/widgets/widgets.module').then((m) => m.WidgetsModule)
      },
      {
        path: 'blogPosts',
        canActivate: [authGuard],
        component: BlogPostListComponent
      },
      {
        path: 'blogPosts/add',
        canActivate: [authGuard],
        component: BlogPostAddComponent
      },
      {
        path: 'categories',
        canActivate: [authGuard],
        component: CategoryListComponent
      },
      {
        path: 'categories/add',
        canActivate: [authGuard],
        component: CategoryAddComponent
      },
      {
        path: 'blogPosts/:id',
        canActivate: [authGuard],
        component: BlogPostUpdateComponent
      },
      {
        path: 'categories/:id',
        canActivate: [authGuard],
        component: CategoryUpdateComponent
      }
    ]
  },
  {
    path: 'blogPosts/:url',
    component: BlogPostDetailsComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
      // relativeLinkResolution: 'legacy'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
