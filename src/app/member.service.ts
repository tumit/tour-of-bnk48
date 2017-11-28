import { Member } from './member';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberService {

  readonly api = 'https://www.api.bnk48.com/api/members';

  constructor(private httpClient: HttpClient) { }

  getMembers(): Observable<Member[]> {
    return this.httpClient
            .get<Member[]>(this.api);
  }

}
