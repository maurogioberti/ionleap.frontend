import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrandsManagePage } from './brands-manage.page';

describe('BrandsManagePage', () => {
  let component: BrandsManagePage;
  let fixture: ComponentFixture<BrandsManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandsManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandsManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
