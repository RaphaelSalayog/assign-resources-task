import { Tag } from "antd";
import { assignmentStatus, statusColor } from "../../data/shipmentStatus";
import type { TripStatus } from "../../types";

interface ShipmentStatusTagProps {
    status: TripStatus;
}

export function ShipmentStatusTag({ status }: ShipmentStatusTagProps) {
    return <Tag color={statusColor[status]}>{assignmentStatus[status]}</Tag>;
}
