import { Controller, Get, Post, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, StreamableFile, UseGuards } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';

@Controller('photo')
@ApiTags('Photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('monFichier'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.photoService.create(file);
  }

  @Get()
  findAll() {
    return this.photoService.findAll();
  }

  @Get(':id')
  getImageById(
    @Param('id') id: string,
    @Res({ passthrough: true }) res,
  ): Promise<StreamableFile> {
    return this.photoService.getImageById(+id, res);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('monFichier'))
  update(
    @Param('id') id: number,
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    return this.photoService.update(+id, file);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  remove(@Param('id') id: string) {
    return this.photoService.remove(+id);
  }
}
