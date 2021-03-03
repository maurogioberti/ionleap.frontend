import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductManagePage } from './product-manage.page';

describe('ProductManagePage', () => {
  let component: ProductManagePage;
  let fixture: ComponentFixture<ProductManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
