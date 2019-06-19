import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { AdminModule } from './admin.module'
import { AdminComponent } from './admin.component'
import { RouterTestingModule } from '@angular/router/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms';


describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(
    async(() => {
    TestBed.configureTestingModule({
      imports: [
        AdminModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
