import { BaseEntity } from './base.entity';

export interface Product extends BaseEntity {
  detail: string;
  cost: number;
  price: number;
  priceBusiness: number;
  quantity: number;
  picture: string;
  webSite: boolean;
  categoryIdentity: number;
  brandIdentity: number;
}