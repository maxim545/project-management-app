import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { searchParams } from 'src/app/core/configs/search.config';
import { ISearchParam } from 'src/app/core/models/board.model';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  searchFields: ISearchParam[] = searchParams;

  searchForm!: FormGroup;

  constructor(
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
      ]),
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  isAllSelected(item: ISearchParam) {
    this.searchFields.forEach((val) => {
      if (val.id === item.id) {
        val.isSelected = !val.isSelected;
      } else {
        val.isSelected = false;
      }
    });
  }

  searchTasks() {
    const selectedValue = this.searchFields.find((field) => field.isSelected)?.value || 'title';
    this.router.navigate(['search'], {
      queryParams: {
        search_query: this.searchForm.value.title,
        type: selectedValue,
      },
    });
  }
}
