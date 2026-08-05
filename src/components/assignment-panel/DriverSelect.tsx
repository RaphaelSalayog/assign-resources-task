import UserOutlined from "@ant-design/icons/UserOutlined";
import { Avatar, Badge, Select, Tooltip, Typography } from "antd";
import type { Driver } from "../../types";

const { Text } = Typography;

interface DriverSelectProps {
    drivers: Driver[];
    value?: string;
    disabled?: boolean;
    onChange: (value: string) => void;
}

function getInitials(name: string) {
    return name.split(" ").map((part) => part[0]).join("").slice(0, 2);
}

export function DriverSelect({ drivers, value, disabled, onChange }: DriverSelectProps) {
    const options = drivers.map((driver) => ({
        value: driver.id,
        label: `${driver.name} · ${driver.licenseClass}`,
        disabled: driver.status !== "AVAILABLE",
    }));

    return (
        <Select
            aria-label="Driver"
            className="resource-select"
            allowClear
            disabled={disabled}
            placeholder="Select an available driver"
            prefix={<UserOutlined />}
            showSearch={{ optionFilterProp: ["label"] }}
            value={value}
            options={options}
            onChange={onChange}
            optionRender={(option) => {
                const driver = drivers.find((item) => item.id === option.value);
                if (!driver) return option.label;

                return (
                    <Tooltip
                        title={driver.status === "AVAILABLE" ? undefined : `Driver is ${driver.status.toLowerCase().replace("_", " ")}`}
                        placement="right"
                    >
                        <div className="resource-option resource-option-driver">
                            <Avatar size="small">{getInitials(driver.name)}</Avatar>
                            <div>
                                <Text strong>{driver.name}</Text>
                                <Text type="secondary">{driver.licenseClass} · {driver.currentLocation}</Text>
                            </div>
                            <Badge
                                className="resource-option-badge"
                                status={driver.status === "AVAILABLE" ? "success" : "default"}
                                text={driver.status === "AVAILABLE" ? "Available" : "Unavailable"}
                            />
                        </div>
                    </Tooltip>
                );
            }}
        />
    );
}
