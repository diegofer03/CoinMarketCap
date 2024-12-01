import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { FetchStatusInvest, FethListTransaction } from '../../models/app.model';

@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor() { }

  getListTransaction(): Observable<FethListTransaction> {
    const mockData = {
      status: 'success',
      data: [
        { id: '1', date: '01-01-2023', time: '12:00:00', from: 'EUR', amountFrom: 7625.15, to: 'BTC', amountTo: 1.0 },
        { id: '2', date: '02-01-2023', time: '14:30:00', from: 'BTC', amountFrom: 1.0, to: 'LTC', amountTo: 40.0 },
        { id: '3', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '4', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '5', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '6', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '7', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '8', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '9', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
        { id: '10', date: '03-01-2023', time: '15:00:00', from: 'LTC', amountFrom: 40.0, to: 'BTC', amountTo: 1.6 },
      ]
    };

    return of(mockData).pipe(delay(1000));
  }

  getStatusInvest(): Observable<FetchStatusInvest> {
    const mockData = {
      status: 'success',
      data: {
        invested: '7.625,15',
        actualWorth: '9.500,34'
      }
    };

    return of(mockData).pipe(delay(1000));
  }

  postData(data: any): Observable<any> {
    console.log('Datos recibidos para simular POST:', data);

    return of({ success: true, message: 'Datos guardados correctamente' }).pipe(delay(1000));
  }

}
