import { Component, OnInit } from '@angular/core';
import { authors } from 'src/app/core/data/authors';
import { Author } from 'src/app/core/models/autor.model';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  authors: Author[] = authors;

  left: string = '0';

  activeLi: string = 'Welcome';

  liTitle: string[] = [
    'Welcome',
    'About RS School',
    'Our team',
  ];

  constructor() {}

  ngOnInit(): void {}

  moveCarusel(id: string) {
    if (id === 'Welcome') {
      this.left = '0';
      this.activeLi = 'Welcome';
    } else if (id === 'About RS School') {
      this.activeLi = 'About RS School';
      this.left = '-100%';
    } else if (id === 'Our team') {
      this.activeLi = 'Our team';
      this.left = '-200%';
    }
  }
}
