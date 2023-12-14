import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // créer une instance d'application Nest
  app.useGlobalPipes(new ValidationPipe()); // au moment où les données arrivent du front et avant de traiter une requête
  const corsOptions: CorsOptions = {
    // origin: 'http://localhost:4200', // Domaine que vous souhaitez autoriser
    origin: '*', // Domaine que vous souhaitez autoriser
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // autorise requete avec token etc..
    allowedHeaders: 'Origin, Content-Type, X-Auth-Token', // Ajoutez les en-têtes que vous autorisez
  };

  app.enableCors(corsOptions); // Mise en place de Cors selon les options
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder() // Mise en place de Swagger
    .setTitle('DoncQuiDonc example')
    .setDescription('DoncQuiDonc description')
    .setVersion('1.0')
    .addTag('quiz')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log("lancement port 3000");
}
bootstrap();
