import { TestBed, inject } from '@angular/core/testing';

import { DocumentMetaService } from './document-meta.service';

describe('DocumentMetaService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DocumentMetaService],
        });
    });

    it(
        'should be created',
        inject([DocumentMetaService], (service: DocumentMetaService) => {
            expect(service).toBeTruthy();
        })
    );
});
