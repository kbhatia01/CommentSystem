import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';

import { ApiService } from './Api/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { HomepageComponent } from './homepage/homepage.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    // Routes
    RouterModule.forRoot([
      {
        // if path is empty redirect to home
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      },
      { //home page path       
         path: 'home',
        component: HomepageComponent
      },
    ], { useHash: false })
  ],

  providers: [
    ApiService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
