import { Component, OnInit , Output , EventEmitter } from '@angular/core';
import { FormGroup , FormBuilder , Validators } from '@angular/forms' ;

@Component({
  selector: 'app-commentsform',
  templateUrl: './commentsform.component.html',
  styleUrls: ['./commentsform.component.scss']
})
export class CommentsformComponent implements OnInit {

  @Output() closeForm =new EventEmitter();
  @Output() addComment = new EventEmitter();

	commentForm:FormGroup;

  	constructor(
  		private fb : FormBuilder
  	) { }

  	ngOnInit() {

  		this.commentForm = this.fb.group({
  			title : ['' , Validators.required]
  		});
  	}


    destroyForm(){
      this.closeForm.emit();
    }

    formWindowClicked(e){
      if ( e.target.className == 'commentWindow' ){
        this.destroyForm();
      }
    }

    onFormSubmit(){

      if ( this.commentForm.valid ){
          const values = this.commentForm.value;
          this.addComment.emit(values);
      }

    }

}
