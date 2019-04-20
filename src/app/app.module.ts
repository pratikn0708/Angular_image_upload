import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { TestComponent } from './test/test.component';
import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
  
  const fbConfig = {
    apiKey: 'AIzaSyBKK_OXg1UUMGuy1geOiRW41hilUmz-zg4',
        authDomain: 'uploadfilesusingfirebase.firebaseapp.com',
        databaseURL: 'https://uploadfilesusingfirebase.firebaseio.com',
        projectId: 'uploadfilesusingfirebase',
        storageBucket: 'uploadfilesusingfirebase.appspot.com',
        messagingSenderId: '522209542559'
  }
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(fbConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
