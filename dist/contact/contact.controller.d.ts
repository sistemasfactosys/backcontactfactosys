import { ContactService } from './contact.service';
import { ContactDto } from './dto/create-contact.dto';
export declare class ContactController {
    private readonly contactService;
    private readonly logger;
    constructor(contactService: ContactService);
    submitContact(contactData: ContactDto): Promise<{
        success: boolean;
        message: string;
        timestamp: string;
    }>;
    testEmailConnection(): Promise<{
        success: boolean;
        message: string;
    }>;
}
