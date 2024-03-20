import { AuthInterceptor } from './../../../UI/codepulse/src/app/core/interceptor/auth.interceptor';

import { BlogPostDetailsComponent } from './views/blog-posts/blog-post-details/blog-post-details.component';
import { HomeComponent } from './views/home/home/home.component';
import { BlogPostUpdateComponent } from './views/blog-posts/blog-post-update/blog-post-update.component';
import { BlogPostAddComponent } from './views/blog-posts/blog-post-add/blog-post-add.component';
import { BlogPostListComponent } from './views/blog-posts/blog-post-list/blog-post-list.component';
import { CategoryUpdateComponent } from './views/categories/category-update/category-update.component';
import { CategoryAddComponent } from './views/categories/category-add/category-add.component';
import { CategoryListComponent } from './views/categories/category-list/category-list.component';
import { NavBarComponent } from './core/components/nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { NgScrollbarModule } from 'ngx-scrollbar';

// Import routing module
import { AppRoutingModule } from './app-routing.module';

// Import app component
import { AppComponent } from './app.component';

// Import containers
import { DefaultFooterComponent, DefaultHeaderComponent, DefaultLayoutComponent } from './containers';

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
  UtilitiesModule,
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { ImageSelectorComponent } from './shared/components/image-selector/image-selector.component';
import { LoginComponent } from './views/auths/login/login.component';
import { WidgetsComponent } from './views/widgets/widgets/widgets.component';
import { RegisterComponent } from './views/auths/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';

const APP_CONTAINERS = [
  DefaultFooterComponent,
  DefaultHeaderComponent,
  DefaultLayoutComponent
];

@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS,
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
    LoginComponent,
    RegisterComponent],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
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
    NgScrollbarModule,
    CKEditorModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatDialogModule,
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
