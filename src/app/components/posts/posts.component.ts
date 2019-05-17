import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router , ActivatedRoute } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { ViewChild , ViewContainerRef, ComponentFactoryResolver  } from '@angular/core';
import { PostformComponent } from './forms/postform/postform.component';
import { MenusComponent } from '../menus/menus.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

	posts:any[];
	selectedItem:any;
	all:boolean = false;
	test:any;
	addWindow:any;
	displayWindow:boolean = false;
	showMenu : boolean = false;
	menuX : number = 0;
	menuY : number = 0;
	windowRef:any;
	menu:any;

	@ViewChild('postForm' , { read : ViewContainerRef }) childContainer : ViewContainerRef;
	@ViewChild('menu' , { read : ViewContainerRef }) menuItem : ViewContainerRef;

	constructor(
		private db : AngularFirestore,
		private fa : AngularFireAuth,
		private router : Router,
		private ar : ActivatedRoute,
		private service : PostsService,
		private resolver : ComponentFactoryResolver
	) { }

	ngOnInit() {
		// this.test = this.db.collection('posts' , ref => ref.orderBy('title').startAfter(5).limit(5) ).snapshotChanges()
		this.test = this.db.collection('posts' , ref => ref.where('created_by' , '==' , localStorage.getItem('token') ) ).snapshotChanges()
		.subscribe((arr) => {
			this.posts = arr.map((postsData) => {
				return {
					...postsData.payload.doc.data(),
					id : postsData.payload.doc.id
				}
			});
		});



		if ( this.ar.snapshot.firstChild ){
			this.selectedItem = this.ar.snapshot.firstChild.params.id;
		}

		this.service.selService.subscribe((id)=>{
			this.selectedItem = id;
		});

		window['db'] = this.db;
	}

	onListClick(post){
		this.selectedItem = post.id;
		this.router.navigate([`posts/${this.selectedItem}`]);
	}

	openWindow(action , data){

		// this.displayWindow = true;
		const factory = this.resolver.resolveComponentFactory(PostformComponent);
		this.windowRef = this.childContainer.createComponent(factory);
		this.windowRef.instance.selRef = this.windowRef;

		if ( action == 'edit' ){
			this.windowRef.instance.formAction = 'edit';
			this.windowRef.instance.editData = data;
		}

		this.windowRef.instance.submitEvent.subscribe((value) => {

			if ( action == 'edit' ){
				var obj = {
					title:value.title,
					description : value.description
				};
				this.db.doc('posts/' + data.id).update(obj).then(() => {
					this.windowRef.destroy();
				});
			} else {
				this.db.collection('posts').add(value).then(() => {
					this.windowRef.destroy();
				});	
			}

			
		});
	}

	onClose(){
		this.displayWindow = false;	
	}

	addPost(post){
		this.db.collection('posts').add(post).then((res)=>{
			this.displayWindow = false;
		})
	}

	onRightClick(e , data ){
		e.preventDefault();

		console.log(data);

		if ( this.menu ){
			this.menu.destroy();
		}

		const factory = this.resolver.resolveComponentFactory(MenusComponent);
		this.menu = this.menuItem.createComponent(factory);


		this.menu.instance.clientY = e.clientY + 'px';
		this.menu.instance.clientX = e.clientX + 'px';
		this.menu.instance.menuDataId = data.id
		this.menu.instance.menuEventAction.subscribe(( resObj ) => {
			console.log(resObj);

			this.menu.destroy();
			if ( resObj.action == 'delete' ){
				this.db.doc(`posts/${resObj.id}`).delete();
			} else {
				this.openWindow('edit' , data);
			}

		});

	}
}
