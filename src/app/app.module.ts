import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import {
  HttpClientModule, HTTP_INTERCEPTORS, HttpClient, HttpBackend,
} from '@angular/common/http';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { SharedModule } from './shared/shared.module';
import { ApiInterceptor } from './core/interceptors/api.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { UserEffects } from './core/store/effects/user.effects';
import { userReducer } from './core/store/reducers/user.reducer';
import { boardReducer } from './core/store/reducers/boards.reducer';
import { BoardsEffects } from './core/store/effects/boards.effect';
import { ColumnsEffects } from './core/store/effects/columns.effects';
import { columnReducer } from './core/store/reducers/columns.reducers';
import { currentLang } from './core/configs/lang';
import { taskReducer } from './core/store/reducers/tasks.reducers';
import { TasksEffects } from './core/store/effects/tasks.effects';
import { pointReducer } from './core/store/reducers/points.reducers';
import { PointsEffects } from './core/store/effects/points.effects';

export function httpTranslateLoader(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(new HttpClient(httpBackend));
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({
      user: userReducer,
      boards: boardReducer,
      columns: columnReducer,
      tasks: taskReducer,
      points: pointReducer,
    }, {}),
    EffectsModule.forRoot([UserEffects, BoardsEffects, ColumnsEffects, TasksEffects, PointsEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    MatDialogModule,
    MatSnackBarModule,
    TranslateModule.forRoot({
      defaultLanguage: currentLang,
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpBackend],
      },
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
