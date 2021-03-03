import { BaseEntity } from './base.entity';

export interface Customer extends BaseEntity {
  businessPrice: boolean;
  name: string;
  surname: string;
  personalId: number;
  address: string;
  email: string;
  phone: string;
  mobile: string;
  salary: number;
}