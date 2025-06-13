import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig } from '@angular/fire/compat/remote-config';
import { Observable, from, of } from 'rxjs';
import { map, shareReplay, tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeatureFlagService {
  private fetchAndActivateComplete$: Observable<boolean>;
  private _parameters$: Observable<any>;

  constructor(private remoteConfig: AngularFireRemoteConfig) {
    this.fetchAndActivateComplete$ = from(
      this.remoteConfig.fetchAndActivate()
    ).pipe(
      tap((activated) => {
        if (activated) {
          console.log('Firebase Remote Config: Nuevos valores activados.');
        } else {
          console.log(
            'Firebase Remote Config: Usando valores cacheados o por defecto.'
          );
        }
      }),
      catchError((error) => {
        console.error(
          'Firebase Remote Config: Error al fetch y activar:',
          error
        );
        return of(true);
      }),
      shareReplay(1)
    );

    this._parameters$ = this.fetchAndActivateComplete$.pipe(
      switchMap(() => this.remoteConfig.parameters),
      map((params) => {
        const result: { [key: number]: any } = {};
        params.forEach((param, key) => {
          if (param.asBoolean() === true || param.asBoolean() === false) {
            result[key] = param.asBoolean();
          } else if (
            !isNaN(Number(param.asString())) &&
            param.asString() !== ''
          ) {
            result[key] = param.asNumber();
          } else {
            result[key] = param.asString();
          }
        });
        return result;
      }),
      shareReplay(1)
    );
  }

  getFeatureFlag(key: number): Observable<boolean> {
    return this._parameters$.pipe(
      map((params) => {
        const value = params[key] as boolean;
        return value;
      })
    );
  }
}
