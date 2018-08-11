import { InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export interface IConfig {
    apiHost: string;
    merchantId: number;
    tradePointId: number;
    cameraId: string;
};

export const APP_CONFIG = new InjectionToken<IConfig>('app.config');

export const appConfig: IConfig = {
  apiHost: environment.apiHost,
  merchantId: environment.merchantId,
  tradePointId: environment.tradePointId,
  cameraId: environment.cameraId,
};
