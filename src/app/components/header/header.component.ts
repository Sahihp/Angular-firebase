import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
  	private auth : AngularFireAuth,
  	private router : Router
  ) { }

  ngOnInit() {
  }

  logout(){
  	console.log('logout');

  	localStorage.clear();
  	// this.router.navigate(['login']);
  	window.location.reload();
  }

}
