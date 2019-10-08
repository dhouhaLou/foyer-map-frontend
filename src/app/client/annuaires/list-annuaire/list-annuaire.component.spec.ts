import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAnnuaireComponent } from './list-annuaire.component';

describe('ListAnnuaireComponent', () => {
  let component: ListAnnuaireComponent;
  let fixture: ComponentFixture<ListAnnuaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListAnnuaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAnnuaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
