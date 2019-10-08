import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './layout/footer/footer.component';
import {HeaderComponent} from './layout/header/header.component';
import {AdminHeaderComponent} from './layout/admin-header/admin-header.component';
import {RouterModule} from '@angular/router';
import { AdminFooterComponent } from './layout/admin-footer/admin-footer.component';


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    AdminHeaderComponent,
    AdminFooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule {
}
