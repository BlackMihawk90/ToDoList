import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenformComponent } from './tokenform.component';

describe('TokenformComponent', () => {
  let component: TokenformComponent;
  let fixture: ComponentFixture<TokenformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
