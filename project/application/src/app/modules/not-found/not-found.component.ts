import { Component, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { makeStateKey, TransferState, MetaDefinition } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { HttpResponseStatusService } from '../core/services/http-response-status/http-response-status.service';
import { DocumentTitleService } from '../core/services/document-title/document-title.service';
import { DocumentMetaService } from '../core/services/document-meta/document-meta.service';
import { DocumentLinkService, LinkDefinition } from '../core/services/document-link/document-link.service';
import { AppSettingsConfig } from '../../configs/app-settings.config';

interface ServerPayloadDefinition {
    metaData?: boolean;
    httpResponseStatus?: boolean;
}

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

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
})
export class NotFoundComponent implements OnInit, OnDestroy {
    title = 'Page not found';
    private serverPayload: ServerPayloadDefinition = {};
    private serverPayloadState = makeStateKey<ServerPayloadDefinition>('notFoundComponentServerPayload');
    private appConfig = AppSettingsConfig;

    constructor(
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformId: Object,
        private transferState: TransferState,
        private httpResponseStatusService: HttpResponseStatusService,
        private documentTitleService: DocumentTitleService,
        private documentMetaService: DocumentMetaService,
        private documentLinkService: DocumentLinkService
    ) {}

    ngOnInit() {
        if (this.appConfig.ssr) {
            if (this.transferState.hasKey(this.serverPayloadState)) {
                this.serverPayload = this.transferState.get(this.serverPayloadState, {});
                if (this.serverPayload.metaData) {
                    console.log('SEO meta data was successfully updated.');
                }

                if (this.serverPayload.httpResponseStatus) {
                    console.log('HTTP response status was successfully updated.');
                }

                this.removeTransferState();
            } else if (isPlatformServer(this.platformId)) {
                this.setHttpResponseStatus()
                    .setSeoProps()
                    .setTransferState();
            } else {
                this.setHttpResponseStatus().setSeoProps();
            }
        } else {
            this.setHttpResponseStatus().setSeoProps();
        }
    }

    ngOnDestroy() {
        this.removeSeoProps();
    }

    private setTransferState(): this {
        this.transferState.set(this.serverPayloadState, this.serverPayload);

        return this;
    }

    private removeTransferState(): this {
        this.transferState.remove(this.serverPayloadState);

        return this;
    }

    private setHttpResponseStatus(): this {
        this.httpResponseStatusService.setStatus(404, 'Not Found');

        if (isPlatformServer(this.platformId)) {
            this.serverPayload.httpResponseStatus = true;
        }

        return this;
    }

    private setSeoProps(): this {
        const seoProps: SeoPropsDefinition = this.route.snapshot.data.seoProps;

        if (seoProps.title) {
            this.documentTitleService.setTitle(seoProps.title);
        }

        if (seoProps.metaTags && seoProps.metaTags.length) {
            this.documentMetaService.addTags(seoProps.metaTags);
        }

        if (seoProps.linkTags && seoProps.linkTags.length) {
            this.documentLinkService.addTags(seoProps.linkTags);
        }

        if (isPlatformServer(this.platformId)) {
            this.serverPayload.metaData = true;
        }

        return this;
    }

    private removeSeoProps(): this {
        const seoPropsToRemove: SeoPropsToRemoveDefinition = this.route.snapshot.data.seoPropsT;

        if (seoPropsToRemove.title) {
            this.documentTitleService.removeTitle();
        }

        if (seoPropsToRemove.metaTagsSelectors && seoPropsToRemove.metaTagsSelectors.length) {
            this.documentMetaService.removeTags(seoPropsToRemove.metaTagsSelectors);
        }

        if (seoPropsToRemove.linkTagsSelectors && seoPropsToRemove.linkTagsSelectors.length) {
            this.documentLinkService.removeTags(seoPropsToRemove.linkTagsSelectors);
        }

        return this;
    }
}
