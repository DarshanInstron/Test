import { Component, Input } from '@angular/core';




@Component({
  selector: 'app-newmeter',
  templateUrl: './newmeter.component.html',
  styleUrls: ['./newmeter.component.scss']
})
export class NewmeterComponent {

  @Input() speed!: number; // Marking speed as optional using the '!' operator

  get needleRotation(): number {
    // Calculate the rotation angle based on the speed value
    // Adjust the calculation based on your specific speedometer design
    return this.speed * 1.8 - 90;
  }
  

}
