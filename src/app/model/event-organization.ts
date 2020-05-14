import { Organization } from './organization';
import { Language } from './language';

export class EventOrganization {
    event: AlfioEvent;
    organization: Organization
}

export class AlfioEvent {
    ticketCategories: TicketCategory[];
    contentLanguages: Language[];

}

export class TicketCategory {
    id: number;
    name: string;
}