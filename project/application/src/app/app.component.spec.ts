import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferState } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ServerAnimationService } from './modules/core/services/server-animation/server-animation.service';
import { BotCrawlerService } from './modules/core/services/bot-crawler/bot-crawler.service';
import { TransferStateService } from './modules/core/services/transfer-state/transfer-state.service';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [AppComponent],
            providers: [ServerAnimationService, BotCrawlerService, TransferState, TransferStateService],
        }).compileComponents();
        fixture = TestBed.createComponent(AppComponent);
    }));
    it('should create the app', async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));
    it(`should have as title 'Welcome to angular ssr app!'`, async(() => {
        const app = fixture.debugElement.componentInstance;
        expect(app.title).toEqual('Welcome to angular ssr app!');
    }));
});
