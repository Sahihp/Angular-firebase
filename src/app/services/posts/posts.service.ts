import { Injectable , EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

	selService = new EventEmitter();

  	constructor() { }


  	changeState(id){

  		this.selService.emit(id);

  	}
}
