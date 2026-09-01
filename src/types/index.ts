export type TripStatus =
    | "TRIP_PLANNED"
    | "RESOURCES_ASSIGNED"
    | "DRIVER_CONFIRMED"
    | "DRIVER_DECLINED"
    | "DISPATCHER_DECLINED";

export type AssignmentFlowStatus = "idle" | "ready" | "validating" | "assigned" | "error";

export interface GeoPoint {
    latitude: number;
    longitude: number;
}

export interface Trip {
    id: string;
    orderRef: string;
    client: string;
    pickup: string;
    delivery: string;
    pickupCoordinates: GeoPoint;
    deliveryCoordinates: GeoPoint;
    routeCoordinates?: GeoPoint[];
    requestedWindow: string;
    vehicleRequirement: string;
    routeConstraints?: string;
    status: TripStatus;
    assignedVehicleId?: string;
    assignedDriverId?: string;
    dispatchTime?: string;
}

export interface Vehicle {
    id: string;
    plateNumber: string;
    type: string;
    capacityKg: number;
    currentLocation: string;
    available: boolean;
}

export interface Driver {
    id: string;
    name: string;
    licenseClass: string;
    status: "AVAILABLE" | "ON_TRIP" | "OFF_DUTY";
    currentLocation: string;
    conflictTripRef?: string;
}

export type ShipmentMilestoneKey =
    | "ORDER_SUBMITTED"
    | "TRIP_PLANNED"
    | "RESOURCES_ASSIGNED"
    | "DRIVER_CONFIRMED"
    | "READY_FOR_PICKUP"
    | "DELIVERED";

export interface ShipmentMilestone {
    key: ShipmentMilestoneKey;
    title: string;
    description: string;
    timestamp?: string;
}

export interface ShipmentVisibility {
    tripId: string;
    eta: string;
    lastUpdated: string;
    serviceLevel: string;
    milestones: ShipmentMilestone[];
}

export interface ShipmentRecord {
    trip: Trip;
    visibility: ShipmentVisibility;
}
