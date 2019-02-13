import { Component, OnInit , EventEmitter , Output } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators } from '@angular/forms';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css']
})
export class PostformComponent implements OnInit {

	@Output() closeForm = new EventEmitter();
	@Output() addPost = new EventEmitter();

	postForm : FormGroup;
	submitting : boolean = false;

  	constructor(
  		private fb : FormBuilder
  	) { }

  	ngOnInit() {

  		this.postForm = this.fb.group({
  			title: ['' , Validators.required],
  			description : ['']
  		});

  	}

  	formSubmit(){

  		if ( this.postForm.valid ){
  			const values = {

  				...this.postForm.value,
  				created_by : localStorage.getItem('token')
  			};

  			this.submitting = true;
  			this.addPost.emit(values);

  		}
  	}

  	destroyForm(){
  		this.closeForm.emit();
  	}

}
