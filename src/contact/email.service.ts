import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactDto } from './dto/create-contact.dto';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.createTransporter();
  }

  private createTransporter() {
    const host = this.configService.get<string>('SMTP_HOST')!;
    const port = parseInt(this.configService.get<string>('SMTP_PORT')!, 10);
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true';
    const user = this.configService.get<string>('SMTP_USER')!;
    const pass = this.configService.get<string>('SMTP_PASS')!;

    this.logger.log(
      `Inicializando transporter con host=${host}, port=${port}, secure=${secure}, user=${user}`,
    );

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure, // true si usas 465 (SSL/TLS)
      auth: { user, pass },
    });
  }

  private getServiceLabel(service: string): string {
    const services = {
      'web-development': 'Desarrollo Web',
      'mobile-app': 'Aplicación Móvil',
      ecommerce: 'E-commerce',
      consulting: 'Consultoría Tecnológica',
      other: 'Otro',
    };
    return services[service] || service;
  }

  private getBudgetLabel(budget: string): string {
    const budgets = {
      '1000-5000': 'S/. 1,000 - S/. 5,000',
      '5000-10000': 'S/. 5,000 - S/. 10,000',
      '10000-25000': 'S/. 10,000 - S/. 25,000',
      '25000+': 'S/. 25,000+',
    };
    return budgets[budget] || 'No especificado';
  }

  async sendContactEmail(contactData: ContactDto): Promise<void> {
    const { name, email, phone, company, service, budget, message } =
      contactData;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px; }
          .field { margin-bottom: 15px; }
          .label { font-weight: bold; color: #495057; }
          .value { margin-left: 10px; }
          .message-box { background: white; padding: 20px; border-left: 4px solid #667eea; margin-top: 20px; border-radius: 5px; }
          .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🚀 Nuevo Lead - Factosys Perú</h1>
            <p>Solicitud de contacto desde el sitio web</p>
          </div>
          
          <div class="content">
            <div class="field">
              <span class="label">👤 Nombre:</span>
              <span class="value">${name}</span>
            </div>
            <div class="field">
              <span class="label">📧 Email:</span>
              <span class="value">${email}</span>
            </div>
            ${phone ? `<div class="field"><span class="label">📞 Teléfono:</span><span class="value">${phone}</span></div>` : ''}
            ${company ? `<div class="field"><span class="label">🏢 Empresa:</span><span class="value">${company}</span></div>` : ''}
            <div class="field">
              <span class="label">🛠️ Servicio:</span>
              <span class="value">${this.getServiceLabel(service)}</span>
            </div>
            ${budget ? `<div class="field"><span class="label">💰 Presupuesto:</span><span class="value">${this.getBudgetLabel(budget)}</span></div>` : ''}
            <div class="message-box">
              <div class="label">💬 Mensaje:</div>
              <p>${message.replace(/\n/g, '<br>')}</p>
            </div>
            <div class="footer">
              <p>📅 Recibido el: ${new Date().toLocaleString('es-PE', {
                timeZone: 'America/Lima',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}</p>
              <p>🌐 Factosys Perú - Transformando ideas en realidad digital</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: this.configService.get('SMTP_FROM'),
      to: this.configService.get('CONTACT_EMAIL'),
      subject: `🚀 Nuevo Lead: ${name} - ${this.getServiceLabel(service)}`,
      html: emailHtml,
      replyTo: email,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      this.logger.log(`📧 Email enviado correctamente para: ${email}`);
    } catch (error) {
      this.logger.error('❌ Error enviando email:', error);
      throw new Error('Error al enviar el email');
    }
  }

  async verifyConnection(): Promise<{ success: boolean; error?: string }> {
    try {
      await this.transporter.verify();
      this.logger.log('✅ Conexión SMTP verificada correctamente');
      return { success: true };
    } catch (error: any) {
      this.logger.error('❌ Error en la conexión SMTP:', error);
      return {
        success: false,
        error: error?.message || String(error),
      };
    }
  }
}
