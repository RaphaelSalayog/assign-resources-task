import type { Dayjs } from "dayjs";
import {
    Alert,
    Button,
    Card,
    Empty,
    Space,
    Tag,
    Typography,
} from "antd";
import CheckCircleOutlined from "@ant-design/icons/CheckCircleOutlined";
import ThunderboltOutlined from "@ant-design/icons/ThunderboltOutlined";
import type {
    AssignmentFlowStatus,
    Driver,
    Trip,
    TripStatus,
    Vehicle,
} from "../../types";
import { AssignmentForm } from "./AssignmentForm";
import { ClientVisibleResultPreview } from "./ClientVisibleResultPreview";
import { PlatformActivityChecklist } from "./PlatformActivityChecklist";
import { TripSummary } from "./TripSummary";

const { Text, Title } = Typography;

const statusLabels: Record<TripStatus, { label: string; color: string }> = {
    AWAITING_PLANNING: { label: "Awaiting planning", color: "default" },
    TRIP_PLANNED: { label: "Trip planned", color: "warning" },
    RESOURCES_ASSIGNED: { label: "Resources assigned", color: "processing" },
    DRIVER_CONFIRMED: { label: "Driver confirmed", color: "success" },
};

interface AssignmentPanelProps {
    trip?: Trip;
    vehicles: Vehicle[];
    drivers: Driver[];
    vehicleId?: string;
    driverId?: string;
    dispatchTime: Dayjs | null;
    flowStatus: AssignmentFlowStatus;
    activityStep: number;
    errorMessage?: string;
    onVehicleChange: (value?: string) => void;
    onDriverChange: (value?: string) => void;
    onDispatchTimeChange: (value: Dayjs | null) => void;
    onAssign: () => void;
}

export function AssignmentPanel({
    trip,
    vehicles,
    drivers,
    vehicleId,
    driverId,
    dispatchTime,
    flowStatus,
    activityStep,
    errorMessage,
    onVehicleChange,
    onDriverChange,
    onDispatchTimeChange,
    onAssign,
}: AssignmentPanelProps) {
    if (!trip) {
        return (
            <Card className="assignment-panel assignment-panel-empty">
                <Empty description="Select a trip to assign resources" />
            </Card>
        );
    }

    const status = statusLabels[trip.status];
    const isExistingAssignment = trip.status === "RESOURCES_ASSIGNED" || trip.status === "DRIVER_CONFIRMED";
    const isAssigned = flowStatus === "assigned" || isExistingAssignment;
    const isValidating = flowStatus === "validating";
    const canAssign = trip.status === "TRIP_PLANNED" && Boolean(vehicleId && driverId && dispatchTime) && !isValidating;
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    const selectedDriver = drivers.find((driver) => driver.id === driverId);

    return (
        <main className="assignment-panel" aria-label="Resource assignment workspace">
            <div className="assignment-header">
                <div>
                    <div className="assignment-eyebrow">Assignment workspace</div>
                    <Space align="center" wrap>
                        <Title level={2}>{trip.orderRef}</Title>
                        <Tag color={status.color}>{status.label}</Tag>
                    </Space>
                    <Text type="secondary">Assign the right vehicle and driver, then dispatch with confidence.</Text>
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
                disabled={isValidating || isExistingAssignment || flowStatus === "assigned"}
                onVehicleChange={onVehicleChange}
                onDriverChange={onDriverChange}
                onDispatchTimeChange={onDispatchTimeChange}
            />

            {errorMessage ? (
                <Alert
                    className="conflict-alert"
                    type="error"
                    showIcon
                    title="Driver schedule conflict detected"
                    description={errorMessage}
                    action={<Button size="small" onClick={() => onDriverChange(undefined)}>Choose another driver</Button>}
                />
            ) : null}

            <div className="validation-grid">
                <PlatformActivityChecklist flowStatus={flowStatus} activeStep={activityStep} />
                <ClientVisibleResultPreview
                    trip={trip}
                    vehicle={selectedVehicle}
                    driver={selectedDriver}
                    assigned={isAssigned}
                />
            </div>

            <div className="assignment-action-bar">
                <div className="action-assurance">
                    <CheckCircleOutlined />
                    <span>
                        <Text strong>Safe dispatch controls</Text>
                        <Text type="secondary">Availability, conflicts and notifications are checked automatically.</Text>
                    </span>
                </div>
                <Button
                    type="primary"
                    size="large"
                    icon={<ThunderboltOutlined />}
                    disabled={!canAssign || isAssigned}
                    loading={isValidating}
                    onClick={onAssign}
                >
                    {isAssigned ? "Resources assigned" : isValidating ? "Running checks" : "Assign resources"}
                </Button>
            </div>
        </main>
    );
}
