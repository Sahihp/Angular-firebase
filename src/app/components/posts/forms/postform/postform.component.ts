import { Component, OnInit , EventEmitter , Output } from '@angular/core';
import { FormGroup , FormControl , FormBuilder , Validators } from '@angular/forms';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.scss']
})
export class PostformComponent implements OnInit {

	  postForm : FormGroup;
	  submitting : boolean = false;
    selRef: any;
    submitEvent = new EventEmitter();
    formAction:any;
    editData:any;
    winTitle:string = 'Add post';
    btnText : string = 'Add';

  	constructor(
  		private fb : FormBuilder
  	) { }

  	ngOnInit() {

  		this.postForm = this.fb.group({
  			title: ['' , Validators.required],
  			description : ['']
  		});

      if ( this.formAction == 'edit' ){
        this.winTitle = 'Edit post';
        this.btnText = 'Update';

        this.postForm.setValue({
          title : this.editData.title,
          description : this.editData.description
        });
      }

  	}

  	formSubmit(){

  		if ( this.postForm.valid ){
  			const values = {

  				...this.postForm.value,
  				created_by : localStorage.getItem('token')
  			};

        this.submitEvent.next(values);

  			this.submitting = true;

  		}
  	}

  	destroyForm(){
      this.selRef.destroy();
  	}

    formWindowClicked(e){
      if ( e.target.className == 'postWindow' ){
        this.destroyForm();
      }
    }

}
