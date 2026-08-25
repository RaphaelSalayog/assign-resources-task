import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import UserOutlined from "@ant-design/icons/UserOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Empty, Tag, Timeline, Typography } from "antd";
import {
    assignmentStatus,
    dispatchStatus,
    milestoneRank,
    tripStatusRank,
} from "../../data/shipmentStatus";
import type { Driver, ShipmentRecord, Vehicle } from "../../types";
import { ShipmentStatusTag } from "./ShipmentStatusTag";

const { Text, Title } = Typography;

interface ShipmentDetailProps {
    record?: ShipmentRecord;
    drivers: Driver[];
    vehicles: Vehicle[];
}

export function ShipmentDetail({ record, drivers, vehicles }: ShipmentDetailProps) {
    if (!record) {
        return (
            <aside className="shipment-detail shipment-detail-empty">
                <Empty description="Select a shipment to view client visibility" />
            </aside>
        );
    }

    const { trip, visibility } = record;
    const driver = drivers.find((item) => item.id === trip.assignedDriverId);
    const vehicle = vehicles.find((item) => item.id === trip.assignedVehicleId);
    const currentRank = tripStatusRank[trip.status];
    const timelineItems = visibility.milestones.map((milestone) => {
        const rank = milestoneRank[milestone.key];
        const complete = rank <= currentRank;
        const current = rank === currentRank + 1;
        const timestamp = milestone.timestamp
            ?? (complete ? `Updated ${visibility.lastUpdated}` : "Pending");

        return {
            color: complete ? "green" : current ? "orange" : "gray",
            dot: complete ? <CheckCircleFilled /> : current ? <ClockCircleOutlined /> : undefined,
            content: (
                <div className={`shipment-timeline-item${complete ? " shipment-timeline-complete" : ""}`}>
                    <Text strong={complete || current}>{milestone.title}</Text>
                    <Text type="secondary">{milestone.description}</Text>
                    <Text className="shipment-timeline-time">{timestamp}</Text>
                </div>
            ),
        };
    });

    return (
        <aside className="shipment-detail" aria-label={`Shipment visibility for ${trip.orderRef}`}>
            <div className="shipment-detail-header">
                <div>
                    <div className="assignment-eyebrow">Client tracking view</div>
                    <Title
                        level={3}
                        styles={{ action: { fontSize: 12 } }}
                        copyable={{
                            text: trip.orderRef,
                            tooltips: ["Copy text", "Text copied!"],
                        }}
                    >
                        {trip.orderRef}
                    </Title>
                    <Text type="secondary">{trip.client}</Text>
                </div>
                <ShipmentStatusTag status={trip.status} />
            </div>

            <section className="tracking-preview" aria-labelledby="tracking-preview-title">
                <div className="section-heading-row">
                    <div>
                        <Text id="tracking-preview-title" className="section-kicker">Shipment tracking preview</Text>
                        <Text type="secondary">Last updated {visibility.lastUpdated}</Text>
                    </div>
                    <Tag>{visibility.serviceLevel}</Tag>
                </div>
                <div className="tracking-route">
                    <span className="tracking-point tracking-point-start"><EnvironmentOutlined /></span>
                    <span className="tracking-line"><span /></span>
                    <span className="tracking-point tracking-point-end"><EnvironmentOutlined /></span>
                </div>
                <div className="tracking-route-labels">
                    <span><Text type="secondary">Pickup</Text><Text strong>{trip.pickup}</Text></span>
                    <span><Text type="secondary">Delivery</Text><Text strong>{trip.delivery}</Text></span>
                </div>
            </section>

            <section className="visibility-facts" aria-label="Shipment assignment and dispatch details">
                <div className="visibility-fact">
                    <span className="visibility-fact-icon"><CheckCircleFilled /></span>
                    <span><Text type="secondary">Assignment status</Text><Text strong>{assignmentStatus[trip.status]}</Text></span>
                </div>
                <div className="visibility-fact">
                    <span className="visibility-fact-icon"><ClockCircleOutlined /></span>
                    <span><Text type="secondary">Dispatch status</Text><Text strong>{dispatchStatus[trip.status]}</Text></span>
                </div>
                <div className="visibility-fact">
                    <span className="visibility-fact-icon"><UserOutlined /></span>
                    <span><Text type="secondary">Driver</Text><Text strong>{driver?.name ?? "Awaiting assignment"}</Text></span>
                </div>
                <div className="visibility-fact">
                    <span className="visibility-fact-icon"><TruckOutlined /></span>
                    <span><Text type="secondary">Vehicle</Text><Text strong>{vehicle?.plateNumber ?? "Awaiting assignment"}</Text></span>
                </div>
                <div className="visibility-fact visibility-fact-wide">
                    <span className="visibility-fact-icon"><ClockCircleOutlined /></span>
                    <span><Text type="secondary">Estimated arrival</Text><Text strong>{visibility.eta}</Text></span>
                </div>
            </section>

            <section className="status-timeline" aria-labelledby="status-timeline-title">
                <div className="section-heading-row">
                    <div>
                        <Text id="status-timeline-title" className="section-kicker">Timeline and status updates</Text>
                        <Text type="secondary">Order-to-delivery milestones</Text>
                    </div>
                </div>
                <Timeline items={timelineItems} />
            </section>
        </aside>
    );
}
