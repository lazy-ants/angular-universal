import { TestBed, inject } from '@angular/core/testing';
import { TransferState } from '@angular/platform-browser';

import { SeoPropertiesService } from './seo-properties.service';
import { DocumentTitleService } from '../document-title/document-title.service';
import { TransferStateService } from '../transfer-state/transfer-state.service';
import { DocumentMetaService } from '../document-meta/document-meta.service';
import { DocumentLinkService } from '../document-link/document-link.service';

describe('SeoPropertiesService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SeoPropertiesService,
                DocumentTitleService,
                TransferState,
                TransferStateService,
                DocumentMetaService,
                DocumentLinkService,
            ],
        });
    });

    it('should be created', inject([SeoPropertiesService], (service: SeoPropertiesService) => {
        expect(service).toBeTruthy();
    }));
});
