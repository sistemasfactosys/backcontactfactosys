import { Injectable, Logger } from '@nestjs/common';
import { ContactDto } from './dto/create-contact.dto';
import { EmailService } from './email.service';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);

  constructor(private readonly emailService: EmailService) {}

  async processContactSubmission(contactData: ContactDto): Promise<void> {
    this.logger.log(
      `Procesando solicitud de: ${contactData.name} (${contactData.email})`,
    );

    try {
      // Enviar email
      await this.emailService.sendContactEmail(contactData);

      // Aquí puedes agregar más lógica como:
      // - Guardar en base de datos
      // - Enviar notificaciones adicionales
      // - Integrar con CRM

      this.logger.log(
        `Solicitud procesada exitosamente para: ${contactData.email}`,
      );
    } catch (error) {
      this.logger.error(
        `Error procesando solicitud de ${contactData.email}:`,
        error,
      );
      throw error;
    }
  }

  async testEmailConnection(): Promise<boolean> {
    return await this.emailService.verifyConnection();
  }
}
