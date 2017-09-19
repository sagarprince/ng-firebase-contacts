// Core Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular 2 Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Firebase Config
import { FirebaseConfig } from './app.constants';

// App Component
import { AppComponent } from './app.component';

// Pipes
import { OrderByPipe } from './pipes/order-by.pipe';
import { SafePipe } from './pipes/safe.pipe';

// Components
import { ContactComponent } from './contact/contact.component';

import { EditContactComponent } from './edit-contact/edit-contact.component';
import { EditContactDirective } from './edit-contact/edit-contact.directive';

import { AddContactComponent } from './add-contact/add-contact.component';
import { AddContactDirective } from './add-contact/add-contact.directive';

// Services
import { EmitterService } from './services/emitter.service';

// Utilities
import { LoaderComponent, LoaderDirective } from './utitlity/loader';


@NgModule({
  declarations: [
    AppComponent,

    LoaderComponent,
    LoaderDirective,

    OrderByPipe,
    SafePipe,

    ContactComponent,

    AddContactComponent,
    AddContactDirective,

    EditContactComponent,
    EditContactDirective
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [
    EmitterService
  ],
  entryComponents: [
    LoaderComponent,
    EditContactComponent,
    AddContactComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
