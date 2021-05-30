import {Account} from '../accounts/accounts.entity'
export class TransactionDto {
    readonly amount:string;
    readonly description:string;
    readonly sign:string;
    readonly originAccount:{
        id:number;
    };
    readonly destinyAccount:{
        id:number;
    };
}

export class TransactionsDeleteDto{
    readonly id:string;
}
