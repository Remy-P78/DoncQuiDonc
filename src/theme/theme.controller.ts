import { Controller, Get, Param } from '@nestjs/common';
import { ThemeService } from './theme.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('theme')
@ApiTags('Theme')
export class ThemeController {
  constructor(private readonly themeService: ThemeService) {}

 

  @Get()
  findAll() {
    return this.themeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.themeService.findOne(+id);
  }
 
}
