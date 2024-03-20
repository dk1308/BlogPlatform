import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { Category } from '../models/category.model';
import { environment } from 'src/environments/environment';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) {

   }
  
   
   getAllCategories():Observable<Category[]>{
     return this.httpClient.get<Category[]>(`${environment.apiBaseUrl}/api/categories`);
    }
    
    getCategoryById(id: string):Observable<Category> {
      return this.httpClient.get<Category>(`${environment.apiBaseUrl}/api/categories/${id}`);
    }
    
    addCategory(model:AddCategoryRequest): Observable<void> {
       return this.httpClient.post<void>(`${environment.apiBaseUrl}/api/categories?addAuth=true`, model);
    }
    
    updateCategory(id: string, category: UpdateCategoryRequest):Observable<Category> {
     return this.httpClient.put<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`, category, {
      headers: {
        'Authorization': 'token'
      }
     });
    }
    
   deleteCategory(id: string):Observable<Category> {
    return this.httpClient.delete<Category>(`${environment.apiBaseUrl}/api/categories/${id}?addAuth=true`);
   }
}