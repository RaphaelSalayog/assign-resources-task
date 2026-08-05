import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import { Table, Typography } from "antd";
import type { TableProps } from "antd";
import { assignmentStatus } from "../../data/shipmentStatus";
import type { Driver, ShipmentRecord, Vehicle } from "../../types";
import { ShipmentStatusTag } from "./ShipmentStatusTag";

const { Text } = Typography;

interface ShipmentTableProps {
    records: ShipmentRecord[];
    selectedTripId?: string;
    drivers: Driver[];
    vehicles: Vehicle[];
    onSelect: (tripId: string) => void;
}

export function ShipmentTable({
    records,
    selectedTripId,
    drivers,
    vehicles,
    onSelect,
}: ShipmentTableProps) {
    const driverMap = new Map(drivers.map((driver) => [driver.id, driver]));
    const vehicleMap = new Map(vehicles.map((vehicle) => [vehicle.id, vehicle]));

    const columns: TableProps<ShipmentRecord>["columns"] = [
        {
            title: "Shipment",
            key: "shipment",
            width: 178,
            render: (_, record) => (
                <div className="shipment-cell-primary">
                    <Text strong>{record.trip.orderRef}</Text>
                    <Text type="secondary">{record.trip.client}</Text>
                </div>
            ),
        },
        {
            title: "Route",
            key: "route",
            width: 220,
            render: (_, record) => (
                <div className="shipment-route-cell">
                    <Text>{record.trip.pickup}</Text>
                    <ArrowRightOutlined />
                    <Text>{record.trip.delivery}</Text>
                </div>
            ),
        },
        {
            title: "Assignment",
            key: "assignment",
            width: 156,
            render: (_, record) => <ShipmentStatusTag status={record.trip.status} />,
            filters: Object.entries(assignmentStatus).map(([value, text]) => ({ text, value })),
            onFilter: (value, record) => record.trip.status === value,
        },
        {
            title: "Driver / vehicle",
            key: "resources",
            width: 188,
            responsive: ["xl"],
            render: (_, record) => {
                const driver = record.trip.assignedDriverId
                    ? driverMap.get(record.trip.assignedDriverId)
                    : undefined;
                const vehicle = record.trip.assignedVehicleId
                    ? vehicleMap.get(record.trip.assignedVehicleId)
                    : undefined;
                return (
                    <div className="shipment-cell-primary">
                        <Text>{driver?.name ?? "Not assigned"}</Text>
                        <Text type="secondary">{vehicle?.plateNumber ?? "Vehicle pending"}</Text>
                    </div>
                );
            },
        },
        {
            title: "ETA",
            key: "eta",
            width: 138,
            render: (_, record) => (
                <div className="shipment-cell-primary">
                    <Text strong>{record.visibility.eta}</Text>
                    <Text type="secondary">Updated {record.visibility.lastUpdated}</Text>
                </div>
            ),
        },
    ];

    return (
        <Table<ShipmentRecord>
            className="shipments-table"
            columns={columns}
            dataSource={records}
            pagination={false}
            rowKey={(record) => record.trip.id}
            rowClassName={(record) => record.trip.id === selectedTripId ? "shipment-row-selected" : ""}
            onRow={(record) => ({
                role: "button",
                tabIndex: 0,
                "aria-label": `View ${record.trip.orderRef}`,
                onClick: () => onSelect(record.trip.id),
                onKeyDown: (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(record.trip.id);
                    }
                },
            })}
        />
    );
}
