import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private breakpointObserver: BreakpointObserver) { }

  getBreakpointCols(): Observable<number> {
    return this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium, Breakpoints.Large])
      .pipe(
        map((result: BreakpointState) => {
          if (result.breakpoints[Breakpoints.XSmall]) {
            return 1;
          } else if (result.breakpoints[Breakpoints.Small]) {
            return 2;
          } else if (result.breakpoints[Breakpoints.Medium]) {
            return 3;
          } else {
            return 4;
          }
        })
      );
  }
}
