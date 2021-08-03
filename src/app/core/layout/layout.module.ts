import { ChatComponent } from './../component/chat/chat.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FooterComponent } from '../component/footer/footer.component';
import { HeaderComponent } from '../component/header/header.component';
import { SidebarComponent } from '../component/sidebar/sidebar.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ChatComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NgbModule,
    FontAwesomeModule,
  ],
  entryComponents: []
})
export class LayoutModule {
  constructor() {

  }
}
