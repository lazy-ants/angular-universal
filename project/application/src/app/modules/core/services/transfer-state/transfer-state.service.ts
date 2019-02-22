import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { TransferState, makeStateKey, StateKey } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';

import { CoreModule } from '../../core.module';
import { AppSettingsConfig } from '../../../../configs/app-settings.config';

@Injectable({
    providedIn: CoreModule,
})
export class TransferStateService {
    private appConfig = AppSettingsConfig;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private transferState: TransferState) {}

    public savePayload(next: () => Promise<any>, payloadServerName: string): Promise<any> {
        const defaultPayload = { payload: null };
        const payloadStateKey = this.createStateKey(payloadServerName);

        return new Promise(resolve => {
            this.processPayload(
                payloadStateKey,
                () => {
                    next().then(
                        (response: { payload: any }) => {
                            const transferState: { payload: any } = this.getTransferState(
                                payloadStateKey,
                                defaultPayload
                            );

                            const payload = {
                                payload: Object.assign(transferState.payload || {}, response.payload),
                            };

                            if (isPlatformServer(this.platformId)) {
                                this.setTransferState(payloadStateKey, payload);
                            }

                            resolve(payload);
                        },
                        error => {
                            if (isPlatformServer(this.platformId)) {
                                this.setTransferState(payloadStateKey, defaultPayload);
                            }
                            resolve(defaultPayload);
                        }
                    );
                },
                () => {
                    const payload = this.getTransferState(payloadStateKey, defaultPayload);
                    this.removeTransferState(payloadStateKey);
                    resolve(payload);
                }
            );
        });
    }

    private createStateKey(name: string): StateKey<any> {
        return makeStateKey<any>(name);
    }

    private processPayload(stateKey: StateKey<any>, savePayload: () => void, readPayload: () => void): void {
        if (this.appConfig.ssr) {
            if (this.transferState.hasKey(stateKey)) {
                // We are in the browser
                readPayload();
            } else if (isPlatformServer(this.platformId)) {
                // We are on the server
                savePayload();
            } else {
                // No result received
                savePayload();
            }
        } else {
            // No ssr, for example dev mode
            savePayload();
        }
    }

    private getTransferState(stateKey: StateKey<any>, defaultValue: any): any {
        return this.transferState.get(stateKey, defaultValue);
    }

    private setTransferState(stateKey: StateKey<any>, stateData: any): this {
        this.transferState.set(stateKey, stateData);

        return this;
    }

    private removeTransferState(stateKey: StateKey<any>): this {
        this.transferState.remove(stateKey);

        return this;
    }
}
