import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './core/interceptors/interceptor';
import { SuccessmodalPageModule } from './views/modals/successmodal/successmodal.module';
import { CustomerManagePageModule } from './views/pages/business/customers/customer-manage/customer-manage.module';
import { ProductManagePageModule } from './views/pages/business/products/product-manage/product-manage.module';
import { BrandManagePageModule } from './views/pages/business/brands/brand-manage/brand-manage.module';
import { CategoryManagePageModule } from './views/pages/business/categories/category-manage/category-manage.module';
import { ResponsiveTableModule } from './core/components/responsive-table/responsive-table.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    SuccessmodalPageModule,
    CustomerManagePageModule,
    ProductManagePageModule,
    BrandManagePageModule,
    CategoryManagePageModule,
    ResponsiveTableModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}