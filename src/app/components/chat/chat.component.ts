import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

	selectedChat:any;
	showEmptyScreen:boolean = false;
	isLoading:boolean = true;
	chats:any = [];
	showUers:boolean = false;
	users:any = [];

  constructor(
  	private route : ActivatedRoute,
  	private store : AngularFirestore,
    private router : Router
  ) { }

  ngOnInit() {

  	console.log(this.route.snapshot);

  	if ( this.route.snapshot.firstChild ){
  		this.selectedChat = this.route.snapshot.firstChild.params.chatId;
  	}

  	// this.store.collection('chat').snapshotChanges().subscribe(( res )=>{
    this.store.collection('chat' , ref => ref.where("users" , 'array-contains' , localStorage.getItem('token'))).snapshotChanges().subscribe(( res )=>{
  		this.chats = res.map((postsData) => {
  			return {
  				...postsData.payload.doc.data(),
  				id : postsData.payload.doc.id
  			}
        
  		});
  	});


  	this.store.collection('users').valueChanges().subscribe((people)=>{
  		this.users = people.filter((user:any) => {
  			return user.uid != localStorage.getItem('token');
  		});

  		console.log(this.users);
  	});

  }

  hideModel(){
  	this.showUers = false;
  }

  showModel(){
  	this.showUers = true;
  }

  onUseClick(user){
    console.log(user);
  }

  onChatClick(chatId){
    this.router.navigate([`chat/${chatId}`]);
  }

}
