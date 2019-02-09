import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { RouterModule , Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'; 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth'; 

import { AuthguardService } from './services/auth/authguard.service'; 

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { PostsComponent } from './components/posts/posts.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { MainComponent } from './components/main/main.component';
import { HeaderComponent } from './components/header/header.component';

const routes:Routes = [
	{ path : '' , component : MainComponent , canActivate : [AuthguardService],
  children:[
    { path : 'home' , component : HomeComponent },
    { path : "posts" , component : PostsComponent ,
      children : [
        { path : ':id' , component : PostDetailComponent }
      ]
    }
  ]
  },
	{ path : "login" , component : LoginComponent },
	{ path : "signup" , component : SignupComponent },
	{
		path:'**' , redirectTo:''
	}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    PostsComponent,
    PostDetailComponent,
    MainComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
    AngularFirestoreModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
