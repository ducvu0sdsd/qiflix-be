import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user)
    }

    @Get(':id')
    async getAllByAccountID(@Param('id') id: string): Promise<User[]> {
        return await this.userService.getAllByUserID(id)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id)
    }
}
