import type { Dayjs } from "dayjs";
import CalendarOutlined from "@ant-design/icons/CalendarOutlined";
import { DatePicker, Typography } from "antd";
import type { Driver, Vehicle } from "../../types";
import { DriverSelect } from "./DriverSelect";
import { VehicleSelect } from "./VehicleSelect";

const { Text } = Typography;

interface AssignmentFormProps {
    vehicles: Vehicle[];
    drivers: Driver[];
    vehicleId?: string;
    driverId?: string;
    dispatchTime: Dayjs | null;
    disabled?: boolean;
    onVehicleChange: (value?: string) => void;
    onDriverChange: (value?: string) => void;
    onDispatchTimeChange: (value: Dayjs | null) => void;
}

export function AssignmentForm({
    vehicles,
    drivers,
    vehicleId,
    driverId,
    dispatchTime,
    disabled,
    onVehicleChange,
    onDriverChange,
    onDispatchTimeChange,
}: AssignmentFormProps) {
    return (
        <section className="assignment-form" aria-labelledby="assignment-form-title">
            <div>
                <Text id="assignment-form-title" className="section-kicker">Resource assignment</Text>
                <Text type="secondary">Choose compatible, available resources for this trip.</Text>
            </div>

            <div className="form-grid">
                <label className="form-field">
                    <span>Vehicle</span>
                    <VehicleSelect
                        vehicles={vehicles}
                        value={vehicleId}
                        disabled={disabled}
                        onChange={onVehicleChange}
                    />
                </label>
                <label className="form-field">
                    <span>Driver</span>
                    <DriverSelect
                        drivers={drivers}
                        value={driverId}
                        disabled={disabled}
                        onChange={onDriverChange}
                    />
                </label>
                <label className="form-field form-field-dispatch">
                    <span>Dispatch time</span>
                    <DatePicker
                        aria-label="Dispatch time"
                        className="dispatch-time-picker"
                        disabled={disabled}
                        format="MMM D, YYYY · hh:mm A"
                        prefix={<CalendarOutlined />}
                        showTime={{ format: "hh:mm A" }}
                        value={dispatchTime}
                        onChange={onDispatchTimeChange}
                    />
                </label>
            </div>
        </section>
    );
}
