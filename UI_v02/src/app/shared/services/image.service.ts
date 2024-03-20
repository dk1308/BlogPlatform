import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage> = new BehaviorSubject<BlogImage>({
    id: '',
    fileName: '',
    title: '',
    fileExtension: '',
    url: '',
    dateCreated: new Date()
  }); 

  constructor(private httpClient: HttpClient) { }

  uploadImage(file: File, fileName: string, title: string): Observable<BlogImage> {
    let formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);
    return this.httpClient.post<BlogImage>(`${environment.apiBaseUrl}/api/blogImages`, formData);
  };

  getImages(): Observable<BlogImage[]> {
    return this.httpClient.get<BlogImage[]>(`${environment.apiBaseUrl}/api/blogImages`); 
  }

  selectImage(image: BlogImage):void {
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
