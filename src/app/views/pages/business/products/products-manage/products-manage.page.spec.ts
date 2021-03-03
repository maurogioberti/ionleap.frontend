import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductsManagePage } from './products-manage.page';

describe('ProductsManagePage', () => {
  let component: ProductsManagePage;
  let fixture: ComponentFixture<ProductsManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
