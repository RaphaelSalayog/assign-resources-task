import type { ShipmentMilestone, ShipmentVisibility } from "../types";

const baseMilestones: ShipmentMilestone[] = [
    {
        key: "ORDER_SUBMITTED",
        title: "Order submitted",
        description: "Shipment request accepted and queued for planning.",
        timestamp: "Aug 5 · 8:15 AM",
    },
    {
        key: "TRIP_PLANNED",
        title: "Trip planned",
        description: "Route, service window and vehicle requirement confirmed.",
        timestamp: "Aug 5 · 10:40 AM",
    },
    {
        key: "RESOURCES_ASSIGNED",
        title: "Resources assigned",
        description: "Vehicle and driver allocated by Dispatch.",
    },
    {
        key: "DRIVER_CONFIRMED",
        title: "Driver confirmed",
        description: "Driver accepted the trip instructions.",
    },
    {
        key: "READY_FOR_PICKUP",
        title: "Ready for pickup",
        description: "Shipment is queued for pickup operations.",
    },
    {
        key: "DELIVERED",
        title: "Delivered",
        description: "Delivery confirmation and proof of delivery recorded.",
    },
];

function milestonesWith(overrides: Partial<Record<string, string>> = {}): ShipmentMilestone[] {
    return baseMilestones.map((milestone) => ({
        ...milestone,
        timestamp: overrides[milestone.key] ?? milestone.timestamp,
    }));
}

export const mockShipmentVisibility: ShipmentVisibility[] = [
    {
        tripId: "trip-001",
        eta: "Aug 6 · 10:35 AM",
        lastUpdated: "2 min ago",
        serviceLevel: "Standard same-day",
        milestones: milestonesWith(),
    },
    {
        tripId: "trip-002",
        eta: "Aug 6 · 11:50 AM",
        lastUpdated: "8 min ago",
        serviceLevel: "Cold-chain priority",
        milestones: milestonesWith({ TRIP_PLANNED: "Aug 5 · 11:05 AM" }),
    },
    {
        tripId: "trip-003",
        eta: "Aug 6 · 2:15 PM",
        lastUpdated: "14 min ago",
        serviceLevel: "Medical priority",
        milestones: milestonesWith({ TRIP_PLANNED: "Aug 5 · 11:42 AM" }),
    },
    {
        tripId: "trip-004",
        eta: "Aug 6 · 9:40 AM",
        lastUpdated: "Just now",
        serviceLevel: "Scheduled delivery",
        milestones: milestonesWith({ RESOURCES_ASSIGNED: "Aug 5 · 12:20 PM" }),
    },
    {
        tripId: "trip-005",
        eta: "Aug 6 · 8:45 AM",
        lastUpdated: "1 min ago",
        serviceLevel: "Fragile handling",
        milestones: milestonesWith({
            RESOURCES_ASSIGNED: "Aug 5 · 11:10 AM",
            DRIVER_CONFIRMED: "Aug 5 · 11:18 AM",
        }),
    },
    {
        tripId: "trip-006",
        eta: "Aug 6 · 4:35 PM",
        lastUpdated: "22 min ago",
        serviceLevel: "Standard same-day",
        milestones: milestonesWith({ TRIP_PLANNED: "Aug 5 · 12:05 PM" }),
    },
    {
        tripId: "trip-007",
        eta: "Pending planning",
        lastUpdated: "31 min ago",
        serviceLevel: "Secure cargo",
        milestones: milestonesWith(),
    },
];
