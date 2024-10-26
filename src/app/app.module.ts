import { CUSTOM_ELEMENTS_SCHEMA, NgModule, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from 'src/environments/environment.prod';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    HttpClientModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AppRoutingModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements OnInit {
  ngOnInit() {
    this.loadGoogleMapsApi();
  }

  loadGoogleMapsApi() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleApiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      console.log('Google Maps API loaded');
    };
    document.head.appendChild(script);
  }
}
