import SearchOutlined from "@ant-design/icons/SearchOutlined";
import { Input, Select } from "antd";
import type { TripStatus } from "../../types";

export type TripStatusFilter = "ALL" | TripStatus;

interface TripFilterBarProps {
    search: string;
    status: TripStatusFilter;
    onSearchChange: (value: string) => void;
    onStatusChange: (value: TripStatusFilter) => void;
}

const statusOptions = [
    { value: "ALL", label: "All statuses" },
    { value: "TRIP_PLANNED", label: "Trip planned" },
    { value: "RESOURCES_ASSIGNED", label: "Resources assigned" },
    { value: "DRIVER_CONFIRMED", label: "Driver confirmed" },
    { value: "AWAITING_PLANNING", label: "Awaiting planning" },
];

export function TripFilterBar({
    search,
    status,
    onSearchChange,
    onStatusChange,
}: TripFilterBarProps) {
    return (
        <div className="trip-filter-bar">
            <Input
                aria-label="Search trips"
                allowClear
                prefix={<SearchOutlined />}
                placeholder="Search order, client or route"
                value={search}
                onChange={(event) => onSearchChange(event.target.value)}
            />
            <Select<TripStatusFilter>
                aria-label="Filter trips by status"
                value={status}
                options={statusOptions}
                onChange={onStatusChange}
            />
        </div>
    );
}
