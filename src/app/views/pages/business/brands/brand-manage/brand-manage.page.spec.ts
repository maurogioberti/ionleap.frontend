import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrandManagePage } from './brand-manage.page';

describe('BrandManagePage', () => {
  let component: BrandManagePage;
  let fixture: ComponentFixture<BrandManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrandManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
