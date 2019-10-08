import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuairesComponent } from './annuaires.component';

describe('AnnuairesComponent', () => {
  let component: AnnuairesComponent;
  let fixture: ComponentFixture<AnnuairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
