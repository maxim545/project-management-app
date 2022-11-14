import { Component, OnInit } from '@angular/core';
import { authors } from 'src/app/core/data/authors';
import { Author } from 'src/app/core/models/autor.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  authors: Author[] = authors;

  constructor() { }

  ngOnInit(): void {
  }

}
