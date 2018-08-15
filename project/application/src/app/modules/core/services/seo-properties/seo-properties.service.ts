import { Injectable } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';

import { CoreModule } from '../../core.module';
import { DocumentTitleService } from '../document-title/document-title.service';
import { DocumentMetaService } from '../document-meta/document-meta.service';
import { DocumentLinkService, LinkDefinition } from '../document-link/document-link.service';

interface SeoPropsDefinition {
    title?: string;
    metaTags?: MetaDefinition[];
    linkTags?: LinkDefinition[];
}

interface SeoPropsToRemoveDefinition {
    title?: boolean;
    metaTagsSelectors?: string[];
    linkTagsSelectors?: string[];
}

@Injectable({
    providedIn: CoreModule,
})
export class SeoPropertiesService {
    constructor(
        private documentTitleService: DocumentTitleService,
        private documentMetaService: DocumentMetaService,
        private documentLinkService: DocumentLinkService
    ) {}

    public setSeoProps(seoProps: SeoPropsDefinition): this {
        const { title, metaTags, linkTags } = seoProps;

        if (title) {
            this.documentTitleService.setTitle(title);
        }

        if (metaTags && metaTags.length) {
            this.documentMetaService.addTags(metaTags);
        }

        if (linkTags && linkTags.length) {
            this.documentLinkService.addTags(linkTags);
        }

        return this;
    }

    public removeSeoProps(seoPropsToRemove: SeoPropsToRemoveDefinition): this {
        const { title, metaTagsSelectors, linkTagsSelectors } = seoPropsToRemove;

        if (title) {
            this.documentTitleService.removeTitle();
        }

        if (metaTagsSelectors && metaTagsSelectors.length) {
            this.documentMetaService.removeTags(metaTagsSelectors);
        }

        if (linkTagsSelectors && linkTagsSelectors.length) {
            this.documentLinkService.removeTags(linkTagsSelectors);
        }

        return this;
    }
}
