import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import { Category } from '../../categories/models/category.model';
import { CategoryService } from '../../categories/services/category.service';
import { UpdateBlogPostRequest } from '../models/update-blog-post-request.model';
import { ImageService } from 'src/app/shared/services/image.service';
import { MatDialog } from '@angular/material/dialog';
import { ImageSelectorComponent } from 'src/app/shared/components/image-selector/image-selector.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-blog-post-update',
  templateUrl: './blog-post-update.component.html',
  styleUrls: ['./blog-post-update.component.css']
})
export class BlogPostUpdateComponent implements OnInit, OnDestroy {
  blogPost?: BlogPost;
  id: string | null = null;
  categories$?: Observable<Category[]>;
  selectedCategories?: string[];
  isModalOpened: boolean = false;
  routeSubscription?: Subscription;
  getBlogSubscription?: Subscription;
  submitSubscription?: Subscription;
  deleteSubscription?: Subscription;
  selectImageSubscription?:Subscription;
  public Editor = ClassicEditor;

  constructor(private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private categoryService: CategoryService,
    private router: Router,
    private imageService: ImageService,
    private dialog: MatDialog) {

  }


  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe({
      next: param => {
        this.id = param.get('id');
      }
    });

    // Get blog post from API
    if (this.id) {
      this.getBlogSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
        next: respone => {
          this.blogPost = respone;
          this.selectedCategories = respone.categories.map(c => c.id);
        }
      })
    }
    // Get all categories from API
    this.categories$ = this.categoryService.getAllCategories();

    // Get image url from modal
    this.selectImageSubscription = this.imageService.onSelectImage().subscribe({
      next: res => {
        if(this.blogPost){
          this.blogPost.featuredImageUrl = res.url;
        }
        this.isModalOpened = false;
      }
    })
  }

  

  onFormSubmit() {
    // convert from blog post to blog post request
    if (this.blogPost && this.id) {
      const updateBlogPostRequest: UpdateBlogPostRequest = {
        title: this.blogPost?.title,
        shortDescription: this.blogPost?.shortDescription,
        content: this.blogPost?.content,
        featuredImageUrl: this.blogPost?.featuredImageUrl,
        urlHandle: this.blogPost?.urlHandle,
        publishedDate: this.blogPost?.publishedDate,
        author: this.blogPost?.author,
        isVisible: this.blogPost?.isVisible,
        categories: this.selectedCategories ?? []
      };

      this.submitSubscription = this.blogPostService.updateBlogPost(this.id, updateBlogPostRequest).subscribe({
        next: res => {
          this.router.navigateByUrl('admin/blogPosts');
        }
      })
    }
  }

  onDelete() {
    if (this.id)
      this.deleteSubscription = this.blogPostService.deleteBlogPost(this.id).subscribe({
        next: res => this.router.navigateByUrl("/admin/blogPosts")
      });
  }

  openModalImageSelector() {
    //this.isModalOpened = true;
    const dialogRef = this.dialog.open(ImageSelectorComponent, {
      data: {name: 'Khoa'}
    });
  }

  ngOnDestroy(): void {
    this.getBlogSubscription?.unsubscribe();
    this.routeSubscription?.unsubscribe();
    this.submitSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
    this.selectImageSubscription?.unsubscribe();
  }
}
