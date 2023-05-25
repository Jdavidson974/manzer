import { TestBed } from '@angular/core/testing';

import { SecteurListResolver } from './secteur-list.resolver';

describe('SecteurListResolver', () => {
  let resolver: SecteurListResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SecteurListResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
