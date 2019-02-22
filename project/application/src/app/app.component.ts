import { Component } from '@angular/core';

import { ServerAnimationService } from './modules/core/services/server-animation/server-animation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'Welcome to angular ssr app!';

    constructor(public serverAnimationService: ServerAnimationService) {}
}
