import ArrowRightOutlined from "@ant-design/icons/ArrowRightOutlined";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import { Card, Typography } from "antd";
import type { ShipmentRecord } from "../../types";
import { ShipmentStatusTag } from "./ShipmentStatusTag";

const { Text } = Typography;

interface ShipmentMobileListProps {
    records: ShipmentRecord[];
    selectedTripId?: string;
    onSelect: (tripId: string) => void;
}

export function ShipmentMobileList({ records, selectedTripId, onSelect }: ShipmentMobileListProps) {
    return (
        <div className="shipment-mobile-list">
            {records.map((record) => (
                <Card
                    key={record.trip.id}
                    className={`shipment-mobile-card${record.trip.id === selectedTripId ? " shipment-mobile-card-selected" : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelect(record.trip.id)}
                    onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            onSelect(record.trip.id);
                        }
                    }}
                >
                    <div className="mobile-shipment-heading">
                        <span>
                            <Text strong>{record.trip.orderRef}</Text>
                            <Text type="secondary">{record.trip.client}</Text>
                        </span>
                        <ShipmentStatusTag status={record.trip.status} />
                    </div>
                    <div className="mobile-shipment-route">
                        <Text>{record.trip.pickup}</Text>
                        <ArrowRightOutlined />
                        <Text>{record.trip.delivery}</Text>
                    </div>
                    <div className="mobile-shipment-eta">
                        <ClockCircleOutlined />
                        <Text>ETA {record.visibility.eta}</Text>
                    </div>
                </Card>
            ))}
        </div>
    );
}
