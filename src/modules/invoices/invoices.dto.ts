export class InvoiceDto {
    readonly concept:string;
    readonly aprovedBy:string;
    readonly sign:string;
    readonly startDate:Date;
    readonly endDate:Date;
}

export class InvoiceDeleteDto{
    readonly id:string;
}

export class InvoiceTransactionDto {
    readonly invoice:{
        id:number
    };
    readonly transaction:{
        id:number
    }

}