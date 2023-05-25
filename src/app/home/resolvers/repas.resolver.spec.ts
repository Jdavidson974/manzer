import { TestBed } from '@angular/core/testing';

import { RepasResolver } from './repas.resolver';

describe('RepasResolver', () => {
  let resolver: RepasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RepasResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
