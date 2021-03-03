export class BaseEntity {
    identity? : number;
    description : string;
    detail : string;
    userCreatedIdentity? : number;
    userModifiedIdentity? : number;
    dateCreated? : Date;
    dateModified? : Date;
}