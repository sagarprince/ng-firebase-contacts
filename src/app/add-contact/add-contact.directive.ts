import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { ViewContainerRef } from '@angular/core';

import { AddContactComponent } from './add-contact.component';

@Directive({ 
  selector: '[addContact]'
})

export class AddContactDirective {

    private addContactComponentRef: any = null;

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) { }

    open(contactsList): void {
        this.viewContainer.clear();

        let addContactComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AddContactComponent);
        this.addContactComponentRef = this.viewContainer.createComponent(addContactComponentFactory);

        this.addContactComponentRef.instance.contactsList = contactsList; 

        this.addContactComponentRef.instance.modalHide.subscribe(() => {
            this.addContactComponentRef.destroy();
        });
    }
    
}