import { Component, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from "rxjs/Observable";

import { FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase'; 

import { Contact } from '../models/contact.model';

declare var $;

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss'],
  animations: [
    trigger(
      'slideRightAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ]
})
export class AddContactComponent {

  @Input() contactsList: FirebaseListObservable<Contact[]> = null;

  modalHide = new EventEmitter();

  addContactForm: FormGroup = null;

  profileImage: string = 'https://robohash.org/absitaut.png?size=50x50&set=set1';

  uploadProgress: number = 0;

  uploadStart: boolean = false;

  @ViewChild('profileImageEl') profileImageEl: ElementRef = null;

  constructor(private formBuilder: FormBuilder) {
    this.addContactForm = this.formBuilder.group({
      fullName: new FormControl('', [Validators.required]),
      mobileNumber: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/\d{3}[-.]?\d{3}[-.]?\d{4}/)])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.pattern(/\S+@\S+\.\S+/)])),
      jobTitle: new FormControl('', [Validators.required]),
      profileImage: new FormControl('https://robohash.org/absitaut.png?size=50x50&set=set1', [Validators.required]),
      address: new FormControl('')
    });
  }

  ngAfterContentInit() {   
    $('#modal-add-contact').modal();

    $('#modal-add-contact').on('hidden.bs.modal', () => {
      this.modalHide.emit('hide');
    });  
  }

  openProfileImageUpload() {
    this.profileImageEl.nativeElement.click();
  }

  uploadProfileImage(event) {    
    let selectedFile = this.profileImageEl.nativeElement.files[0]; 

    let selectedImage = selectedFile.name;

    if (/\.(jpe?g|png|gif)$/i.test(selectedImage)) {
      let storageRef = firebase.storage().ref();
   
      let path = '/profile-images/' + selectedImage;
      var iRef = storageRef.child(path);

      let uploadTask = iRef.put(selectedFile);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) =>  {
          // upload in progress
          this.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;         
          this.uploadStart = true; 
        },
        (error) => {
          // upload failed
          alert(error);
        },
        () => {
          // upload success
          this.profileImage = uploadTask.snapshot.downloadURL;
          this.addContactForm.controls['profileImage'].setValue(this.profileImage);

          setTimeout(() => {
            this.uploadStart = false;
          }, 1000);
        }
      );
    } else {
      alert('Please select valid image file.');
    }
  }

  addContact({ value, valid }: { value: any, valid: boolean }) {           
    if (!valid) {
      this.addContactForm.markAsDirty();
    } else {
      this.addContactForm.markAsPristine();
      
      this.contactsList.push({
        full_name: value.fullName,
        email: value.email,
        mobile: value.mobileNumber,
        job_title: value.jobTitle,
        address: value.address,
        profile_image: value.profileImage
      });

      $('#modal-add-contact').modal('hide');
    }
  }

}
