export interface CreferralUI {
    refId ?: string;
    referrerUserId: string;
    referredUserId: string;
    patientUserId: string;
    state: number;
    msgReferral ?: string;
    msgAccept ?: string;
    msgDecline ?: string;
    lastModified ?: string;
    dtCreate ?: string;
}
