import { Directive, ComponentFactoryResolver, ComponentFactory, ComponentRef } from '@angular/core';

import { ViewContainerRef } from '@angular/core';

import { LoaderComponent } from './loader.component';

@Directive({ 
  selector: '[loader]'
})

export class LoaderDirective {

    private loaderComponentRef: any = null;

    constructor(
        private viewContainer: ViewContainerRef,
        private componentFactoryResolver: ComponentFactoryResolver
    ) {}

    open(): void {
        this.viewContainer.clear();

        let loaderComponentFactory = this.componentFactoryResolver.resolveComponentFactory(LoaderComponent);
        this.loaderComponentRef = this.viewContainer.createComponent(loaderComponentFactory);
    }

    close(): void {        
        this.loaderComponentRef.instance.hide().subscribe(() => {
            this.loaderComponentRef.destroy();
        });        
    }

}