import { Injectable, NotFoundException, StreamableFile } from '@nestjs/common';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Photo } from './entities/photo.entity';
import { Repository } from 'typeorm';
import { createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo) private photoRepository: Repository<Photo>,
  ) {}
  create(img: Express.Multer.File) {    
    return this.photoRepository.save({
      name: img.filename,
      mimetype: img.mimetype,
      size: img.size,
      description: img.originalname,
    });
  }

  findAll() {
    return `This action returns all photo`;
  }

  async getImageById(id: number, res): Promise<StreamableFile> {
    const result = await this.photoRepository.findOneBy({ id });
    if (!result) {
      throw new NotFoundException(`The photo ${id} is not found !`);
    }
    const imageFile = createReadStream(
      join(process.cwd(), 'uploads', result.name),
    );
    res.set('Content-Type', result.mimetype);
    return new StreamableFile(imageFile);
  }

async update(id: number, file: Express.Multer.File) {
  
  const existingPhoto = await this.photoRepository.findOneBy({ id: id });
  if (!existingPhoto) {
    throw new NotFoundException(`The photo with ID ${id} is not found!`);
  }

  // Vous pouvez choisir un chemin de stockage approprié pour vos photos.
  const storagePath = join(process.cwd(), 'uploads', existingPhoto.name);

  // Créez un flux de lecture pour le fichier téléchargé.
  const fileStream = createReadStream(file.path);

  // Créez un flux d'écriture pour le fichier de stockage.
  const writeStream = createWriteStream(storagePath);

  // Pipez le contenu du fichier téléchargé vers le fichier de stockage.
  fileStream.pipe(writeStream);

  // Mettez à jour les propriétés de la photo si nécessaire.
  if (file.originalname) {
    existingPhoto.description = file.originalname;
  }

  // Enregistrez les modifications dans la base de données.
  await this.photoRepository.save(existingPhoto);
  console.log("BEBACK", existingPhoto);

  return existingPhoto;
}


  remove(id: number) {
    return `This action removes a #${id} photo`;
  }
}
