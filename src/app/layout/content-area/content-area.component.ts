import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-content-area',
  templateUrl: './content-area.component.html',
  styleUrls: ['./content-area.component.css']
})
export class ContentAreaComponent implements OnInit {

  constructor(public layoutService:LayoutService) { }
  


  ngOnInit(): void {
  }

}
