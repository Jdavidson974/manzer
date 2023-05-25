import { TestBed } from '@angular/core/testing';

import { MyRepasResolver } from './my-repas.resolver';

describe('MyRepasResolver', () => {
  let resolver: MyRepasResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(MyRepasResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
