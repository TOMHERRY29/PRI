import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { TranslateModule } from '@ngx-translate/core'

import { FilterbarComponent } from './filterbar.component'
import { LayoutModule } from '../../layout.module'

describe('Filterbar', () => {
  let component: FilterbarComponent
  let fixture: ComponentFixture<FilterbarComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        LayoutModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterbarComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
