import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  	selector: 'app-signup',
  	templateUrl: './signup.component.html',
  	styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  	form : FormGroup;
  	constructor(
  		private fb : FormBuilder,
  		private router : Router,
  		private fs : AngularFirestore,
  		private auth : AngularFireAuth
  	) { }

  	ngOnInit() {
  		this.setFormControl();
  	}

  	setFormControl(){
  		this.form = this.fb.group({
  			name : ['' , Validators.required ],
  			phone : ['' , Validators.compose([ Validators.required , Validators.minLength(10) ]) ],
  			address : ['' , Validators.required ],
  			email : ['' , Validators.required ],
  			password : ['' , Validators.compose([ Validators.required , Validators.minLength(6) ])],
  		});
  	}

  	onFormSubmit(){
  		console.log(this.form.valid);

  		window['fs'] = this.auth;

  		this.auth.auth.signInWithEmailAndPassword('firsstuser@ang.com', '123456')
  		.then((res) => {
  			console.log(res);
  		})
  		.catch((e)=>{
  			console.log(e);
  		})
  	}

  	goToLogin(){
  		this.router.navigate(['login']);
  	}

}
