import { Component, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { trigger, state, style, animate, transition } from '@angular/animations';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from "rxjs/Observable";

import { FirebaseListObservable } from 'angularfire2/database';

import * as firebase from 'firebase'; 

import { Contact } from '../models/contact.model';

declare var $;

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss'],
  animations: [
    trigger(
      'slideRightAnimation', [
        transition(':enter', [
          style({transform: 'translateX(-100%)', opacity: 1}),
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

export class EditContactComponent {

  @Input() contact: any = null;

  @Input() contactsList: FirebaseListObservable<Contact[]> = null;

  modalHide = new EventEmitter();

  editContactForm: FormGroup = null;

  key: string = '';  
  profileImage: string = '';

  uploadProgress: number = 0;

  uploadStart: boolean = false;

  @ViewChild('profileImageEl') profileImageEl: ElementRef = null;

  constructor(private formBuilder: FormBuilder) { 
      
  }

  ngAfterContentInit() {
    this.setDetails();

    $('#modal-edit-contact').modal();

    $('#modal-edit-contact').on('hidden.bs.modal', () => {
      this.modalHide.emit('hide');
    });    
  }  

  setDetails() {    
    if (this.contact !== null) {
      this.key = this.contact.$key;

      this.editContactForm = this.formBuilder.group({
          fullName: new FormControl(this.contact.full_name, [Validators.required]),
          mobileNumber: new FormControl(this.contact.mobile, Validators.compose([Validators.required, Validators.pattern(/\d{3}[-.]?\d{3}[-.]?\d{4}/)])),
          email: new FormControl(this.contact.email, Validators.compose([Validators.required, Validators.pattern(/\S+@\S+\.\S+/)])),
          jobTitle: new FormControl(this.contact.job_title, [Validators.required]),
          profileImage: new FormControl(this.contact.profile_image, [Validators.required]),
          address: new FormControl(this.contact.address)
      });

      this.profileImage = this.contact.profile_image;
    }
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
          this.editContactForm.controls['profileImage'].setValue(this.profileImage);

          setTimeout(() => {
            this.uploadStart = false;
          }, 1000);
        }
      );
    } else {
      alert('Please select valid image file.');
    }
  }
  
  saveContact({ value, valid }: { value: any, valid: boolean }) {
    if (!valid) {
      this.editContactForm.markAsDirty();
    } else {
      this.editContactForm.markAsPristine();

      this.contactsList.update(this.key, {
        full_name: value.fullName,
        email: value.email,
        mobile: value.mobileNumber,
        job_title: value.jobTitle,
        address: value.address,
        profile_image: value.profileImage
      });

      $('#modal-edit-contact').modal('hide');
    }
  }

  deleteContact() {    
    let r = confirm("Do you really want to delete this contact ?");
    if (r == true) {
      this.contactsList.remove(this.key);
      $('#modal-edit-contact').modal('hide');
    }
  }

}
