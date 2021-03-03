import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CategoryManagePage } from './category-manage.page';

describe('CategoryManagePage', () => {
  let component: CategoryManagePage;
  let fixture: ComponentFixture<CategoryManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryManagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
