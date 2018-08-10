import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';
import { UserComponent } from './user/user.component';
import { UpdateButtonComponent } from './update-button/update-button.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { APP_CONFIG, appConfig } from './app.config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppMaterialModule } from './app.material';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserInfoComponent,
    UserPaymentComponent,
    UpdateButtonComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    HttpModule,
    BsDropdownModule.forRoot()
  ],
  providers: [
    { provide: APP_CONFIG, useValue: appConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
