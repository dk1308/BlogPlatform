import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CategoryListComponent } from '../category-list/category-list.component';

@Component({
  selector: 'app-category-add',
  templateUrl: './category-add.component.html',
  styleUrls: ['./category-add.component.css']
})
export class CategoryAddComponent implements OnDestroy {
  model: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private service: CategoryService, private router: Router) {
    this.model = {
      name: '',
      urlHandle: ''
    };
  }

  onFormSubmit(){
    this.addCategorySubscription = this.service.addCategory(this.model)
    .subscribe({
      next: response => {
        this.router.navigateByUrl('/admin/categories');
      }
    });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}
