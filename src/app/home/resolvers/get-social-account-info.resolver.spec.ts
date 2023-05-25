import { TestBed } from '@angular/core/testing';

import { GetSocialAccountInfoResolver } from './get-social-account-info.resolver';

describe('GetSocialAccountInfoResolver', () => {
  let resolver: GetSocialAccountInfoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GetSocialAccountInfoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
