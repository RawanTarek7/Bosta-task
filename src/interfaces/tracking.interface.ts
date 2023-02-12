
    export interface CurrentStatus {
        state: string;
        timestamp: Date;
    }

    export interface TransitEvent {
        state: string;
        timestamp: Date;
        hub: string;
        reason: string;
    }

    export interface ITracking {
        provider: string;
        CurrentStatus: CurrentStatus;
        PromisedDate: Date;
        TrackingNumber: string;
        TrackingURL: string;
        SupportPhoneNumbers: string[];
        TransitEvents: TransitEvent[];
        CreateDate: Date;
    }

