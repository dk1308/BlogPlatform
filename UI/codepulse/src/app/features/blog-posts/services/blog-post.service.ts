import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { AddBlogPostRequest } from '../models/add-blog-post-request.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { UpdateBlogPostRequest } from '../models/update-blog-post-request.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {
  constructor(private httpClient: HttpClient) { }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(`${environment.apiBaseUrl}/api/blogPosts`);
  }

  addBlogPost(addBlogPostRequest: AddBlogPostRequest):Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(`${environment.apiBaseUrl}/api/blogPosts?addAuth=true`, addBlogPostRequest);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${environment.apiBaseUrl}/api/blogPosts/${id}`);
  }

  updateBlogPost(id: string, updateBlogPostRequest: UpdateBlogPostRequest): Observable<BlogPost> {
    return this.httpClient.put<BlogPost>(`${environment.apiBaseUrl}/api/blogPosts/${id}?addAuth=true`, updateBlogPostRequest);
  }

  deleteBlogPost(id: string): Observable<BlogPost> {
    return this.httpClient.delete<BlogPost>(`${environment.apiBaseUrl}/api/blogPosts/${id}?addAuth=true`);
  }

  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${environment.apiBaseUrl}/api/blogPosts/${url}`);
  }
}
