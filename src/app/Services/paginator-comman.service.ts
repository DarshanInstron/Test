import { Directive, ElementRef, HostListener, Injectable } from '@angular/core';


@Directive({
  selector: '[abc]'
})
export class PaginatorCommanService {

  constructor(private _el: ElementRef) { }


  @HostListener('input', ['$event']) onInputChange(event: { stopPropagation: () => void; }) {
    const initalValue = this._el.nativeElement.value;
  var pageSizeOptions;
  pageSizeOptions=[5,10.15]
  }











}
