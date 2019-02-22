import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

import { CoreModule } from '../../core.module';
import { TransferStateService } from '../transfer-state/transfer-state.service';

interface PayloadDefinition {
    payload: {
        addTagsExecuted?: boolean;
        updateTagExecuted?: boolean;
        removeTagExecuted?: boolean;
    };
}

@Injectable({
    providedIn: CoreModule,
})
export class DocumentMetaService {
    private payloadServerName = 'DocumentMetaServicePayload';

    constructor(private metaService: Meta, private transferStateService: TransferStateService) {}

    public addTags(tags: MetaDefinition[], forceCreation: boolean = false): void {
        this.transferStateService
            .savePayload(
                () =>
                    new Promise(resolve => {
                        this.metaService.addTags(tags, forceCreation);
                        const payload = { addTagsExecuted: true };

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

    public removeTags(attrSelectors: string[]): void {
        this.transferStateService
            .savePayload(
                () =>
                    new Promise(resolve => {
                        attrSelectors.map((attrSelector: string) => this.removeTag(attrSelector));
                        const payload = { removeTagsExecuted: true };

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

    private removeTag(attrSelector: string): void {
        this.metaService.removeTag(attrSelector);
    }
}
