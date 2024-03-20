import { Component, OnInit } from '@angular/core';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent  implements OnInit{
  blogPosts$?: Observable<BlogPost[]>;
  constructor(private service: BlogPostService){

  }
  ngOnInit(): void {
    this.blogPosts$ = this.service.getAllBlogPosts();
  }
 
}
