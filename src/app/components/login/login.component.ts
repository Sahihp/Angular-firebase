import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { FormGroup , Validators , FormControl , FormBuilder } from '@angular/forms'; 
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  	selector: 'app-login',
  	templateUrl: './login.component.html',
  	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    fromSignup:boolean = false;
    resError : boolean = false;
    resMsg : string;
    sendingRequest:boolean = false;

    form : FormGroup;

  	constructor(
  		private router : Router,
        private loginService : LoginService,
        private fb : FormBuilder,
        private auth : AngularFireAuth,
        private store : AngularFirestore
  	) {

        if ( localStorage.getItem('token') ){
            this.router.navigate(['']);
        }

    }

  	ngOnInit() {

        this.fromSignup = this.loginService.fromSignup;

        this.form = this.fb.group({
            email : ['' , Validators.email ],
            password : ['' , Validators.compose( [ Validators.required , Validators.minLength(6) ] )]
            // password : ['' , Validators.required]
        });

        window['store'] = this.store;
  	}

    login(){

        if ( this.form.valid ){
            const { email , password } = this.form.value;
            console.log('valid');

            this.sendingRequest = true;

            this.auth.auth.signInWithEmailAndPassword( email , password )
            .then((res) => {
                localStorage.setItem( 'token' , res.user.uid );
                this.router.navigate(['']);
            })
            .catch((e)=>{
                this.sendingRequest = false;
                this.resError = true;
                this.resMsg = e.message;

            });
        }
    }

  	goToSignup(){
  		this.router.navigate(['signup']);
  	}

    ngOnDestroy(){
        this.loginService.fromSignup = false;
    }

}
