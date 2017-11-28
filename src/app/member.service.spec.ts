import { Member } from './member';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';
import { MemberService } from './member.service';

describe('MemberService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MemberService]
    });
  });

  // ***
  // *** REAL
  // ***
  describe('real http', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule],
        providers: [MemberService]
      });
    });

    fit('should get members: real http', inject([MemberService], (service: MemberService) => {
      service.getMembers().subscribe(members => {
        console.log('real http=', members, members.length);
        expect(members.length).toBeGreaterThan(28);
      });
    }));

  });

  // ***
  // *** MOCK
  // ***
  describe('mock http', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
    });

    it('should call error handle when 500: Server Error: mock http',
      inject([MemberService, HttpTestingController]
        , (service: MemberService, mockHttp: HttpTestingController) => {

          spyOn(console, 'log');

          // 1. init mock members
          const mockMembers = [
            { id: 99, slag: 'kea', first_name: { 'th': 'พัชราพรรณ', 'en': 'Phatcharaphan' } }
          ];

          // 2. call http
          service.getMembers().subscribe(
            members => {
              expect(console.log).toHaveBeenCalledWith('err=', 500);
            },
            err => {
              console.log('err', err);
              expect(err.status).toBe(500);
              expect(err.statusText).toBe('Server Error');
            }
          );

          // 3. verify service have called http
          const mockResponse = mockHttp.expectOne(service.MEMBERS_API);

          // 4. flush mock members to http response
          // mockResponse.flush(mockMembers);
          mockResponse.flush({ errorMessage: 'Uh oh!'}, { status: 500, statusText: 'Server Error' });

          // 5.  make sure that there are no pending connections.
          mockHttp.verify();

        }));

    it('should get members: mock http',
      inject([MemberService, HttpTestingController]
        , (service: MemberService, mockHttp: HttpTestingController) => {

          // 1. init mock members
          const mockMembers: Member[] = [
            { id: 99, slug: 'kea', first_name: { 'th': 'พัชราพรรณ', 'en': 'Phatcharaphan' } } as Member
          ];

          // 2. call http
          service.getMembers().subscribe(members => {
            // 5. verify members are come from mock members
            console.log('mock http=', members);
            expect(members.length).toBeGreaterThan(0);
          });

          // 3. verify service have called http
          const mockResponse = mockHttp.expectOne(service.MEMBERS_API);

          // 4. flush mock members to http response
          mockResponse.flush({ members: mockMembers});

          // 5. unclear
          // - make sure that there are no pending connections.
          // - to verify that no more requests remain to be consumed
          mockHttp.verify();

        }));
  });

});
