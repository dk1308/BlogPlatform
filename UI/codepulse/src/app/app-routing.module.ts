import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { CategoryAddComponent } from './features/categories/category-add/category-add.component';
import { CategoryUpdateComponent } from './features/categories/category-update/category-update.component';
import { BlogPostListComponent } from './features/blog-posts/blog-post-list/blog-post-list.component';
import { BlogPostAddComponent } from './features/blog-posts/blog-post-add/blog-post-add.component';
import { BlogPostUpdateComponent } from './features/blog-posts/blog-post-update/blog-post-update.component';
import { HomeComponent } from './features/home/home/home.component';
import { BlogPostDetailsComponent } from './features/blog-posts/blog-post-details/blog-post-details.component';
import { LoginComponent } from './features/auths/login/login.component';
import { authGuard } from './features/auths/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "blogPosts/:url",
    component: BlogPostDetailsComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "admin/categories",
    component: CategoryListComponent,
    canActivate: [authGuard]
  }, {
    path: "admin/categories/add",
    component: CategoryAddComponent,
    canActivate: [authGuard]
  }, {
    path: "admin/categories/:id",
    component: CategoryUpdateComponent,
    canActivate: [authGuard]
  }, {
    path: "admin/blogPosts",
    component: BlogPostListComponent,
    canActivate: [authGuard]
  }, {
    path: "admin/blogPosts/add",
    component: BlogPostAddComponent,
    canActivate: [authGuard]
  }, {
    path: "admin/blogPosts/:id",
    component: BlogPostUpdateComponent,
    canActivate: [authGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
