import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductcategoryComponent } from './productcategory/productcategory.component';
import { ProducttypeComponent } from './producttype/producttype.component';
import { ShoppingcartComponent } from './shoppingcart/shoppingcart.component';
import { ProfileComponent } from './profile/profile.component';
import { OrdersComponent } from './orders/orders.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SignupComponent } from './signup/signup.component';
import { ElectronicsComponent } from './electronics/electronics.component';
import { AuthGuard } from './_guards';
import { LoyaltyComponent } from './loyalty/loyalty.component';

const routes: Routes = [
  { path: 'home/electronics', component: ElectronicsComponent },
  { path: 'home/orders', component: OrdersComponent },
  { path: 'home/profile/:userId', component: ProfileComponent },
  { path: 'home/shopping_cart/checkout', component: CheckoutComponent },
  { path: 'home/shopping_cart/checkout/:customer_id', component: CheckoutComponent },
  { path: 'home/shopping_cart', component: ShoppingcartComponent },
  { path: 'home/shopping_cart/:customer_id', component: ShoppingcartComponent },
  // { path: 'home/shopping_cart', component: ShoppingcartComponent },
  { path: 'home/product_category/product_type/:id', component: ProducttypeComponent },
  { path: 'home/product_category', component: ProductcategoryComponent },
  { path: 'home/loyalty_point', component: LoyaltyComponent },
  { path: 'home/signup', component: SignupComponent, data: { title: 'Add Users' } },
  // { path: 'home/login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'home/login', component: LoginComponent, data: { title: 'All Users' } },
  // {path:  'home/login', component: LoginComponent,  outlet: 'modal'},
  { path: 'home/:id', component: HomeComponent },
  { path: 'home', component: HomeComponent },



  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
