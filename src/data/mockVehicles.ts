import type { Vehicle } from "../types";

export const mockVehicles: Vehicle[] = [
    {
        id: "vehicle-001",
        plateNumber: "GBK 4821L",
        type: "14ft box truck",
        capacityKg: 3000,
        currentLocation: "Tuas South · 4 km away",
        available: true,
    },
    {
        id: "vehicle-002",
        plateNumber: "GBJ 9136R",
        type: "Refrigerated truck",
        capacityKg: 2800,
        currentLocation: "Jurong Port · 7 km away",
        available: true,
    },
    {
        id: "vehicle-003",
        plateNumber: "GBC 2048U",
        type: "10ft box truck",
        capacityKg: 1800,
        currentLocation: "Paya Lebar · On route",
        available: false,
    },
    {
        id: "vehicle-004",
        plateNumber: "GBL 7712K",
        type: "24ft curtain-sider",
        capacityKg: 9000,
        currentLocation: "Woodlands · On route",
        available: false,
    },
    {
        id: "vehicle-005",
        plateNumber: "GBA 5569P",
        type: "Cargo van",
        capacityKg: 1200,
        currentLocation: "Changi North · 9 km away",
        available: true,
    },
    {
        id: "vehicle-006",
        plateNumber: "GBM 3307D",
        type: "14ft box truck",
        capacityKg: 3200,
        currentLocation: "Pioneer · Maintenance bay",
        available: false,
    },
];
