import { Injectable } from '@angular/core';
import { Meta, MetaDefinition } from '@angular/platform-browser';

import { CoreModule } from '../../core.module';

@Injectable({
    providedIn: CoreModule,
})
export class DocumentMetaService {
    constructor(private metaService: Meta) {}

    public addTag(tag: MetaDefinition, forceCreation: boolean = false): HTMLMetaElement | null {
        return this.metaService.addTag(tag, forceCreation);
    }

    public addTags(tags: MetaDefinition[], forceCreation: boolean = false): HTMLMetaElement[] {
        return this.metaService.addTags(tags, forceCreation);
    }

    public getTag(attrSelector: string): HTMLMetaElement | null {
        return this.metaService.getTag(attrSelector);
    }

    public getTags(attrSelector: string): HTMLMetaElement[] {
        return this.metaService.getTags(attrSelector);
    }

    public updateTag(tag: MetaDefinition, selector?: string): HTMLMetaElement | null {
        return this.metaService.updateTag(tag, selector);
    }

    public removeTag(attrSelector: string): void {
        this.metaService.removeTag(attrSelector);
    }

    public removeTags(attrSelectors: string[]): void {
        attrSelectors.map((attrSelector: string) => this.removeTag(attrSelector));
    }

    public removeTagElement(meta: HTMLMetaElement): void {
        this.metaService.removeTagElement(meta);
    }
}
