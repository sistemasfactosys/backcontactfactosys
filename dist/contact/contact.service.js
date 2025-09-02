"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var ContactService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("./email.service");
let ContactService = ContactService_1 = class ContactService {
    emailService;
    logger = new common_1.Logger(ContactService_1.name);
    constructor(emailService) {
        this.emailService = emailService;
    }
    async processContactSubmission(contactData) {
        this.logger.log(`Procesando solicitud de: ${contactData.name} (${contactData.email})`);
        try {
            await this.emailService.sendContactEmail(contactData);
            this.logger.log(`Solicitud procesada exitosamente para: ${contactData.email}`);
        }
        catch (error) {
            this.logger.error(`Error procesando solicitud de ${contactData.email}:`, error);
            throw error;
        }
    }
    async testEmailConnection() {
        return await this.emailService.verifyConnection();
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = ContactService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [email_service_1.EmailService])
], ContactService);
//# sourceMappingURL=contact.service.js.map