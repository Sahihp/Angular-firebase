import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { PostsService } from '../../services/posts/posts.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {

	commentsSubscriber : any;
	comments:any[];
	test:boolean = false;
	loadingMsg:string = 'Loading comments';
	noCommentsMsg : string = 'No comments to display';
	emptyMsg:string;
	showWindow : boolean = false;
  postId:any;

  	constructor( 
  		private ar : ActivatedRoute,
  		private store : AngularFirestore,
      private service : PostsService

  	) { }

  	ngOnInit() {
  		this.ar.params.subscribe((param) => {
  			this.loadComments(param.id);
        this.postId = param.id;

        this.service.changeState(this.postId);
  		});
  	}

  	loadComments( id ){
  		this.comments = [];
  		this.emptyMsg = this.loadingMsg;

  		if ( this.commentsSubscriber ){
  			this.commentsSubscriber.unsubscribe();
  		}

  		
		this.commentsSubscriber = this.store.collection('comments' , ref => ref.where('postId' , '==' , id))
  		.snapshotChanges().subscribe((resArray) => {
  			this.comments = resArray.map(commentData => {
  				return {
  					...commentData.payload.doc.data(),
  					id : commentData.payload.doc.id
  				}
  			});

  			if ( this.comments.length == 0 ){
  				this.emptyMsg = this.noCommentsMsg;
  			}
  		});

  		
  	}

    openFormWindow(){
      this.showWindow = true;
    }

    closeCommentForm(){
        this.showWindow = false;
    }

    addCommentToStore(values){
        const obj = {
          ...values,
          postId:this.postId,
          created_by:localStorage.getItem('token')
        };

        this.store.collection('comments').add(obj).then(() => {
          this.closeCommentForm();
        });
    }
}
