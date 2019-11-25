import { EventStatus } from './event-status';

export class EventStatistic {
    id: number;
    displayName: string;
    status: EventStatus;
    shortName: string;
    organizationId: number;
    allowedPaymentProxies: [];
    fileBlobId: string;
    availableSeats: number;
    expired: boolean;
    notAllocatedTickets: number;
    formattedEnd: string;
    notSoldTickets: number;
    soldTickets: number;
    checkedInTickets: number;
    pendingTickets: number;
    dynamicAllocation: number;
    releasedTickets: number;
    warningNeeded: boolean;
    formattedBegin: string;
    visibleForCurrentUser: boolean;
    displayStatistics: boolean;

}