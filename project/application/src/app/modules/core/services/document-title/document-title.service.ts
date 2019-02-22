import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CoreModule } from '../../core.module';
import { TransferStateService } from '../transfer-state/transfer-state.service';

interface PayloadDefinition {
    payload: {
        setTitleExecuted: boolean;
    };
}

@Injectable({
    providedIn: CoreModule,
})
export class DocumentTitleService {
    private payloadServerName = 'DocumentTitleServicePayload';

    constructor(private titleService: Title, private transferStateService: TransferStateService) {}

    public setTitle(value: string): void {
        this.transferStateService
            .savePayload(
                () =>
                    new Promise(resolve => {
                        this.titleService.setTitle(value);
                        const payload = { setTitleExecuted: true };

                        resolve({ payload });
                    }),
                this.payloadServerName
            )
            .then(
                (res: PayloadDefinition) => {
                    // payload received
                },
                error => {
                    // error while receiving payload
                }
            );
    }

    public removeTitle(): void {
        this.setTitle('');
    }
}
