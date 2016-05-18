import {Component} from '@angular/core';
import {Observable} from 'rxjs/Observable';
@Component({
    selector: 'my-app',
    template: '<h1>My First Angular 2 App says {{message}}</h1>'
})
export class AppComponent { 
    //clock = Observable.interval(100);
    message = 'hi hi!';
}
