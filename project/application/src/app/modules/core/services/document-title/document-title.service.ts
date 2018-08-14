import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { CoreModule } from '../../core.module';

@Injectable({
    providedIn: CoreModule,
})
export class DocumentTitleService {
    constructor(private titleService: Title) {}

    public setTitle(value: string): void {
        this.titleService.setTitle(value);
    }

    public getTitle(): string {
        return this.titleService.getTitle();
    }

    public removeTitle(): void {
        this.titleService.setTitle('');
    }
}
