import { ContactDto } from './dto/create-contact.dto';
import { EmailService } from './email.service';
export declare class ContactService {
    private readonly emailService;
    private readonly logger;
    constructor(emailService: EmailService);
    processContactSubmission(contactData: ContactDto): Promise<void>;
    testEmailConnection(): Promise<boolean>;
}
