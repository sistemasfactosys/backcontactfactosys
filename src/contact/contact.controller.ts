import {
  Body,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/create-contact.dto';

@ApiTags('Contact') // Agrupa estos endpoints en Swagger bajo "Contact"
@Controller('api/contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Enviar solicitud de contacto',
    description:
      'Este endpoint recibe los datos de un formulario de contacto y envía el mensaje por correo electrónico.',
  })
  @ApiBody({
    description: 'Datos del formulario de contacto',
    type: ContactDto,
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
          message:
            'Hola, me gustaría recibir más información sobre sus servicios de desarrollo web.',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Mensaje enviado correctamente.',
    schema: {
      example: {
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
        timestamp: '2025-08-15T17:30:00.000Z',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error interno al procesar la solicitud.',
    schema: {
      example: {
        success: false,
        message:
          'Error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
        error: 'Error detallado solo en entorno de desarrollo',
      },
    },
  })
  async submitContact(@Body() contactData: ContactDto) {
    this.logger.log(`Nueva solicitud de contacto de: ${contactData.email}`);

    try {
      await this.contactService.processContactSubmission(contactData);

      return {
        success: true,
        message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      this.logger.error('Error procesando contacto:', error);
      throw new HttpException(
        {
          success: false,
          message:
            'Error al procesar tu solicitud. Por favor, inténtalo de nuevo.',
          error:
            process.env.NODE_ENV === 'development' ? error.message : undefined,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('test-connection')
  @ApiOperation({
    summary: 'Probar conexión SMTP',
    description:
      'Este endpoint permite verificar si el servidor SMTP está funcionando correctamente para enviar correos.',
  })
  @ApiResponse({
    status: 200,
    description: 'Resultado de la prueba de conexión SMTP.',
    schema: {
      example: {
        success: true,
        message: 'Conexión SMTP exitosa',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Error al intentar probar la conexión SMTP.',
    schema: {
      example: {
        success: false,
        message: 'Error al probar la conexión',
        error: 'Mensaje de error detallado',
      },
    },
  })
  async testEmailConnection() {
    try {
      const isConnected = await this.contactService.testEmailConnection();
      return {
        success: isConnected,
        message: isConnected
          ? 'Conexión SMTP exitosa'
          : 'Error en la conexión SMTP',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: 'Error al probar la conexión',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
