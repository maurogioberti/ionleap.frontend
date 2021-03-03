export class ResponsiveTable<TRow> {
    rows: TRow[];
    columns: ResponsiveColumn[] = [];
    component: any;

    constructor(component : any) {
        this.component = component;
    }

    public addColumn(name : string, display : string, expandable : boolean, mobile : boolean){
        let responsiveColumn : ResponsiveColumn = {
            name: name,
            display: display,
            mobile: mobile,
            expandable: expandable
        }

        let index : number = this.columns.length++;
        this.columns[index] = responsiveColumn;
    }
}

export class ResponsiveColumn {
    name: string;
    display: string;
    mobile: boolean;
    expandable: boolean;
}