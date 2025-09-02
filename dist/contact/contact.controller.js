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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ContactController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const contact_service_1 = require("./contact.service");
const create_contact_dto_1 = require("./dto/create-contact.dto");
let ContactController = ContactController_1 = class ContactController {
    contactService;
    logger = new common_1.Logger(ContactController_1.name);
    constructor(contactService) {
        this.contactService = contactService;
    }
    async submitContact(contactData) {
        this.logger.log(`Nueva solicitud de contacto de: ${contactData.email}`);
        try {
            await this.contactService.processContactSubmission(contactData);
            return {
                success: true,
                message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
                timestamp: new Date().toISOString(),
            };
        }
        catch (error) {
            this.logger.error('Error procesando contacto:', error);
            throw new common_1.HttpException({
                success: false,
                message: 'Error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
                error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async testEmailConnection() {
        try {
            const isConnected = await this.contactService.testEmailConnection();
            return {
                success: isConnected,
                message: isConnected
                    ? 'Conexión SMTP exitosa'
                    : 'Error en la conexión SMTP',
            };
        }
        catch (error) {
            throw new common_1.HttpException({
                success: false,
                message: 'Error al probar la conexión',
                error: error.message,
            }, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.ContactController = ContactController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({
        summary: 'Enviar solicitud de contacto',
        description: 'Este endpoint recibe los datos de un formulario de contacto y envía el mensaje por correo electrónico.',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Datos del formulario de contacto',
        type: create_contact_dto_1.ContactDto,
        examples: {
            ejemplo: {
                summary: 'Ejemplo de datos de contacto',
                value: {
                    name: 'Juan Pérez',
                    email: 'juan.perez@example.com',
                    phone: '+51 987654321',
                    company: 'Tech Solutions',
                    service: 'web-development',
                    budget: '5000-10000',
                    message: 'Hola, me gustaría recibir más información sobre sus servicios de desarrollo web.',
                },
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Mensaje enviado correctamente.',
        schema: {
            example: {
                success: true,
                message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
                timestamp: '2025-08-15T17:30:00.000Z',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error interno al procesar la solicitud.',
        schema: {
            example: {
                success: false,
                message: 'Error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
                error: 'Error detallado solo en entorno de desarrollo',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contact_dto_1.ContactDto]),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "submitContact", null);
__decorate([
    (0, common_1.Post)('test-connection'),
    (0, swagger_1.ApiOperation)({
        summary: 'Probar conexión SMTP',
        description: 'Este endpoint permite verificar si el servidor SMTP está funcionando correctamente para enviar correos.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Resultado de la prueba de conexión SMTP.',
        schema: {
            example: {
                success: true,
                message: 'Conexión SMTP exitosa',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Error al intentar probar la conexión SMTP.',
        schema: {
            example: {
                success: false,
                message: 'Error al probar la conexión',
                error: 'Mensaje de error detallado',
            },
        },
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ContactController.prototype, "testEmailConnection", null);
exports.ContactController = ContactController = ContactController_1 = __decorate([
    (0, swagger_1.ApiTags)('Contact'),
    (0, common_1.Controller)('api/contact'),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ContactController);
//# sourceMappingURL=contact.controller.js.map