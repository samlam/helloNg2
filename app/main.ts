import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';

bootstrap(AppComponent).then(
    ()=> console.log('AppComponent running ...'),
    err=> console.log(err)
);
