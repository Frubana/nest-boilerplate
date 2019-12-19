import { Controller, Get, Param, Post, Body, UseInterceptors, UseFilters, ForbiddenException, UseGuards, SetMetadata } from '@nestjs/common';
import { Crud, ParsedRequest, ParsedBody, CrudRequest, CrudRequestInterceptor, CrudController } from '@nestjsx/crud';
import { User } from './users.model';
import { UsersService } from './users.service';
import { HttpExceptionFilter } from '../../commons/http-exception';
import { RolesGuard } from '../../guards/roles.guard';

@Crud({
  model: {
    type: User
  }
})
@Controller('users')
export class UsersController {
  constructor(public service: UsersService) {}

  get base(): CrudController<User> {
    return this;
  }
  
  @Get('/test')
  @UseFilters(HttpExceptionFilter)
  test(){
    return 'test';
  }

  @UseGuards(RolesGuard)
  @SetMetadata('role', ['admin'])
  @Get('/roles')
  @UseFilters(HttpExceptionFilter)
  async roles(){
    return 'test';
  }

  @UseInterceptors(CrudRequestInterceptor)
  @Post()
  createOneCopy( @ParsedRequest() req: CrudRequest,
   @Body() data: User){

    return this.service.createOne(req, data)
    
  }

}
