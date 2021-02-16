import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const SwaggerInit = (app: NestFastifyApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Shopping list')
    .setDescription('Test task.')
    .setVersion('1.0')
    .addTag('Authorization & Authentication')
    .addTag('Lists')
    .addTag('Items')
    .addServer('http://', 'HTTP server protocol')
    .addServer('https://', 'HTTPS server protocol')
    .addBearerAuth({type: 'apiKey', in: 'header', name: 'Authorization'})
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  SwaggerModule.setup('api', app, document);
}