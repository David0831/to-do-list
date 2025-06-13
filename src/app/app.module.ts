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
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
