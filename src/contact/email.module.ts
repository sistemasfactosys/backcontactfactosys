// src/email/email.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EmailService } from './email.service';

@Module({
  imports: [ConfigModule], // necesario para inyectar ConfigService
  providers: [EmailService],
  exports: [EmailService], // exporta para usar en otros módulos
})
export class EmailModule {}
