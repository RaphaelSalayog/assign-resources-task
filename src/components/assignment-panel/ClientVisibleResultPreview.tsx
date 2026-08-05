import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import LockOutlined from "@ant-design/icons/LockOutlined";
import SendOutlined from "@ant-design/icons/SendOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Avatar, Tag, Typography } from "antd";
import type { Driver, Trip, Vehicle } from "../../types";

const { Text, Title } = Typography;

interface ClientVisibleResultPreviewProps {
    trip: Trip;
    vehicle?: Vehicle;
    driver?: Driver;
    assigned: boolean;
}

export function ClientVisibleResultPreview({
    trip,
    vehicle,
    driver,
    assigned,
}: ClientVisibleResultPreviewProps) {
    return (
        <section className={`client-preview${assigned ? " client-preview-success" : ""}`} aria-labelledby="client-preview-title">
            <div className="preview-heading">
                <div>
                    <Text id="client-preview-title" className="section-kicker">Client-visible result</Text>
                    <Text type="secondary">Shipment tracking preview</Text>
                </div>
                <SendOutlined />
            </div>

            {assigned && vehicle && driver ? (
                <div className="preview-success-content">
                    <CheckCircleFilled className="preview-success-icon" />
                    <div>
                        <Tag color="success">Resources assigned</Tag>
                        <Title level={4}>Vehicle and driver assigned</Title>
                        <Text type="secondary">{trip.orderRef} is ready for driver confirmation.</Text>
                    </div>
                    <div className="preview-resource-row">
                        <Avatar icon={<TruckOutlined />} />
                        <div>
                            <Text strong>{vehicle.plateNumber}</Text>
                            <Text type="secondary">{vehicle.type}</Text>
                        </div>
                        <Avatar>{driver.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</Avatar>
                        <div>
                            <Text strong>{driver.name}</Text>
                            <Text type="secondary">Assigned driver</Text>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="preview-locked">
                    <span className="preview-lock-icon"><LockOutlined /></span>
                    <Text strong>Preview pending assignment</Text>
                    <Text type="secondary">The client update will appear after all dispatch checks pass.</Text>
                </div>
            )}
        </section>
    );
}
