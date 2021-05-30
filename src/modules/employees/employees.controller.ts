import {
  Controller,
  Get,
  Post,
  Res,
  Body,
  HttpStatus,
  Inject,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';
import { EmployeeService } from './service/employees.service';
import { EmployeeDto, EmployeeDeleteDto, EmployeeSupervisorDto, AccountCreationAndAssociationDTO } from './employees.dto'
import { EmployeeSupervisorService } from './service/employee-supervisor.service';
import { EmployeeAccountService } from './service/employee-account.service';

@Controller('employee')
export class EmployeesController {
  constructor(
    private readonly employeeService: EmployeeService,
    private readonly employeeSupervisorService: EmployeeSupervisorService,
    private readonly employeeAccountService: EmployeeAccountService
  ) {}

  @Post('')
  async createEmployee(
    @Res() res: Response,
    @Body() employeeDto:EmployeeDto
  ): Promise<any> {
    return await this.employeeService.create(employeeDto,res);
  }

  @Delete('')
  async deleteEmployee(
    @Body() employeeDto:EmployeeDeleteDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.employeeService.delete(employeeDto.id,res);
  }

  @Get('')
  async updateEmployee(
    @Res() res: Response,
  ): Promise<any> {
    return await this.employeeService.get(res);
  }

  @Post('supervisor')
  async createEmployeeSupervisor(@Body() employeeSupervisorDto: EmployeeSupervisorDto): Promise<any> {
    return await this.employeeSupervisorService.create(employeeSupervisorDto);
  }

  @Delete('supervisor')
  async deleteEmployeeSupervisor(@Body() employeeSupervisorDto:EmployeeDeleteDto): Promise<any> {
    return await this.employeeSupervisorService.delete(employeeSupervisorDto.id);
  }

  @Get('supervisor')
  async getEmployeeSupervisor(): Promise<any> {
    return await this.employeeSupervisorService.get();
  }
  
  @Post('account')
  async accountCreationAndAssociation(
    @Body() accountDto: AccountCreationAndAssociationDTO,
    @Res() res: Response
  ){    
    return await this.employeeAccountService.createAndAssociateAccountToEmployee(accountDto,res);
  }

  @Get('account')
  async getAllAccountAndOwners(
    @Res() res: any
  ){
    return await this.employeeAccountService.getAllAccountAndOwnerOfThoseAccounts(res);
  }

  
}
