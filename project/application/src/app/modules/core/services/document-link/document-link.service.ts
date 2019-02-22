import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { CoreModule } from '../../core.module';
import { TransferStateService } from '../transfer-state/transfer-state.service';

export declare type LinkDefinition = {
    charset?: string;
    crossorigin?: string;
    href?: string;
    hreflang?: string;
    media?: string;
    rel?: string;
    rev?: string;
    sizes?: string;
    target?: string;
    type?: string;
} & {
    [prop: string]: string;
};

interface PayloadDefinition {
    payload: {
        addTagsExecuted?: boolean;
        removeTagExecuted?: boolean;
    };
}

@Injectable({
    providedIn: CoreModule,
})
export class DocumentLinkService {
    private payloadServerName = 'DocumentLinkServicePayload';

    constructor(@Inject(DOCUMENT) private document, private transferStateService: TransferStateService) {}

    public addTags(tags: LinkDefinition[]): void {
        this.transferStateService
            .savePayload(
                () =>
                    new Promise(resolve => {
                        tags.map((tag: LinkDefinition) => this.addTag(tag));
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

    private addTag(tag: LinkDefinition): void {
        const link: HTMLLinkElement = this.document.createElement('link');
        Object.keys(tag).map((prop: string) => {
            link.setAttribute(prop, tag[prop]);
        });
        this.document.head.appendChild(link);
    }

    private removeTag(attrSelector: string): void {
        const linkTags: HTMLLinkElement[] = this.document.querySelectorAll('link[' + attrSelector + ']');
        for (const link of linkTags) {
            this.document.head.removeChild(link);
        }
    }
}
