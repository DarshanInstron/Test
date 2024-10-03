import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[alphabetOnly]'
})
export class OnlyAlphabetDirectiveService {
  public static alphabetlimit:any="50";
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
    const initalValue = this._el.nativeElement.value;
    
    //this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z,]*/g, '');
    this._el.nativeElement.value = initalValue.replace(/[^a-zA-Z,0-9]*/g, '');
    if ( initalValue !== this._el.nativeElement.value) {
      
      event.stopPropagation();
    }
  }
}
