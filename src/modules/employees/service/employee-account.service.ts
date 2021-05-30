import { Inject, Injectable,HttpStatus } from '@nestjs/common';
import { AccountCreationAndAssociationDTO, EmployeeAccountDto, EmployeeDto } from '../employees.dto';
import { EmployeeAccountRepositoryInterface } from '../interface/employees-account.repository.interface';
import { EmployeeAccount } from '../entity/employes-account.entity';
import { EmployeeService } from './employees.service';
import { AccountService } from 'src/modules/accounts/accounts.services';
import { Account } from 'src/modules/accounts/accounts.entity';
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm';
import { Response} from 'express';
import { getManager } from 'typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class EmployeeAccountService{
  constructor(
    @Inject('EmployeeAccountRepositoryInterface')
    private readonly employeeAccountRepository: EmployeeAccountRepositoryInterface,
    @Inject(EmployeeService)
    private readonly employeeService: EmployeeService,
    @Inject(AccountService)
    private readonly accountService: AccountService,
    @InjectRepository(EmployeeAccount) private readonly employeeAccountdirectRepository: Repository<EmployeeAccount>,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
  ) {}

  public async create(employeeAccountDto: EmployeeAccountDto): Promise<EmployeeAccount> {
    this._logger.debug(`create: creating employeeAccount [employeeAccount=${employeeAccountDto}]`, {
        context: EmployeeAccountService.name,
    });
    let employeeAccount = await new EmployeeAccount();
    employeeAccount.account = await this.accountService.findOneById(employeeAccountDto.account.id)
    employeeAccount.employee = await this.employeeService.findOneById(employeeAccountDto.employee.id)
    return await this.employeeAccountRepository.create(employeeAccount);
  }

  public async delete(employeeAccountId:string) {
    this._logger.debug(`delete: deleting employeeAccount with id [employeeAccountID=${employeeAccountId}]`, {
        context: EmployeeAccountService.name,
    });
    return await this.employeeAccountRepository.remove(employeeAccountId);
  }

  public async get():Promise<EmployeeAccount[]> {
    this._logger.debug(`get: getting all employeesAccount`, {
        context: EmployeeAccountService.name,
    });
    return await this.employeeAccountRepository.findAll();
  }

  public async createAndAssociateAccountToEmployee(data: AccountCreationAndAssociationDTO,res){
    this._logger.debug(`creating: creating the account and associating it with a employee [data=${data}]`, {
        context: EmployeeAccountService.name,
    });
    try{
        let account = new Account()
        account.productNumber = data.productNumber
        account.currentAmount = data.currentAmount
        let newAccount = await this.accountService.shareCreation(account)
        let employeeAccountDto :EmployeeAccountDto ={
            account:{
                id:newAccount.id,
            },
            employee:{
                id:data.employee.id
            }
        }
        let response = await this.create(employeeAccountDto)
        return res.status(HttpStatus.OK).send(response);
    }
    catch(e){
        return res.status(HttpStatus.BAD_REQUEST).send();
    }
  }

  public async getAllAccountAndOwnerOfThoseAccounts(res:Response):Promise<any>{
    this._logger.debug(`get: getting all Accounts And Owners Of Those Accounts`, {
        context: EmployeeAccountService.name,
    });
    try{
        const entityManager = getManager();
        const someQuery = await entityManager.query(`
            select distinct account.product_number as productNumber,account.current_amount as currentAmount ,employee.first_name as firstName, employee.first_lastname as firstLastname, employee.id as employeeID,account.id as accountId, employee.position, employee.deparment
            from employee_account
            Inner Join account on account.id = employee_account.account_fk
            inner Join employee on employee.id = employee_account.employee_fk
        `);
        return res.status(HttpStatus.OK).send(someQuery);
    }
    catch(e){
        return res.status(HttpStatus.BAD_REQUEST).send(JSON.stringify(e.message));
    }
  }
}
