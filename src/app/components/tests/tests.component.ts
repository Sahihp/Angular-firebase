import { 
	Component, 
	OnInit,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver
} from '@angular/core';

import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss']
})
export class TestsComponent implements OnInit {

    showDirective : boolean = false;

    @ViewChild( 'homeref' , { read : ViewContainerRef } ) componentContainer : ViewContainerRef;

  	constructor(
      private resolver : ComponentFactoryResolver
  	) { }

  	ngOnInit() {
  	}

  	onButtonClick(){
  		this.createHome();
  	}

  	createHome(){

      const factory = this.resolver.resolveComponentFactory(HomeComponent);

      let home = this.componentContainer.createComponent(factory);
      home.instance.testInstance = this.componentContainer.length;
  	}

  	destroyHome(){
        const length = this.componentContainer.length;
        const home = this.componentContainer.get(length-1);
        if ( home ){
          home.destroy();
        }
  	}	

    toggleDirective(){
      this.showDirective = !this.showDirective;
    }

}
