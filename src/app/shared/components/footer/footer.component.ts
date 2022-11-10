import { Component, OnInit } from '@angular/core';
import { Author } from '../../../core/models/autor.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  Maksim: Author = {
    name: 'Maksim Karotkin',
    gitHub: 'https://github.com/maxim545',
  };

  Ihar: Author = {
    name: 'Ihar Novikau',
    gitHub: 'https://github.com/IhorNovikow',
  };

  Viktoryia: Author = {
    name: 'Viktoryia Novikava',
    gitHub: 'https://github.com/vikuli',
  };

  team: Author[] = [this.Maksim, this.Ihar, this.Viktoryia];

  constructor() {}

  ngOnInit(): void {}
}
