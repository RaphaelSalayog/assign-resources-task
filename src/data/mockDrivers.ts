import type { Driver } from "../types";

export const mockDrivers: Driver[] = [
    {
        id: "driver-001",
        name: "Ethan Lim",
        licenseClass: "Class 4",
        status: "AVAILABLE",
        currentLocation: "Tuas South · 5 km away",
    },
    {
        id: "driver-002",
        name: "Nur Aisyah",
        licenseClass: "Class 4",
        status: "ON_TRIP",
        currentLocation: "Woodlands · On trip",
    },
    {
        id: "driver-003",
        name: "Marcus Tan",
        licenseClass: "Class 4",
        status: "AVAILABLE",
        currentLocation: "Jurong West · 6 km away",
        conflictTripRef: "ORD-260806-1036",
    },
    {
        id: "driver-004",
        name: "Ravi Kumar",
        licenseClass: "Class 3",
        status: "ON_TRIP",
        currentLocation: "Paya Lebar · On trip",
    },
    {
        id: "driver-005",
        name: "Sofia Chen",
        licenseClass: "Class 3",
        status: "AVAILABLE",
        currentLocation: "Changi North · 8 km away",
    },
    {
        id: "driver-006",
        name: "Daniel Wong",
        licenseClass: "Class 4",
        status: "OFF_DUTY",
        currentLocation: "Off duty",
    },
];
