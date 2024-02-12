import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MultiFormatReader,BarcodeFormat  } from '@zxing/library'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { GoogleMapsModule } from '@angular/google-maps'
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    NgbModule,
    GoogleMapsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
