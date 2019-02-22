import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { CoreModule } from '../../core.module';

@Injectable({
    providedIn: CoreModule,
})
export class HttpResponseStatusService {
    constructor(
        @Optional()
        @Inject(RESPONSE)
        private res: any
    ) {}

    public setStatus(code: number, message: string): void {
        if (this.res) {
            this.res.statusCode = code;
            this.res.statusMessage = message;
        }
    }
}
