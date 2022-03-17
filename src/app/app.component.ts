import { Component } from '@angular/core';
import { LayoutService } from './layout/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'karunashraya-layout';

  public flag:boolean = false;

  constructor(public layoutService:LayoutService){}
}
