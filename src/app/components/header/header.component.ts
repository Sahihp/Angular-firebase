import { Component, OnInit , ElementRef , ViewRef , Renderer2 } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
  	private auth : AngularFireAuth,
  	private router : Router,
    private ele : ElementRef,
    private ren : Renderer2
  ) { }

  ngOnInit() {
    window['ele'] = this.ele;
    window['ren'] = this.ren;
  }

  logout(){
  	console.log('logout');

  	localStorage.clear();
  	// this.router.navigate(['login']);
  	window.location.reload();
  }

}
