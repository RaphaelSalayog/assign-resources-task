import type { ShipmentMilestoneKey, TripStatus } from "../types";

export const tripStatusRank: Record<TripStatus, number> = {
    AWAITING_PLANNING: 0,
    TRIP_PLANNED: 1,
    RESOURCES_ASSIGNED: 2,
    DRIVER_CONFIRMED: 3,
};

export const milestoneRank: Record<ShipmentMilestoneKey, number> = {
    ORDER_SUBMITTED: 0,
    TRIP_PLANNED: 1,
    RESOURCES_ASSIGNED: 2,
    DRIVER_CONFIRMED: 3,
    READY_FOR_PICKUP: 4,
    DELIVERED: 5,
};

export const assignmentStatus: Record<TripStatus, string> = {
    AWAITING_PLANNING: "Planning pending",
    TRIP_PLANNED: "Awaiting resources",
    RESOURCES_ASSIGNED: "Resources assigned",
    DRIVER_CONFIRMED: "Driver confirmed",
};

export const dispatchStatus: Record<TripStatus, string> = {
    AWAITING_PLANNING: "Not dispatch-ready",
    TRIP_PLANNED: "Ready for assignment",
    RESOURCES_ASSIGNED: "Awaiting driver",
    DRIVER_CONFIRMED: "Ready for pickup",
};

export const statusColor: Record<TripStatus, string> = {
    AWAITING_PLANNING: "default",
    TRIP_PLANNED: "warning",
    RESOURCES_ASSIGNED: "processing",
    DRIVER_CONFIRMED: "success",
};
