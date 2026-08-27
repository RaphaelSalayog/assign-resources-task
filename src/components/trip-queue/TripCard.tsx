import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Badge, Card, Tag, Typography } from "antd";
import type { Trip, TripStatus } from "../../types";

const { Text } = Typography;

const statusPresentation: Record<
    TripStatus,
    { label: string; badge: "default" | "error" | "processing" | "success" | "warning" }
> = {
    TRIP_PLANNED: { label: "Trip planned", badge: "warning" },
    RESOURCES_ASSIGNED: { label: "Resources assigned", badge: "processing" },
    DRIVER_CONFIRMED: { label: "Driver confirmed", badge: "success" },
    DRIVER_DECLINED: { label: "Driver declined", badge: "error" },
};

interface TripCardProps {
    trip: Trip;
    selected: boolean;
    onSelect: (id: string) => void;
}

export function TripCard({ trip, selected, onSelect }: TripCardProps) {
    const status = statusPresentation[trip.status];

    return (
        <Card
            className={`trip-card${selected ? " trip-card-selected" : ""}`}
            hoverable
            role="button"
            tabIndex={0}
            aria-pressed={selected}
            onClick={() => onSelect(trip.id)}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSelect(trip.id);
                }
            }}
        >
            <div className="trip-card-topline">
                <div>
                    <Text className="trip-order-ref">{trip.orderRef}</Text>
                    <Text className="trip-client">{trip.client}</Text>
                </div>
                <Badge status={status.badge} text={status.label} />
            </div>

            <div className="trip-route" aria-label={`${trip.pickup} to ${trip.delivery}`}>
                <span>{trip.pickup}</span>
                <ArrowRightOutlined />
                <span>{trip.delivery}</span>
            </div>

            <div className="trip-card-meta">
                <span>
                    <CalendarOutlined /> {trip.requestedWindow}
                </span>
                <Tag icon={<TruckOutlined />}>{trip.vehicleRequirement}</Tag>
            </div>
        </Card>
    );
}
