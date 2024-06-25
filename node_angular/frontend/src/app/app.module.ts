import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { DataComponent } from './data/data.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiServiceService } from './service/api-service.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, UserComponent, DataComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [ApiServiceService],
  bootstrap: [AppComponent],
})
export class AppModule {}
