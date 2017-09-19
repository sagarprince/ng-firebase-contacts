import { Component, ViewChild } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { LoaderDirective } from './utitlity/loader';

import { EditContactDirective } from './edit-contact/edit-contact.directive';

import { AddContactDirective } from './add-contact/add-contact.directive';

import { Contact } from './models/contact.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {  

  contactsList: FirebaseListObservable<Contact[]>;

  allContacts: Array<any> = [];

  contacts: Array<any> = [];

  alphabets: any = [];

  allActive: boolean = true;

  currentAlphanet: string = '';

  @ViewChild(LoaderDirective) loader: LoaderDirective;

  @ViewChild(EditContactDirective) editContact: EditContactDirective;  

  @ViewChild(AddContactDirective) addContact: AddContactDirective;

  constructor(private firebaseDb: AngularFireDatabase) {
       
  }

  ngOnInit() {   
    this.buildAlphabetsFilterNav();
    this.loadContacts();
  }

  buildAlphabetsFilterNav() {
    for (var i = 65; i <= 90; i++) {
        this.alphabets.push({
          active: false,
          char: String.fromCharCode(i)
        });
    }
  }

  loadContacts() {   
    this.loader.open();

    this.contactsList = this.firebaseDb.list('/contacts', {
      query: {
        orderByChild: 'full_name'
      }
    });    

    this.contactsList.subscribe((items) => {    
      this.contacts = items; 
      this.allContacts = items; 
      this.loader.close();
      this.filterByAlphabets(this.currentAlphanet);
    });
  }

  setAlphabetActive(activeAlphabet) {
    this.alphabets.map((item) => {
      if (activeAlphabet === item.char) {
        item.active = true;
      } else {
        item.active = false;
      }
    });

    this.currentAlphanet = activeAlphabet;
  }

  filterByAlphabets(alphabet: string = '') {
    if (alphabet !== '') {      
      this.contacts = this.allContacts.filter((contact) => {
        return contact.full_name.charAt(0).toUpperCase() === alphabet        
      });

      this.allActive = false; 
    } else {      
      this.contacts = this.allContacts;
      this.allActive = true;
    }

    this.setAlphabetActive(alphabet);
  }

  openAddContact() {
    this.addContact.open(this.contactsList);
  }

  openEditContact(contact: any) {
    this.editContact.open(contact, this.contactsList);
  }

}
