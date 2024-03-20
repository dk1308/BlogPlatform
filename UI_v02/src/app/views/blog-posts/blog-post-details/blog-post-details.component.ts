import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { BlogPostService } from '../services/blog-post.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css']
})
export class BlogPostDetailsComponent implements OnInit {
  url: string | null = null;
  blogPost$?: Observable<BlogPost>;
  public Editor = ClassicEditor;

  constructor(private route: ActivatedRoute, 
    private blogPostService: BlogPostService){

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: param => {
        this.url = param.get('url');
      }
    });

    if(this.url){
      this.blogPost$ = this.blogPostService.getBlogPostByUrl(this.url);
    }
    
  }



}
