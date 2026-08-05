import { useDeferredValue, useState } from "react";
import SearchOutlined from "@ant-design/icons/SearchOutlined";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import { Breadcrumb, Empty, Input, Select, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { ShipmentDetail } from "../components/clients/ShipmentDetail";
import { ShipmentMetrics } from "../components/clients/ShipmentMetrics";
import { ShipmentMobileList } from "../components/clients/ShipmentMobileList";
import { ShipmentTable } from "../components/clients/ShipmentTable";
import { mockDrivers } from "../data/mockDrivers";
import { mockShipmentVisibility } from "../data/mockShipmentVisibility";
import { mockVehicles } from "../data/mockVehicles";
import type { ShipmentRecord, Trip, TripStatus } from "../types";

const { Text, Title } = Typography;

type ClientStatusFilter = "ALL" | TripStatus;

const visibilityByTrip = new Map(mockShipmentVisibility.map((visibility) => [visibility.tripId, visibility]));

const statusOptions = [
    { value: "ALL", label: "All statuses" },
    { value: "TRIP_PLANNED", label: "Awaiting resources" },
    { value: "RESOURCES_ASSIGNED", label: "Resources assigned" },
    { value: "DRIVER_CONFIRMED", label: "Driver confirmed" },
    { value: "AWAITING_PLANNING", label: "Planning pending" },
];

interface ClientsPageProps {
    trips: Trip[];
}

export function ClientsPage({ trips }: ClientsPageProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<ClientStatusFilter>("ALL");
    const deferredSearch = useDeferredValue(search.trim().toLowerCase());

    const allRecords: ShipmentRecord[] = trips.flatMap((trip) => {
        const visibility = visibilityByTrip.get(trip.id);
        return visibility ? [{ trip, visibility }] : [];
    });

    const filteredRecords = allRecords.filter(({ trip }) => {
        const matchesStatus = status === "ALL" || trip.status === status;
        const searchable = `${trip.orderRef} ${trip.client} ${trip.pickup} ${trip.delivery}`.toLowerCase();
        return matchesStatus && searchable.includes(deferredSearch);
    });

    const requestedTripId = searchParams.get("shipment");
    const selectedRecord = allRecords.find((record) => record.trip.id === requestedTripId)
        ?? filteredRecords[0]
        ?? allRecords[0];

    const selectShipment = (tripId: string) => {
        setSearchParams({ shipment: tripId });
    };

    return (
        <div className="clients-page">
            <Breadcrumb items={[{ title: "Clients" }, { title: "Shipment visibility" }]} />

            <div className="page-title-row clients-title-row">
                <div>
                    <div className="page-kicker"><TeamOutlined /> Client operations</div>
                    <Title>Shipment visibility</Title>
                    <Text type="secondary">Monitor assignment readiness and delivery progress across every client shipment.</Text>
                </div>
            </div>

            <ShipmentMetrics trips={trips} />

            <div className="clients-workspace">
                <section className="shipment-list-panel" aria-labelledby="shipment-list-title">
                    <div className="shipment-list-heading">
                        <div>
                            <Title id="shipment-list-title" level={3}>Client shipments</Title>
                            <Text type="secondary">{filteredRecords.length} visible shipments</Text>
                        </div>
                        <div className="shipment-filters">
                            <Input
                                aria-label="Search client shipments"
                                allowClear
                                prefix={<SearchOutlined />}
                                placeholder="Search shipment, client or route"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                            />
                            <Select<ClientStatusFilter>
                                aria-label="Filter client shipments by status"
                                value={status}
                                options={statusOptions}
                                onChange={setStatus}
                            />
                        </div>
                    </div>

                    {filteredRecords.length > 0 ? (
                        <>
                            <ShipmentTable
                                records={filteredRecords}
                                selectedTripId={selectedRecord?.trip.id}
                                drivers={mockDrivers}
                                vehicles={mockVehicles}
                                onSelect={selectShipment}
                            />
                            <ShipmentMobileList
                                records={filteredRecords}
                                selectedTripId={selectedRecord?.trip.id}
                                onSelect={selectShipment}
                            />
                        </>
                    ) : (
                        <Empty className="shipments-empty" description="No shipments match these filters" />
                    )}
                </section>

                <ShipmentDetail
                    record={selectedRecord}
                    drivers={mockDrivers}
                    vehicles={mockVehicles}
                />
            </div>
        </div>
    );
}
