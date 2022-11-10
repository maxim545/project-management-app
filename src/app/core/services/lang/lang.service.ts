import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LangService {
  constructor(
    public translate: TranslateService,
  ) { }

  changeLanguage(isChecked: boolean) {
    if (isChecked) {
      localStorage.setItem('uniq_lang', 'en');
      this.translate.use('en');
    } else {
      localStorage.setItem('uniq_lang', 'ru');
      this.translate.use('ru');
    }
  }

  getCurrentLanguage() {
    const currentLang = localStorage.getItem('uniq_lang') === 'ru' ? 'ru' : 'en';
    return currentLang;
  }
}
