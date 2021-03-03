import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CustomersManagePage } from './customers-manage.page';

describe('CustomersManagePage', () => {
  let component: CustomersManagePage;
  let fixture: ComponentFixture<CustomersManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CustomersManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
