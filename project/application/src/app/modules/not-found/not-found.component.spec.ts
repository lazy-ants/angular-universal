import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NotFoundComponent } from './not-found.component';
import { CoreModule } from '../core/core.module';

describe('NotFoundComponent', () => {
    beforeEach(
        async(() => {
            TestBed.configureTestingModule({
                declarations: [NotFoundComponent],
                imports: [CoreModule, RouterTestingModule],
            }).compileComponents();
        })
    );
    it(
        'should create the app',
        async(() => {
            const fixture = TestBed.createComponent(NotFoundComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app).toBeTruthy();
        })
    );
    it(
        `should have as title 'Not found page!'`,
        async(() => {
            const fixture = TestBed.createComponent(NotFoundComponent);
            const app = fixture.debugElement.componentInstance;
            expect(app.title).toEqual('Not found page!');
        })
    );
    it(
        'should render title in a h1 tag',
        async(() => {
            const fixture = TestBed.createComponent(NotFoundComponent);
            fixture.detectChanges();
            const compiled = fixture.debugElement.nativeElement;
            expect(compiled.querySelector('h1').textContent).toContain('Not found page!');
        })
    );
});
