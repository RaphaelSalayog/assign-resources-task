import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import FlagOutlined from "@ant-design/icons/FlagOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Typography } from "antd";
import type { Trip } from "../../types";
import { TripRouteMap } from "./TripRouteMap";

const { Text } = Typography;

interface TripSummaryProps {
    trip: Trip;
}

export function TripSummary({ trip }: TripSummaryProps) {
    return (
        <section className="trip-summary" aria-labelledby="trip-summary-title">
            <div className="section-heading-row">
                <div>
                    <Text id="trip-summary-title" className="section-kicker">Trip summary</Text>
                    <Text type="secondary">Minimum required dispatch data</Text>
                </div>
                <Text type="secondary">Client: {trip.client}</Text>
            </div>

            <TripRouteMap
                pickup={trip.pickup}
                delivery={trip.delivery}
                pickupCoordinates={trip.pickupCoordinates}
                deliveryCoordinates={trip.deliveryCoordinates}
                routeCoordinates={trip.routeCoordinates}
            />

            <div className="summary-grid">
                <div className="summary-item summary-route-item">
                    <span className="summary-icon"><EnvironmentOutlined /></span>
                    <div>
                        <Text type="secondary">Route</Text>
                        <Text strong>{trip.pickup} → {trip.delivery}</Text>
                    </div>
                </div>
                <div className="summary-item">
                    <span className="summary-icon"><TruckOutlined /></span>
                    <div>
                        <Text type="secondary">Vehicle requirement</Text>
                        <Text strong>{trip.vehicleRequirement}</Text>
                    </div>
                </div>
                <div className="summary-item">
                    <span className="summary-icon"><CalendarOutlined /></span>
                    <div>
                        <Text type="secondary">Pickup date</Text>
                        <Text strong>{trip.pickupDate}</Text>
                    </div>
                </div>
                <div className="summary-item">
                    <span className="summary-icon"><CalendarOutlined /></span>
                    <div>
                        <Text type="secondary">Delivery date</Text>
                        <Text strong>{trip.deliveryDate}</Text>
                    </div>
                </div>
                <div className="summary-item">
                    <span className="summary-icon"><ClockCircleOutlined /></span>
                    <div>
                        <Text type="secondary">Requested window</Text>
                        <Text strong>{trip.requestedWindow}</Text>
                    </div>
                </div>
                <div className="summary-item">
                    <span className="summary-icon"><FlagOutlined /></span>
                    <div>
                        <Text type="secondary">Route constraints</Text>
                        <Text strong>{trip.routeConstraints ?? "Standard route"}</Text>
                    </div>
                </div>
            </div>
        </section>
    );
}
