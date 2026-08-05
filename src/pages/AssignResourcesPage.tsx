import { useState } from "react";
import dayjs, { type Dayjs } from "dayjs";
import { App, Breadcrumb, Typography } from "antd";
import CheckCircleFilled from "@ant-design/icons/CheckCircleFilled";
import ClockCircleOutlined from "@ant-design/icons/ClockCircleOutlined";
import ThunderboltOutlined from "@ant-design/icons/ThunderboltOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { AssignmentPanel } from "../components/assignment-panel/AssignmentPanel";
import { TripQueue } from "../components/trip-queue/TripQueue";
import { mockDrivers } from "../data/mockDrivers";
import { mockTrips } from "../data/mockTrips";
import { mockVehicles } from "../data/mockVehicles";
import type { AssignmentFlowStatus, Trip } from "../types";

const { Text, Title } = Typography;

const delay = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export function AssignResourcesPage() {
    const { message } = App.useApp();
    const [trips, setTrips] = useState<Trip[]>(mockTrips);
    const [selectedTripId, setSelectedTripId] = useState<string>("trip-001");
    const [vehicleId, setVehicleId] = useState<string>();
    const [driverId, setDriverId] = useState<string>();
    const [dispatchTime, setDispatchTime] = useState<Dayjs | null>(() => dayjs().add(30, "minute").startOf("minute"));
    const [flowStatus, setFlowStatus] = useState<AssignmentFlowStatus>("idle");
    const [activityStep, setActivityStep] = useState(-1);
    const [errorMessage, setErrorMessage] = useState<string>();

    const selectedTrip = trips.find((trip) => trip.id === selectedTripId);
    const plannedCount = trips.filter((trip) => trip.status === "TRIP_PLANNED").length;
    const assignedCount = trips.filter((trip) => trip.status === "RESOURCES_ASSIGNED").length;
    const confirmedCount = trips.filter((trip) => trip.status === "DRIVER_CONFIRMED").length;

    const selectTrip = (id: string) => {
        const trip = trips.find((item) => item.id === id);
        setSelectedTripId(id);
        setVehicleId(trip?.assignedVehicleId);
        setDriverId(trip?.assignedDriverId);
        setDispatchTime(trip?.dispatchTime ? dayjs(trip.dispatchTime) : dayjs().add(30, "minute").startOf("minute"));
        setFlowStatus(trip?.status === "RESOURCES_ASSIGNED" || trip?.status === "DRIVER_CONFIRMED" ? "assigned" : "idle");
        setActivityStep(trip?.status === "RESOURCES_ASSIGNED" || trip?.status === "DRIVER_CONFIRMED" ? 4 : -1);
        setErrorMessage(undefined);
    };

    const handleVehicleChange = (value?: string) => {
        setVehicleId(value);
        setErrorMessage(undefined);
        setActivityStep(-1);
        setFlowStatus(value && driverId ? "ready" : "idle");
    };

    const handleDriverChange = (value?: string) => {
        setDriverId(value);
        setErrorMessage(undefined);
        setActivityStep(-1);
        setFlowStatus(value && vehicleId ? "ready" : "idle");
    };

    const assignResources = async () => {
        if (!selectedTrip || !vehicleId || !driverId || !dispatchTime) return;

        const driver = mockDrivers.find((item) => item.id === driverId);
        setErrorMessage(undefined);
        setFlowStatus("validating");

        setActivityStep(0);
        await delay(500);
        setActivityStep(1);
        await delay(650);

        if (driver?.conflictTripRef) {
            setFlowStatus("error");
            setErrorMessage(
                `${driver.name} has an overlapping assignment on ${driver.conflictTripRef}. Select another available driver to continue.`,
            );
            message.error("Assignment stopped: driver schedule conflict");
            return;
        }

        setActivityStep(2);
        await delay(550);
        setActivityStep(3);
        await delay(500);

        setTrips((currentTrips) => currentTrips.map((trip) => (
            trip.id === selectedTrip.id
                ? {
                    ...trip,
                    status: "RESOURCES_ASSIGNED",
                    assignedVehicleId: vehicleId,
                    assignedDriverId: driverId,
                    dispatchTime: dispatchTime.toISOString(),
                }
                : trip
        )));
        setActivityStep(4);
        setFlowStatus("assigned");
        message.success(`${selectedTrip.orderRef}: vehicle and driver assigned`);
    };

    return (
        <div className="assign-resources-page">
            <Breadcrumb
                items={[
                    { title: "Dispatch Console" },
                    { title: "Assign Resources" },
                ]}
            />

            <div className="page-title-row">
                <div>
                    <div className="page-kicker"><ThunderboltOutlined /> Order-to-delivery · Step 3</div>
                    <Title>Assign resources</Title>
                    <Text type="secondary">Match every planned trip with an available vehicle and qualified driver.</Text>
                </div>
                <div className="operations-summary" aria-label="Dispatch queue summary">
                    <div>
                        <span className="metric-icon metric-icon-warning"><ClockCircleOutlined /></span>
                        <span><Text strong>{plannedCount}</Text><Text type="secondary">To assign</Text></span>
                    </div>
                    <div>
                        <span className="metric-icon metric-icon-primary"><TruckOutlined /></span>
                        <span><Text strong>{assignedCount}</Text><Text type="secondary">Assigned</Text></span>
                    </div>
                    <div>
                        <span className="metric-icon metric-icon-success"><CheckCircleFilled /></span>
                        <span><Text strong>{confirmedCount}</Text><Text type="secondary">Confirmed</Text></span>
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
                    activityStep={activityStep}
                    errorMessage={errorMessage}
                    onVehicleChange={handleVehicleChange}
                    onDriverChange={handleDriverChange}
                    onDispatchTimeChange={setDispatchTime}
                    onAssign={assignResources}
                />
            </div>
        </div>
    );
}
