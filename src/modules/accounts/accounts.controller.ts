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
import { AccountDto, AccountDeleteDto} from './accounts.dto'
import { AccountService } from './accounts.services';
import { Account } from './accounts.entity'

@Controller('account')
export class AccountsController {
  constructor(
    private readonly accountService: AccountService
  ) {}

  @Post('')
  async createEmployee(
    @Body() accountDto: AccountDto,
    @Res() res: Response,
  ){
    return await this.accountService.create(accountDto,res);
  }

  @Delete('')
  async deleteEmployee(
    @Body() accountDto:AccountDeleteDto,
    @Res() res: Response,
  ): Promise<any> {
    return await this.accountService.delete(accountDto.id,res)
  }

  @Get('')
  async getEmployee(
    @Res() res: Response,
  ): Promise<any> {
    return await this.accountService.get(res)
  }
}
