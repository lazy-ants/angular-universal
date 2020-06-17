import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class BaseComponent implements OnDestroy {
    protected unsubscribe$: Subject<boolean> = new Subject<boolean>();

    constructor() {}

    ngOnDestroy() {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
