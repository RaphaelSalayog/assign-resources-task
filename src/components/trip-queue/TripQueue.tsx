import { useDeferredValue, useState } from "react";
import { Empty, Typography } from "antd";
import type { Trip } from "../../types";
import { TripCard } from "./TripCard";
import { TripFilterBar, type TripStatusFilter } from "./TripFilterBar";

const { Text, Title } = Typography;

interface TripQueueProps {
    trips: Trip[];
    selectedTripId?: string;
    onSelectTrip: (id: string) => void;
}

export function TripQueue({ trips, selectedTripId, onSelectTrip }: TripQueueProps) {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<TripStatusFilter>("ALL");
    const deferredSearch = useDeferredValue(search.trim().toLowerCase());

    const filteredTrips = trips.filter((trip) => {
        const matchesStatus = status === "ALL" || trip.status === status;
        const searchable = `${trip.orderRef} ${trip.client} ${trip.pickup} ${trip.delivery}`.toLowerCase();
        return matchesStatus && searchable.includes(deferredSearch);
    });

    const needsAssignmentCount = trips.filter(
        (trip) => trip.status === "TRIP_PLANNED" || trip.status === "DRIVER_DECLINED"
    ).length;

    return (
        <aside className="trip-queue" aria-label="Trip queue">
            <div className="queue-heading">
                <div>
                    <Title level={3}>Trip queue</Title>
                    <Text type="secondary">Planned trips awaiting dispatch</Text>
                </div>
                <span className="queue-count">{needsAssignmentCount} to assign</span>
            </div>

            <TripFilterBar
                search={search}
                status={status}
                onSearchChange={setSearch}
                onStatusChange={setStatus}
            />

            <div className="trip-list" aria-live="polite">
                {filteredTrips.length > 0 ? (
                    filteredTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            selected={trip.id === selectedTripId}
                            onSelect={onSelectTrip}
                        />
                    ))
                ) : (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No trips match these filters" />
                )}
            </div>
        </aside>
    );
}
