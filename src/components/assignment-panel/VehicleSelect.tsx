import CarOutlined from "@ant-design/icons/CarOutlined";
import { Badge, Select, Tooltip, Typography } from "antd";
import type { Vehicle } from "../../types";

const { Text } = Typography;

interface VehicleSelectProps {
    vehicles: Vehicle[];
    value?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

export function VehicleSelect({ vehicles, value, disabled, onChange }: VehicleSelectProps) {
    const options = vehicles.map((vehicle) => ({
        value: vehicle.id,
        label: `${vehicle.plateNumber} · ${vehicle.type}`,
        disabled: !vehicle.available,
    }));

    return (
        <Select
            aria-label="Vehicle"
            className="resource-select"
            allowClear
            disabled={disabled}
            placeholder="Select an available vehicle"
            prefix={<CarOutlined />}
            showSearch={{ optionFilterProp: ["label"] }}
            value={value}
            options={options}
            onChange={onChange}
            optionRender={(option) => {
                const vehicle = vehicles.find((item) => item.id === option.value);
                if (!vehicle) return option.label;

                return (
                    <Tooltip
                        title={vehicle.available ? undefined : "Vehicle is currently unavailable"}
                        placement="right"
                    >
                        <div className="resource-option">
                            <div>
                                <Text strong>{vehicle.plateNumber}</Text>
                                <Text type="secondary">{vehicle.type} · {vehicle.capacityKg.toLocaleString()} kg</Text>
                            </div>
                            <div className="resource-option-status">
                                <Badge status={vehicle.available ? "success" : "default"} />
                                <Text type="secondary">{vehicle.currentLocation}</Text>
                            </div>
                        </div>
                    </Tooltip>
                );
            }}
        />
    );
}
