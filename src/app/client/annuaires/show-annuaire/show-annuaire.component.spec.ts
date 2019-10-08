import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAnnuaireComponent } from './show-annuaire.component';

describe('ShowAnnuaireComponent', () => {
  let component: ShowAnnuaireComponent;
  let fixture: ComponentFixture<ShowAnnuaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAnnuaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAnnuaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
