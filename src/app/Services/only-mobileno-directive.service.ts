import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MaxLengthValidator, NgControl, Validators } from '@angular/forms';

import { max } from 'rxjs';
import Swal from 'sweetalert2';

@Directive({
  selector: '[numbersOnly10digit]'
})
export class OnlyMobilenoDirectiveService {

  constructor(private _el: ElementRef) {

   }

  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
    const initalValue = this._el.nativeElement.value; 
    

    this._el.nativeElement.value = initalValue.replace(/[^0-9,]*/g, '' );
    if ( initalValue !== this._el.nativeElement.value) {
     
       event.stopPropagation();
     
    }
    return false;
  }

 
}