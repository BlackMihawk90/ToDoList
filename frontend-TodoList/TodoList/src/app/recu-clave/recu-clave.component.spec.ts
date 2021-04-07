import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecuClaveComponent } from './recu-clave.component';

describe('RecuClaveComponent', () => {
  let component: RecuClaveComponent;
  let fixture: ComponentFixture<RecuClaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecuClaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecuClaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
