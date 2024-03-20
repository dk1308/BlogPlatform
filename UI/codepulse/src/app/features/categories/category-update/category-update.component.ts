import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { UpdateCategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.css']
})
export class CategoryUpdateComponent implements OnInit, OnDestroy {
  id?: string | null;
  category?: Category;
  paramsSubscription?: Subscription;
  submitSubscription?: Subscription;
  deleteSubscription?: Subscription;
  /**
   *
   */
  constructor(
    private route: ActivatedRoute,
    private service: CategoryService,
    private router: Router) { }


  ngOnInit(): void {

    this.paramsSubscription = this.route.paramMap.subscribe(
      {
        next: (params) => {
          this.id = params.get('id');
        }
      }
    );
    this.submitSubscription = this.service.getCategoryById(this.id ?? '')
      .subscribe({
        next: res => {
          this.category = res;
        }
      });
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.submitSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }

  onFormSubmit() {
    const UpdateCategoryRequest: UpdateCategoryRequest = {
      name: this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    }

    this.submitSubscription = this.service.updateCategory(this.id ?? '', UpdateCategoryRequest).subscribe(
      {
        next: res => {
          this.router.navigateByUrl('/admin/categories');
        }
      }
    )
  }

  onDelete() {
    this.deleteSubscription = this.service.deleteCategory(this.id ?? '').subscribe(
      {
        next: res => {
          this.router.navigateByUrl('/admin/categories');
        }
      })
  }



}
