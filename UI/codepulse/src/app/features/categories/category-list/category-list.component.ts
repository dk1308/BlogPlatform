import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category.model';
import { CategoryService } from '../services/category.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit{
  listCategory$?: Observable<Category[]>;
  constructor(private service: CategoryService){

  }

  ngOnInit(): void {
    this.listCategory$ = this.service.getAllCategories();
  }

}
