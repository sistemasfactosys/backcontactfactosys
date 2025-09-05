"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let EmailService = EmailService_1 = class EmailService {
    configService;
    logger = new common_1.Logger(EmailService_1.name);
    transporter;
    constructor(configService) {
        this.configService = configService;
        this.createTransporter();
    }
    createTransporter() {
        const host = this.configService.get('SMTP_HOST');
        const port = parseInt(this.configService.get('SMTP_PORT'), 10);
        const secure = this.configService.get('SMTP_SECURE') === 'true';
        const user = this.configService.get('SMTP_USER');
        const pass = this.configService.get('SMTP_PASS');
        this.logger.log(`Inicializando transporter con host=${host}, port=${port}, secure=${secure}, user=${user}`);
        this.transporter = nodemailer.createTransport({
            host,
            port,
            secure,
            auth: { user, pass },
        });
    }
    getServiceLabel(service) {
        const services = {
            'web-development': 'Desarrollo Web',
            'mobile-app': 'Aplicación Móvil',
            ecommerce: 'E-commerce',
            consulting: 'Consultoría Tecnológica',
            other: 'Otro',
        };
        return services[service] || service;
    }
    getBudgetLabel(budget) {
        const budgets = {
            '1000-5000': 'S/. 1,000 - S/. 5,000',
            '5000-10000': 'S/. 5,000 - S/. 10,000',
            '10000-25000': 'S/. 10,000 - S/. 25,000',
            '25000+': 'S/. 25,000+',
        };
        return budgets[budget] || 'No especificado';
    }
    async sendContactEmail(contactData) {
        const { name, email, phone, company, service, budget, message } = contactData;
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
        }
        catch (error) {
            this.logger.error('❌ Error enviando email:', error);
            throw new Error('Error al enviar el email');
        }
    }
    async verifyConnection() {
        try {
            await this.transporter.verify();
            this.logger.log('✅ Conexión SMTP verificada correctamente');
            return true;
        }
        catch (error) {
            this.logger.error('❌ Error en la conexión SMTP:', error);
            return false;
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = EmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], EmailService);
//# sourceMappingURL=email.service.js.map