import { CasModule } from './cas.module';

describe('CasModule', () => {
  let casModule: CasModule;

  beforeEach(() => {
    casModule = new CasModule();
  });

  it('should create an instance', () => {
    expect(casModule).toBeTruthy();
  });
});
