import type { ShipmentMilestoneKey, TripStatus } from "../types";

export const tripStatusRank: Record<TripStatus, number> = {
    TRIP_PLANNED: 1,
    RESOURCES_ASSIGNED: 2,
    DRIVER_CONFIRMED: 3,
    DRIVER_DECLINED: 2,
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
    TRIP_PLANNED: "Awaiting resources",
    RESOURCES_ASSIGNED: "Resources assigned",
    DRIVER_CONFIRMED: "Driver confirmed",
    DRIVER_DECLINED: "Driver declined",
};

export const dispatchStatus: Record<TripStatus, string> = {
    TRIP_PLANNED: "Ready for assignment",
    RESOURCES_ASSIGNED: "Awaiting driver",
    DRIVER_CONFIRMED: "Ready for pickup",
    DRIVER_DECLINED: "Reassignment required",
};

export const statusColor: Record<TripStatus, string> = {
    TRIP_PLANNED: "warning",
    RESOURCES_ASSIGNED: "processing",
    DRIVER_CONFIRMED: "success",
    DRIVER_DECLINED: "error",
};
