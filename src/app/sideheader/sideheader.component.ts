import { Component, OnInit } from '@angular/core';

import { faAtom,faChartSimple,faUser,faGears,faTv,faK,faR, faUserPlus,faM } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sideheader',
  templateUrl: './sideheader.component.html',
  styleUrls: ['./sideheader.component.scss']
})
export class SideheaderComponent implements OnInit {

  faAtom=faAtom;
  faChartSimple=faChartSimple;
  faGears=faGears;
  faTv=faTv;
  faK=faK;
  faR=faR;
  faUser=faUser;
  faUserPlus=faUserPlus;
  faM=faM;
  LeftSideTreeviewHeight:string="";


  ngOnInit(): void {
    var h = window.innerHeight;
    this.LeftSideTreeviewHeight = (h - 100) + "px";
  }
  


}
