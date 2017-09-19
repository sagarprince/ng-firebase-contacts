import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { ViewContainerRef } from '@angular/core';

import { EditContactComponent } from './edit-contact.component';

@Directive({ 
  selector: '[editContact]'
})

export class EditContactDirective {

    private editContactComponentRef: any = null;

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    open(contact, contactsList): void {
        this.viewContainer.clear();

        let editContactComponentFactory = this.componentFactoryResolver.resolveComponentFactory(EditContactComponent);
        this.editContactComponentRef = this.viewContainer.createComponent(editContactComponentFactory);

        this.editContactComponentRef.instance.contact = contact;

        this.editContactComponentRef.instance.contactsList = contactsList;        

        this.editContactComponentRef.instance.modalHide.subscribe(() => {
            this.editContactComponentRef.destroy();
        });
    }
    
}