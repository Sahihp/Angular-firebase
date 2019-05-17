import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	testInstance:any = "";
	anotherVar:any = "";
  constructor() { }

  ngOnInit() {
  }

  test(){
  	console.log('test function called.');
  }

}
