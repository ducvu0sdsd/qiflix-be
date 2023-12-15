import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { User, WatchingInterface } from './schema/user.schema';

@Controller('users')
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userService.create(user)
    }

    @Put(':id')
    async update(@Body() userDto: UserCreateDto, @Param('id') id : string): Promise<User> {
        return await this.userService.update(userDto, id)
    }

    @Get(':id')
    async getAllByAccountID(@Param('id') id: string): Promise<User[]> {
        return await this.userService.getAllByUserID(id)
    }

    @Delete(':id')
    async delete(@Param('id') id: string): Promise<User> {
        return this.userService.delete(id)
    }

    @Put('update-watching/:id')
    async updateWatching(@Param('id') id: string, @Body() watching: WatchingInterface): Promise<User> {
        return this.userService.updateWatching(id, watching)
    }

    @Put('delete-watching/:id')
    async deleteWatching(@Param('id') id: string, @Body() watching: WatchingInterface): Promise<void> {
        return this.userService.deleteWatching(id, watching)
    }

    @Put('add-liked/:id')
    async addLiked(@Param("id") id: string, @Body() { movie_id }: { movie_id: string }): Promise<User> {
        return this.userService.addLiked(id, movie_id)
    }

    @Put('remove-liked/:id')
    async removeLiked(@Param("id") id: string, @Body() { movie_id }: { movie_id: string }): Promise<User> {
        return this.userService.removeLiked(id, movie_id)
    }
}
