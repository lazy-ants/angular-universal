import { Inject, Injectable, Optional } from '@angular/core';
import { RESPONSE } from '@nguniversal/express-engine/tokens';

import { CoreModule } from '../../core.module';
import { TransferStateService } from '../transfer-state/transfer-state.service';

interface PayloadDefinition {
    payload: {
        setStatusExecuted: boolean;
    };
}

@Injectable({
    providedIn: CoreModule,
})
export class HttpResponseStatusService {
    private payloadServerName = 'HttpResponseStatusServicePayload';

    constructor(
        @Optional()
        @Inject(RESPONSE)
        private res: any,
        private transferStateService: TransferStateService
    ) {}

    public setStatus(code: number, message: string): void {
        this.transferStateService
            .savePayload(
                () =>
                    new Promise(resolve => {
                        if (this.res) {
                            this.res.statusCode = code;
                            this.res.statusMessage = message;
                        }

                        const payload = { setStatusExecuted: true };

                        resolve({ payload });
                    }),
                this.payloadServerName
            )
            .then(
                (payload: PayloadDefinition) => {
                    // payload received
                },
                error => {
                    // error while receiving payload
                }
            );
    }
}
