import { Injectable } from '@angular/core';
import { CanActivate , Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  	constructor(private router : Router ) { }

  	canActivate():any {

  		if ( !localStorage.getItem('token') ){
  			this.router.navigate(['login']);
  			return false;
  		}

  		return false;
  	}

}
