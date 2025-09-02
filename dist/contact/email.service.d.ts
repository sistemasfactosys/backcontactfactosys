import { ConfigService } from '@nestjs/config';
import { ContactDto } from './dto/create-contact.dto';
export declare class EmailService {
    private configService;
    private readonly logger;
    private transporter;
    constructor(configService: ConfigService);
    private createTransporter;
    private getServiceLabel;
    private getBudgetLabel;
    sendContactEmail(contactData: ContactDto): Promise<void>;
    verifyConnection(): Promise<boolean>;
}
