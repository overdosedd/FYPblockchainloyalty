import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginService } from './_services/login.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
// tslint:disable-next-line:max-line-length
import { MDBBootstrapModule, WavesModule, DropdownModule, ButtonsModule, InputsModule, IconsModule, CheckboxModule, CollapseModule, TooltipModule, PopoverModule, NavbarModule, ModalModule } from 'angular-bootstrap-md';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2OwlCarouselComponent } from 'ng2-owl-carousel2';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { Ng5SliderModule } from 'ng5-slider';
// import {MatCardModule} from '@angular/material/card';
import { PaginationModule } from 'ngx-bootstrap';
import { ProducttypeComponent } from './producttype/producttype.component';
import { MatSelectModule } from '@angular/material';
import { NumberPickerModule } from 'ng-number-picker';
import { MatTabsModule } from '@angular/material/tabs';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { ShoppingcartServiceService } from './_services/shoppingcart-service.service';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ProfileComponent } from './profile/profile.component';
import { TabsModule } from 'ngx-bootstrap';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { OrdersComponent } from './orders/orders.component';
import { AddressbookService } from './_services/addressbook.service';
import { EditaddressComponent } from './editaddress/editaddress.component';
import { DeleteaddressComponent } from './deleteaddress/deleteaddress.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { OrdersService } from './_services/orders.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { MatStepperModule } from '@angular/material/stepper';
// tslint:disable-next-line:max-line-length
import { MatInputModule, MatTableModule, MatCheckboxModule, MatIconModule, MatListModule, MatToolbarModule, MatCardModule, MatButtonModule, MatSidenavModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AlertService } from './_services/alert.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './_services/authentication.service';
import { ProductService } from './_services/product.service';
import { ProductCategoryService } from './_services/product-category.service';
import { SharedService } from './_services/shared.service';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidebarModule } from 'ng-sidebar';
import { PagerService } from './_services/pager.service';
import {MatRadioModule} from '@angular/material/radio';
import { NgxPayPalModule } from 'ngx-paypal';
import { ElectronicsComponent } from './electronics/electronics.component';
import { BigChainDBService } from './_services/big-chain-db.service';
import { LoyaltyComponent } from './loyalty/loyalty.component';
import {DatePipe} from '@angular/common';





// import { JwtInterceptor, ErrorInterceptor } from './_helpers';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    Ng2OwlCarouselComponent,
    ProductcategoryComponent,
    ProducttypeComponent,
    ShoppingcartComponent,
    ProfileComponent,
    ChangepasswordComponent,
    OrdersComponent,
    EditaddressComponent,
    DeleteaddressComponent,
    CheckoutComponent,
    LoginComponent,
    SignupComponent,
    SidemenuComponent,
    ElectronicsComponent,
    LoyaltyComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    MDBBootstrapModule.forRoot(),
    CarouselModule,
    Ng5SliderModule,
    MatSelectModule,
    PaginationModule.forRoot(),
    // MatCardModule
    BrowserAnimationsModule,
    WavesModule.forRoot(),
    DropdownModule,
    NumberPickerModule,
    ReactiveFormsModule,
    MatTabsModule,
    ButtonsModule,
    CheckboxModule,
    AngularFontAwesomeModule,
    TabsModule.forRoot(),
    CollapseModule,
    GooglePlaceModule,
    BrowserModule,
    MatStepperModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    TooltipModule,
    PopoverModule,
    InputsModule, IconsModule,
    HttpClientModule,
    NavbarModule,
    MatSidenavModule,
    SidebarModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxPayPalModule



  ],
  exports: [MatSelectModule],
  // tslint:disable-next-line:max-line-length
  providers: [LoginService, ShoppingcartServiceService, AddressbookService, OrdersService, AlertService, AuthenticationService, ProductService, ProductCategoryService, SharedService, PagerService, BigChainDBService, DatePipe],
  // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }, ],
  bootstrap: [AppComponent],
  entryComponents: [
    ChangepasswordComponent,
    EditaddressComponent,
    LoginComponent,
    SignupComponent
  ]
})

export class AppModule { }
