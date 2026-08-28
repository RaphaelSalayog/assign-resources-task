import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import CloseCircleFilled from "@ant-design/icons/CloseCircleFilled";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { App, Breadcrumb, Typography } from "antd";
import dayjs, { type Dayjs } from "dayjs";
import { useState } from "react";
import { AssignmentPanel } from "../components/assignment-panel/AssignmentPanel";
import { TripQueue } from "../components/trip-queue/TripQueue";
import { mockDrivers } from "../data/mockDrivers";
import { mockVehicles } from "../data/mockVehicles";
import type { AssignmentFlowStatus, Trip } from "../types";

const { Text, Title } = Typography;

const delay = (milliseconds: number) =>
    new Promise((resolve) => window.setTimeout(resolve, milliseconds));

interface AssignResourcesPageProps {
    trips: Trip[];
    onTripUpdate: (tripId: string, updates: Partial<Trip>) => void;
}

export function AssignResourcesPage({ trips, onTripUpdate }: AssignResourcesPageProps) {
    const { message, modal, notification } = App.useApp();
    const [selectedTripId, setSelectedTripId] = useState<string>("trip-001");
    const [vehicleId, setVehicleId] = useState<string>();
    const [driverId, setDriverId] = useState<string>();
    const [dispatchTime, setDispatchTime] = useState<Dayjs | null>(() =>
        dayjs().add(30, "minute").startOf("minute")
    );
    const [flowStatus, setFlowStatus] = useState<AssignmentFlowStatus>("idle");

    const selectedTrip = trips.find((trip) => trip.id === selectedTripId);
    const needsAssignmentCount = trips.filter(
        (trip) => trip.status === "TRIP_PLANNED" || trip.status === "DRIVER_DECLINED"
    ).length;
    const assignedCount = trips.filter((trip) => trip.status === "RESOURCES_ASSIGNED").length;
    const confirmedCount = trips.filter((trip) => trip.status === "DRIVER_CONFIRMED").length;
    const dispatcherDeclinedCount = trips.filter(
        (trip) => trip.status === "DISPATCHER_DECLINED"
    ).length;

    const selectTrip = (id: string) => {
        const trip = trips.find((item) => item.id === id);
        setSelectedTripId(id);
        setVehicleId(
            trip?.status === "DISPATCHER_DECLINED" ? undefined : trip?.assignedVehicleId
        );
        setDriverId(
            trip?.status === "DRIVER_DECLINED" || trip?.status === "DISPATCHER_DECLINED"
                ? undefined
                : trip?.assignedDriverId
        );
        setDispatchTime(
            trip?.status === "DISPATCHER_DECLINED"
                ? null
                : trip?.dispatchTime
                ? dayjs(trip.dispatchTime)
                : dayjs().add(30, "minute").startOf("minute")
        );
        setFlowStatus(
            trip?.status === "RESOURCES_ASSIGNED" || trip?.status === "DRIVER_CONFIRMED"
                ? "assigned"
                : "idle"
        );
    };

    const handleVehicleChange = (value?: string) => {
        setVehicleId(value);
        setFlowStatus(value && driverId ? "ready" : "idle");
    };

    const handleDriverChange = (value?: string) => {
        setDriverId(value);
        setFlowStatus(value && vehicleId ? "ready" : "idle");
    };

    const assignResources = async () => {
        if (!selectedTrip || !vehicleId || !driverId || !dispatchTime) return;

        const driver = mockDrivers.find((item) => item.id === driverId);
        setFlowStatus("validating");

        await delay(750);

        if (driver?.conflictTripRef) {
            setFlowStatus("error");
            notification.error({
                key: "driver-schedule-conflict",
                message: "Driver schedule conflict detected",
                description: `${driver.name} has an overlapping assignment on ${driver.conflictTripRef}. Select another available driver to continue.`,
                showProgress: true,
                duration: 10,
            });
            return;
        }

        await delay(650);

        onTripUpdate(selectedTrip.id, {
            status: "RESOURCES_ASSIGNED",
            assignedVehicleId: vehicleId,
            assignedDriverId: driverId,
            dispatchTime: dispatchTime.toISOString(),
        });
        setFlowStatus("assigned");
        message.success(`${selectedTrip.orderRef}: vehicle and driver assigned`);
    };

    const declineTrip = () => {
        if (
            !selectedTrip
            || (selectedTrip.status !== "TRIP_PLANNED"
                && selectedTrip.status !== "DRIVER_DECLINED")
        ) {
            return;
        }

        modal.confirm({
            title: "Decline trip?",
            content: `This will mark ${selectedTrip.orderRef} as declined by the dispatcher and clear its selected resources.`,
            okText: "Decline trip",
            okButtonProps: { danger: true },
            cancelText: "Cancel",
            onOk: () => {
                onTripUpdate(selectedTrip.id, {
                    status: "DISPATCHER_DECLINED",
                    assignedVehicleId: undefined,
                    assignedDriverId: undefined,
                    dispatchTime: undefined,
                });
                setVehicleId(undefined);
                setDriverId(undefined);
                setDispatchTime(null);
                setFlowStatus("idle");
                message.success(`${selectedTrip.orderRef}: trip declined by dispatcher`);
            },
        });
    };

    return (
        <div className="assign-resources-page">
            <Breadcrumb items={[{ title: "Dispatch Console" }, { title: "Assign Resources" }]} />

            <div className="page-title-row">
                <div>
                    <div className="page-kicker">
                        <TruckOutlined /> Order-to-delivery
                    </div>
                    <Title>Assign resources</Title>
                    <Text type="secondary">
                        Match every planned trip with an available vehicle and qualified driver.
                    </Text>
                </div>
                <div className="operations-summary" aria-label="Dispatch queue summary">
                    <div>
                        <span className="metric-icon metric-icon-warning">
                            <ClockCircleOutlined />
                        </span>
                        <span>
                            <Text strong>{needsAssignmentCount}</Text>
                            <Text type="secondary">To assign</Text>
                        </span>
                    </div>
                    <div>
                        <span className="metric-icon metric-icon-primary">
                            <TruckOutlined />
                        </span>
                        <span>
                            <Text strong>{assignedCount}</Text>
                            <Text type="secondary">Assigned</Text>
                        </span>
                    </div>
                    <div>
                        <span className="metric-icon metric-icon-success">
                            <CheckCircleFilled />
                        </span>
                        <span>
                            <Text strong>{confirmedCount}</Text>
                            <Text type="secondary">Confirmed</Text>
                        </span>
                    </div>
                    <div>
                        <span className="metric-icon metric-icon-error">
                            <CloseCircleFilled />
                        </span>
                        <span>
                            <Text strong>{dispatcherDeclinedCount}</Text>
                            <Text type="secondary">Declined</Text>
                        </span>
                    </div>
                </div>
            </div>

            <div className="dispatch-workspace">
                <TripQueue
                    trips={trips}
                    selectedTripId={selectedTripId}
                    onSelectTrip={selectTrip}
                />
                <AssignmentPanel
                    trip={selectedTrip}
                    vehicles={mockVehicles}
                    drivers={mockDrivers}
                    vehicleId={vehicleId}
                    driverId={driverId}
                    dispatchTime={dispatchTime}
                    flowStatus={flowStatus}
                    onVehicleChange={handleVehicleChange}
                    onDriverChange={handleDriverChange}
                    onDispatchTimeChange={setDispatchTime}
                    onAssign={assignResources}
                    onDecline={declineTrip}
                />
            </div>
        </div>
    );
}
