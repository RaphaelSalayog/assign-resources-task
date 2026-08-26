import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import CloseCircleOutlined from "@ant-design/icons/CloseCircleOutlined";
import ThunderboltOutlined from "@ant-design/icons/ThunderboltOutlined";
import { Button, Card, Empty, Space, Tag, Typography } from "antd";
import type { Dayjs } from "dayjs";
import type { AssignmentFlowStatus, Driver, Trip, TripStatus, Vehicle } from "../../types";
import { AssignmentForm } from "./AssignmentForm";
import { TripSummary } from "./TripSummary";

const { Text, Title } = Typography;

const statusLabels: Record<TripStatus, { label: string; color: string }> = {
    TRIP_PLANNED: { label: "Trip planned", color: "warning" },
    RESOURCES_ASSIGNED: { label: "Resources assigned", color: "processing" },
    DRIVER_CONFIRMED: { label: "Driver confirmed", color: "success" },
    DRIVER_DECLINED: { label: "Driver declined", color: "error" },
    DISPATCHER_DECLINED: { label: "Dispatcher declined", color: "error" },
};

interface AssignmentPanelProps {
    trip?: Trip;
    vehicles: Vehicle[];
    drivers: Driver[];
    vehicleId?: string;
    driverId?: string;
    dispatchTime: Dayjs | null;
    flowStatus: AssignmentFlowStatus;
    onVehicleChange: (value?: string) => void;
    onDriverChange: (value?: string) => void;
    onDispatchTimeChange: (value: Dayjs | null) => void;
    onAssign: () => void;
    onDecline: () => void;
}

export function AssignmentPanel({
    trip,
    vehicles,
    drivers,
    vehicleId,
    driverId,
    dispatchTime,
    flowStatus,
    onVehicleChange,
    onDriverChange,
    onDispatchTimeChange,
    onAssign,
    onDecline,
}: AssignmentPanelProps) {
    if (!trip) {
        return (
            <Card className="assignment-panel assignment-panel-empty">
                <Empty description="Select a trip to assign resources" />
            </Card>
        );
    }

    const status = statusLabels[trip.status];
    const isDeclined = trip.status === "DRIVER_DECLINED";
    const isDispatcherDeclined = trip.status === "DISPATCHER_DECLINED";
    const isExistingAssignment =
        trip.status === "RESOURCES_ASSIGNED" || trip.status === "DRIVER_CONFIRMED";
    const isAssigned = flowStatus === "assigned" || isExistingAssignment;
    const isValidating = flowStatus === "validating";
    const canAssign =
        (trip.status === "TRIP_PLANNED" || isDeclined) &&
        Boolean(vehicleId && driverId && dispatchTime) &&
        !isValidating;
    const canDecline =
        (trip.status === "TRIP_PLANNED" || isDeclined) && !isValidating;

    return (
        <main className="assignment-panel" aria-label="Resource assignment workspace">
            <div className="assignment-header">
                <div>
                    <div className="assignment-eyebrow">Assignment workspace</div>
                    <Space align="center" wrap>
                        <Title
                            level={2}
                            styles={{ action: { fontSize: 12 } }}
                            copyable={{
                                text: trip.orderRef,
                                tooltips: ["Copy text", "Text copied!"],
                            }}
                        >
                            {trip.orderRef}
                        </Title>
                        <Tag color={status.color}>{status.label}</Tag>
                    </Space>
                </div>
                <div className="header-trip-meta">
                    <Text type="secondary">Trip ID</Text>
                    <Text strong>{trip.id.toUpperCase()}</Text>
                </div>
            </div>

            <TripSummary trip={trip} />

            <AssignmentForm
                vehicles={vehicles}
                drivers={drivers}
                vehicleId={vehicleId}
                driverId={driverId}
                dispatchTime={dispatchTime}
                disabled={
                    isValidating
                    || isExistingAssignment
                    || isDispatcherDeclined
                    || flowStatus === "assigned"
                }
                onVehicleChange={onVehicleChange}
                onDriverChange={onDriverChange}
                onDispatchTimeChange={onDispatchTimeChange}
            />

            <div className="assignment-action-bar">
                <div className="assignment-request-status">
                    {isDispatcherDeclined ? (
                        <CloseCircleOutlined className="assignment-status-icon-declined" />
                    ) : (
                        <CheckCircleOutlined />
                    )}
                    <Text type="secondary">
                        {isDispatcherDeclined
                            ? "Trip declined by dispatcher"
                            : isValidating
                            ? "Validating assignment request…"
                            : "Ready to submit assignment"}
                    </Text>
                </div>
                <div className="assignment-actions">
                    <Button
                        className="assignment-decline-button"
                        danger
                        size="large"
                        icon={<CloseCircleOutlined />}
                        disabled={!canDecline}
                        onClick={onDecline}
                    >
                        Decline
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        icon={<ThunderboltOutlined />}
                        disabled={!canAssign || isAssigned}
                        loading={isValidating}
                        onClick={onAssign}
                    >
                        {isAssigned
                            ? "Resources assigned"
                            : isDispatcherDeclined
                              ? "Trip declined"
                              : isValidating
                                ? "Running checks"
                                : isDeclined
                                  ? "Reassign resources"
                                  : "Assign resources"}
                    </Button>
                </div>
            </div>
        </main>
    );
}
