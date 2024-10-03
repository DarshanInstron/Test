import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuInfo } from '../header/header.component';
import { faFireFlameCurved, faIndianRupeeSign , faBolt , faWater , faWind , faBars , faChevronDown} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  @Input()
  items!: MenuInfo[];
  @ViewChild('childMenu') public childMenu: any;
  faChevronDown = faChevronDown;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  CheckIsCustomPageUrlOrNot(objMenuInfo: any) {
    if (objMenuInfo.IsCustomMenu == "1") {
      sessionStorage.setItem('SessionIsCustomMenu', objMenuInfo.IsCustomMenu);
      sessionStorage.setItem('SessionMenuId', objMenuInfo.MenuId);
      sessionStorage.setItem('SessionParentMenuId', objMenuInfo.ParentMenuId);
    }
    else {
      sessionStorage.removeItem('SessionIsCustomMenu');
      sessionStorage.removeItem('SessionMenuId');
      sessionStorage.removeItem('SessionParentMenuId');
    }

    if (this.router.url == objMenuInfo.Url) {
      this.router.navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate([objMenuInfo.Url]));
    }
    else {
      this.router.navigate([objMenuInfo.Url]);
    }
  }
}
