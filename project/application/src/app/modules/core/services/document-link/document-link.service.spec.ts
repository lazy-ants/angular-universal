import { TestBed, inject } from '@angular/core/testing';

import { DocumentLinkService } from './document-link.service';

describe('DocumentLinkService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DocumentLinkService],
        });
    });

    it(
        'should be created',
        inject([DocumentLinkService], (service: DocumentLinkService) => {
            expect(service).toBeTruthy();
        })
    );
});
