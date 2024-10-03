import { Injectable } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NG_VALIDATORS, ValidationErrors, Validators } from '@angular/forms';

@Directive({
  selector: '[appEmailId]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EmailIdService, multi: true }]
})
export class EmailIdService {
  //public static emailtext:any="[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}";
  public static emailtext:any="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public static pawvalidation:any="/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/";
  constructor(private _el: ElementRef) { }


  
}



