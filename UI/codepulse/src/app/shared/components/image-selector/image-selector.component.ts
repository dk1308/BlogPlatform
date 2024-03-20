import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';
import { BlogImage } from '../../models/blog-image.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent implements OnDestroy, OnInit{
  file?: File;
  fileName: string = '';
  title: string = '';
  blogImage?: BlogImage;
  blogImages$?: Observable<BlogImage[]>;
  uploadSubscription?: Subscription;

@ViewChild('form', {static: false}) imageSelectorForm?: NgForm;

  constructor( private service: ImageService,
    private router: Router){}


  ngOnInit(): void {
    this.blogImages$ = this.service.getImages();
  }


  onImageUploadChange(event:Event):void{
    const element = event.currentTarget as HTMLInputElement;
    this.file = element.files?.[0];
  }

  onImageSubmit(){
    if(this.file && this.fileName!='' && this.title!=''){
      this.uploadSubscription = this.service.uploadImage(this.file, this.fileName, this.title).subscribe({
        next: res => {
          this.blogImages$ = this.service.getImages();
          this.imageSelectorForm?.resetForm();
          this.service.selectImage(res);
        }
      });
    }
  }

  selectImage(image: BlogImage): void{
    this.service.selectImage(image);
  }

  ngOnDestroy(): void {
    this.uploadSubscription?.unsubscribe();
  }
}
