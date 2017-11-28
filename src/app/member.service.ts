import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';
import { Member } from './member';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberService {

  // readonly MEMBERS_API = 'https://www.api.bnk48.com/api/members';
  readonly MEMBERS_API = 'http://localhost:3000/members';

  constructor(private httpClient: HttpClient) { }

  getMember(slug: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.MEMBERS_API}/${slug}`);
  }

  getMembers(): Observable<Member[]> {
    return this.httpClient
            .get<{ members, current_page, total_page }>(this.MEMBERS_API)
            .pipe(
              map(d => d.members as Member[]),
              catchError(function(err: HttpErrorResponse) {
                console.log('err=', err.status);
                return of([]);
              })
              // catchError(this.handleError('getMember()', []))
            );
  }

  // private handleError<T>(operation = 'operation', result?: T) {

  //   return (error: any): Observable<T>

  // }

}
