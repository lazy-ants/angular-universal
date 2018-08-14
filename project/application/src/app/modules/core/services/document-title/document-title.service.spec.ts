import { TestBed, inject } from '@angular/core/testing';

import { DocumentTitleService } from './document-title.service';

describe('DocumentTitleService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DocumentTitleService],
        });
    });

    it(
        'should be created',
        inject([DocumentTitleService], (service: DocumentTitleService) => {
            expect(service).toBeTruthy();
        })
    );
});
