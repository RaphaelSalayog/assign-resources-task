import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import RadarChartOutlined from "@ant-design/icons/RadarChartOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Typography } from "antd";
import type { Trip } from "../../types";

const { Text } = Typography;

interface ShipmentMetricsProps {
    trips: Trip[];
}

export function ShipmentMetrics({ trips }: ShipmentMetricsProps) {
    const active = trips.length;
    const needsAssignment = trips.filter(
        (trip) => trip.status === "TRIP_PLANNED" || trip.status === "DRIVER_DECLINED"
    ).length;
    const assigned = trips.filter((trip) => trip.status === "RESOURCES_ASSIGNED").length;
    const confirmed = trips.filter((trip) => trip.status === "DRIVER_CONFIRMED").length;

    return (
        <div className="client-metrics" aria-label="Shipment visibility summary">
            <div className="client-metric-card">
                <span className="metric-icon metric-icon-primary"><RadarChartOutlined /></span>
                <span><Text strong>{active}</Text><Text type="secondary">Total Trips</Text></span>
            </div>
            <div className="client-metric-card">
                <span className="metric-icon metric-icon-warning"><ClockCircleOutlined /></span>
                <span><Text strong>{needsAssignment}</Text><Text type="secondary">Needs assignment</Text></span>
            </div>
            <div className="client-metric-card">
                <span className="metric-icon metric-icon-primary"><TruckOutlined /></span>
                <span><Text strong>{assigned}</Text><Text type="secondary">Resources assigned</Text></span>
            </div>
            <div className="client-metric-card">
                <span className="metric-icon metric-icon-success"><CheckCircleFilled /></span>
                <span><Text strong>{confirmed}</Text><Text type="secondary">Driver confirmed</Text></span>
            </div>
        </div>
    );
}
