export class EmployeeDto {
    readonly firstName:string;
    readonly secondName:string;
    readonly firstLastname:string;
    readonly secondLastName:string;
    readonly position:string;
    readonly deparment:string;
}

export class EmployeeDeleteDto{
    readonly id:string;
}

export class EmployeeSupervisorDto{
    readonly employee:{
        id:number;
    }
    readonly supervisor:{
        id:number;
    }
}

export class EmployeeAccountDto{
    employee:{
        id:number;
    }
    account:{
        id:number
    }
}

export class AccountCreationAndAssociationDTO{
    readonly productNumber:string;
    readonly currentAmount:number;
    readonly employee:{
        id:number;
    }
}
