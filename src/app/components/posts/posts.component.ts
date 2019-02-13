import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

	posts:any[];
	selectedItem:any;
	all:boolean = false;
	test:any;
	addWindow:any;
	displayWindow:boolean = false;

	constructor(
		private db : AngularFirestore,
		private fa : AngularFireAuth
	) { }

	ngOnInit() {
		this.test = this.db.collection('posts' , ref => ref.where('created_by' , '==' , localStorage.getItem('token') ) ).snapshotChanges()
		.subscribe((arr) => {
			this.posts = arr.map((postsData) => {
				return {
					...postsData.payload.doc.data(),
					id : postsData.payload.doc.id
				}
			});
		});
	}

	onListClick(post){
		this.selectedItem = post.id;
	}

	openWindow(){

		this.displayWindow = true;
	}

	onClose(){
		this.displayWindow = false;	
	}

	addPost(post){
		this.db.collection('posts').add(post).then((res)=>{
			this.displayWindow = false;
		})
	}
}
