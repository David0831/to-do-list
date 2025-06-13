import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CategoriesModalComponent } from './components/categories-modal/categories-modal.component';
import { CategoryFormModalComponent } from './components/category-form-modal/category-form-modal.component';
import { TaskFormModalComponent } from './components/task-form-modal/task-form-modal.component';
import { AngularFireModule } from '@angular/fire/compat';
import {
  AngularFireRemoteConfigModule,
  DEFAULTS,
  SETTINGS,
} from '@angular/fire/compat/remote-config';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesModalComponent,
    CategoryFormModalComponent,
    TaskFormModalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireRemoteConfigModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: SETTINGS,
      useValue: {
        minimumFetchIntervalMillis: environment.production ? 3600000 : 10000,
      },
    },
    {
      provide: DEFAULTS,
      useValue: {
        showCategories: true,
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
