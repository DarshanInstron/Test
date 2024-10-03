import { Injectable } from '@angular/core';
import { Directive, ElementRef, HostListener } from '@angular/core';


@Directive({
  selector: '[appDateTimePicker]'
})
@Injectable({
  providedIn: 'root'
})
export class DateTimePickerService {

  constructor() { }
}
