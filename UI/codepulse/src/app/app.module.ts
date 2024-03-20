import { NgScrollbarModule } from 'ngx-scrollbar';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { CategoryAddComponent } from './features/categories/category-add/category-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CategoryUpdateComponent } from './features/categories/category-update/category-update.component';
import { BlogPostListComponent } from './features/blog-posts/blog-post-list/blog-post-list.component';
import { BlogPostAddComponent } from './features/blog-posts/blog-post-add/blog-post-add.component';
import { MarkdownModule } from 'ngx-markdown';
import { BlogPostUpdateComponent } from './features/blog-posts/blog-post-update/blog-post-update.component';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { HomeComponent } from './features/home/home/home.component';
import { BlogPostDetailsComponent } from './features/blog-posts/blog-post-details/blog-post-details.component';
import { LoginComponent } from './features/auths/login/login.component';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CategoryListComponent,
    CategoryAddComponent,
    CategoryUpdateComponent,
    BlogPostListComponent,
    BlogPostAddComponent,
    BlogPostUpdateComponent,
    ImageSelectorComponent,
    HomeComponent,
    BlogPostDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    BrowserAnimationsModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    NgScrollbarModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
