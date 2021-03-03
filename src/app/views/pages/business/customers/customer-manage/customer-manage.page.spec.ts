import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomerManagePage } from './customer-manage.page';

describe('CustomerManagePage', () => {
  let component: CustomerManagePage;
  let fixture: ComponentFixture<CustomerManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
