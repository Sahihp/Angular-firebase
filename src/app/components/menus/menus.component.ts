import { Component, OnInit , EventEmitter } from '@angular/core';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

	clientX:any = '0px';
	clientY:any = '0px';
	menuEventAction = new EventEmitter();
	menuDataId:any;

	items:Array<any> = [
		{ title : 'Edit' , action : 'edit' },
		{ title : 'Delete' , action : 'delete' }
	];

  	constructor() { }

  	ngOnInit() {
  	}

  	onMenuClick(action){
  		this.menuEventAction.emit({ action : action.action , id : this.menuDataId });

  	}

  	onBlur(){
  		console.log('blur....');
  	}

}
