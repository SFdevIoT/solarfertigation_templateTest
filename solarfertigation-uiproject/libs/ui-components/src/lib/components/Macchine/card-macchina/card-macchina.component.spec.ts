import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardMacchinaComponent } from './card-macchina.component';
import 'jest-preset-angular/setup-jest';
import { jest } from '@jest/globals';



describe('CardMacchinaComponent', () => {
  let component: CardMacchinaComponent;
  let fixture: ComponentFixture<CardMacchinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardMacchinaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardMacchinaComponent);
    component = fixture.componentInstance;
    component.machineData = {
      id: '1',
      name: 'Test Machine',
      isActive: true,
      statusText: 'Active',
      fertilizers: []
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
