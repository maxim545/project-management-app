import { Component, OnInit } from '@angular/core';
import { authors } from 'src/app/core/data/authors';
import { Author } from '../../../core/models/autor.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  team: Author[] = authors;

  constructor() {}

  ngOnInit(): void {}
}
