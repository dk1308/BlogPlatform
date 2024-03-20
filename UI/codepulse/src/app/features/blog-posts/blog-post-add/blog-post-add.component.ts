import { Component, OnDestroy, OnInit } from '@angular/core';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Router } from '@angular/router';
import { Category } from '../../categories/models/category.model';
import { CategoryService } from '../../categories/services/category.service';
import { ImageSelectorComponent } from 'src/app/shared/components/image-selector/image-selector.component';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-blog-post-add',
  templateUrl: './blog-post-add.component.html',
  styleUrls: ['./blog-post-add.component.css']
})
export class BlogPostAddComponent implements OnDestroy, OnInit{
  blogPost: AddBlogPostRequest;
  addBlogPostSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  isModalOpened: boolean = false;
  blogImageSubscription?: Subscription;
  selectImageSubscription?: Subscription;

  constructor(private service: BlogPostService,
    private router: Router, 
    private categoryService: CategoryService,
    private imageService: ImageService) {
    this.blogPost = {
      title: '',
      shortDescription: '',
      content: '',
      featuredImageUrl: '',
      urlHandle: '',
      publishedDate: new Date(),
      author: '',
      isVisible: true,
      categories: []
    }
  }
  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.selectImageSubscription = this.imageService.onSelectImage().subscribe({
      next: res => {
        if(this.blogPost){
          this.blogPost.featuredImageUrl = res.url;
          this.isModalOpened = false;
        }
      }
    });
  }
  
  onFormSubmit() {
    console.log(this.blogPost);
    this.addBlogPostSubscription = this.service.addBlogPost(this.blogPost).subscribe(
      {
        next: res => {
          this.router.navigateByUrl('admin/blogPosts');
        }
      }
    );
  }

  openModalImageSelector() {
    this.isModalOpened = true;
  }

  closeModalImageSelector() {
    this.isModalOpened = false;
  }

  // onModalClosed() {
  //   this.blogImageSubscription = this.imageService.getBlogImage()?.subscribe({
  //     next: res => this.blogPost.featuredImageUrl = res.url
  //   });  
  //   console.log(this.blogPost.featuredImageUrl);
  // }

  ngOnDestroy(): void {
    this.addBlogPostSubscription?.unsubscribe();
    this.blogImageSubscription?.unsubscribe();
    this.selectImageSubscription?.unsubscribe();
  }
}
