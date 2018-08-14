import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { CoreModule } from '../../core.module';

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

@Injectable({
    providedIn: CoreModule,
})
export class DocumentLinkService {
    constructor(@Inject(DOCUMENT) private document) {}

    public addTag(tag: LinkDefinition): void {
        const link: HTMLLinkElement = this.document.createElement('link');
        Object.keys(tag).map((prop: string) => {
            link.setAttribute(prop, tag[prop]);
        });
        this.document.head.appendChild(link);
    }

    public addTags(tags: LinkDefinition[]): void {
        tags.map((tag: LinkDefinition) => this.addTag(tag));
    }

    public removeTag(attrSelector: string): void {
        const linkTags: HTMLLinkElement[] = this.document.querySelectorAll('link[' + attrSelector + ']');
        for (const link of linkTags) {
            this.document.head.removeChild(link);
        }
    }

    public removeTags(attrSelectors: string[]): void {
        attrSelectors.map((attrSelector: string) => this.removeTag(attrSelector));
    }
}
