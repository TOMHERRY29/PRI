import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { CampagneModule } from './campagne.module'
import { CampagneComponent } from './campagne.component'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'


describe('CampagneComponent', () => {
  let component: CampagneComponent;
  let fixture: ComponentFixture<CampagneComponent>;

  beforeEach(
    async(() => {
    TestBed.configureTestingModule({
      imports: [
        CampagneModule,
        RouterTestingModule,
        BrowserAnimationsModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampagneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
