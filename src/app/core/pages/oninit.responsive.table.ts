import { OnInit } from "@angular/core";

export declare interface OnInitResponsiveTable extends OnInit {
    get() : void;
    getLike(like : string) : void;
}