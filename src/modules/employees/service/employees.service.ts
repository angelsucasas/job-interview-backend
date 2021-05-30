import { Inject, Injectable,HttpStatus,Res} from '@nestjs/common';
import { Employee } from '../entity/employees.entity';
import { EmployeeRepositoryInterface } from '../interface/employees.repository.interface';
import { EmployeeDto } from '../employees.dto';
import { Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class EmployeeService{
  constructor(
    @Inject('EmployeeRepositoryInterface')
    private readonly employeeRepository: EmployeeRepositoryInterface,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly _logger: Logger,
  ) {}


  public async create(employeeDto: EmployeeDto, res :Response): Promise<Response> {
    this._logger.debug(`create: creating employee [employee=${employeeDto}]`, {
      context: EmployeeService.name,
    });
    let employee = await new Employee();
    employee.firstName = employeeDto.firstName;
    employee.secondName = employeeDto.secondName;
    employee.firstLastname = employeeDto.firstLastname;
    employee.secondLastname = employeeDto.secondLastName;
    employee.position = employeeDto.position;
    employee.deparment = employeeDto.deparment;
    try{
      let response = await this.employeeRepository.create(employee);
      return res.status(HttpStatus.OK).send(response);
    }
    catch{
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    
  }

  public async delete(employeeId:string, res:Response):Promise<Response> {
    this._logger.debug(`delete: deleting employee with id [employeeID=${employeeId}]`, {
      context: EmployeeService.name,
    });
    try{
      let response = await this.employeeRepository.remove(employeeId);
      return res.status(HttpStatus.OK).send(response);
    }
    catch{
      return res.status(HttpStatus.BAD_REQUEST).send();
    }
    
  }

  public async get(res :Response):Promise<Response>{
    this._logger.debug(`get: getting all employees`, {
      context: EmployeeService.name,
    });
    try{
      let response = await this.employeeRepository.findAll();
      return res.status(HttpStatus.OK).send(response);
    }catch{
      return res.status(HttpStatus.BAD_REQUEST).send();
    }  
  }

  public async findOneById(id:number): Promise<Employee>{
    this._logger.debug(`get: finding the employee with id [employeeID=${id}]`, {
      context: EmployeeService.name,
    });
    return await this.employeeRepository.findOneById(id)
  }
}
