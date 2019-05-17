import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginService } from '../../services/auth/login.service';

@Component({
  	selector: 'app-signup',
  	templateUrl: './signup.component.html',
  	styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  	form : FormGroup;
  	errorMsg : string;
  	resError : boolean = false;
  	sendingRequest : boolean = false;

  	constructor(
  		private fb : FormBuilder,
  		private router : Router,
  		private fs : AngularFirestore,
  		private auth : AngularFireAuth,
  		private loginService : LoginService
  	) { 

  		if ( localStorage.getItem('token') ){
  			console.log('token exist');
            this.router.navigate(['']);
        }
  	}

  	ngOnInit() {
  		this.setFormControl();
  	}

  	setFormControl(){
  		this.form = this.fb.group({
  			email : ['' , Validators.email ],
  			password : ['' , Validators.compose([ Validators.required , Validators.minLength(6) ])],
  		});
  		/*this.form = this.fb.group({
  			name : ['' , Validators.required ],
  			phone : ['' , Validators.compose([ Validators.required , Validators.minLength(10) ]) ],
  			address : ['' , Validators.required ],
  			email : ['' , Validators.required ],
  			password : ['' , Validators.compose([ Validators.required , Validators.minLength(6) ])],
  		});*/
  	}

  	onFormSubmit(){
  		console.log('submit');
  		if ( this.form.valid ){
  			console.log('valid');

  			const { email , password } = this.form.value;

	  		this.sendingRequest = true;
	  		this.resError = false;
	  		this.errorMsg = "";
	  		this.loginService.fromSignup = true;

	  		this.auth.auth.createUserWithEmailAndPassword( email , password )
	  		.then(res => {
	  			this.sendingRequest = false;
	  			this.router.navigate(['login']);

          this.fs.collection('users').add({
            id : res.user.uid,
            email
          });

	  		})
	  		.catch(e => {
	  			console.log(e);
	  			this.resError = true;
	  			this.errorMsg = e.message;
	  			this.sendingRequest = false;
	  		});
  		}
  	}

  	goToLogin(){
  		this.router.navigate(['login']);
  	}

}
