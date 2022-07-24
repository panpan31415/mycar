import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';
@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.userService.create(email, password);
  }

  @Get('/:id')
  // anything saved in request is string, so id has a type of string
  async deleteUser(@Param('id') id: string) {
    try {
      return await this.userService.remove(parseInt(id));
    } catch (err) {
      throw new NotFoundException(`user with id ${id} is not found`);
    }
  }

  @Delete('/:id')
  // anything saved in request is string, so id has a type of string
  async findUser(@Param('id') id: string) {
    try {
      return await this.userService.remove(parseInt(id));
    } catch (error) {
      throw new NotFoundException(`user with id ${id} is not found`);
    }
  }

  @Get()
  async findByEmail(@Query('email') email: string) {
    try {
      const user = await this.userService.find(email);
      return user;
    } catch (err) {
      throw new Error(`user with email ${email} is not found`);
    }
  }

  @Patch('/:id')
  async updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    try {
      return await this.userService.update(parseInt(id), body);
    } catch (err) {
      throw new NotFoundException(`user with id ${id} is not found`);
    }
  }
}
