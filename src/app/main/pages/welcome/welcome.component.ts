import { Component, OnInit } from '@angular/core';
import { authors } from 'src/app/core/data/authors';
import { Author } from 'src/app/core/models/autor.model';
import { TranslateService } from '@ngx-translate/core';
import { currentLang } from '../../../core/configs/lang';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  authors: Author[] = authors;

  left: string = '0';

  length = currentLang;

  liTitle: string[] = ['welcome.welcome', 'welcome.About', 'welcome.Our'];

  activeLi: string = this.liTitle[0];

  constructor() {}

  ngOnInit(): void {}

  moveCarusel(id: string) {
    if (id === this.liTitle[0]) {
      this.left = '0';
      [this.activeLi,,] = this.liTitle;
    } else if (id === this.liTitle[1]) {
      [,this.activeLi] = this.liTitle;
      this.left = '-100%';
    } else if (id === this.liTitle[2]) {
      [,,this.activeLi] = this.liTitle;
      this.left = '-200%';
    }
  }
}
