import BellOutlined from "@ant-design/icons/BellOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Avatar, Badge, Button, Layout, Space, Tooltip, Typography } from "antd";

const { Header } = Layout;
const { Text } = Typography;

export function AppHeader() {
    return (
        <Header className="app-header">
            <div className="brand-lockup" aria-label="FleetOps Dispatch Console">
                <span className="brand-mark">
                    <TruckOutlined />
                </span>
                <span>
                    <Text className="brand-name">FleetOps</Text>
                    <Text className="brand-product">Dispatch Console</Text>
                </span>
            </div>

            <nav className="primary-nav" aria-label="Primary navigation">
                <span className="nav-item nav-item-active">Dispatch</span>
                <span className="nav-item">Planning</span>
                <span className="nav-item">Tracking</span>
            </nav>

            <Space className="header-actions" size="middle">
                <span className="operations-indicator">
                    <Badge status="success" />
                    Live operations
                </span>
                <span className="region-label">
                    <EnvironmentOutlined /> Singapore
                </span>
                <Tooltip title="Notifications">
                    <Button className="header-icon-button" type="text" icon={<BellOutlined />} />
                </Tooltip>
                <Avatar className="dispatcher-avatar">JL</Avatar>
            </Space>
        </Header>
    );
}
