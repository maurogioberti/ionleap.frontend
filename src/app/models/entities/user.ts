import { BaseEntity } from './base.entity';

export interface User extends BaseEntity{
    username: string;  
    name: string;  
    password?: string;
    isAdmin?: boolean;  
    surname?: string;    
    cuit?: number;
    employeeFileNumber?: number;
    profilePictureUrl?: string;
    dateBirth?: Date;
    dateTime?: Date;
    active: Boolean;
    email: string;
}