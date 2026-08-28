import { DashboardOutlined, FileTextOutlined, ScheduleOutlined, InboxOutlined, EnvironmentOutlined, CarOutlined, DollarOutlined, BarChartOutlined, SettingOutlined } from "@ant-design/icons";
import ApartmentOutlined from "@ant-design/icons/ApartmentOutlined";
import LeftCircleOutlined from "@ant-design/icons/es/icons/LeftCircleOutlined";
import RightCircleOutlined from "@ant-design/icons/es/icons/RightCircleOutlined";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Button, Layout, Menu, Tooltip, Typography } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;

const navigationItems: MenuProps["items"] = [
    { key: "/dashboard", icon: <DashboardOutlined />, label: "Dashboard", disabled: true },
    { key: "/orders", icon: <FileTextOutlined />, label: "Orders", disabled: true },
    { key: "/planning", icon: <ScheduleOutlined />, label: "Planning", disabled: true },
    { key: "/dispatch", icon: <ApartmentOutlined />, label: "Dispatch" },
    { key: "/operations", icon: <InboxOutlined />, label: "Operations", disabled: true },
    { key: "/tracking", icon: <EnvironmentOutlined />, label: "Tracking", disabled: true },
    { key: "/delivery", icon: <CarOutlined />, label: "Delivery", disabled: true },
    { key: "/billing", icon: <DollarOutlined />, label: "Billing", disabled: true },
    { key: "/analytics", icon: <BarChartOutlined />, label: "Analytics", disabled: true },
    { key: "/clients", icon: <TeamOutlined />, label: "Clients" },
    { key: "/admin", icon: <SettingOutlined />, label: "Administration", disabled: true },
];

interface AppSidebarProps {
    collapsed: boolean;
    mobile: boolean;
    onBreakpoint: (broken: boolean) => void;
    onCollapse: (collapsed: boolean) => void;
    onNavigate: () => void;
}

export function AppSidebar({
    collapsed,
    mobile,
    onBreakpoint,
    onCollapse,
    onNavigate,
}: AppSidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();
    const selectedKey = location.pathname.startsWith("/clients") ? "/clients" : "/dispatch";

    const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
        navigate(key);
        onNavigate();
    };

    return (
        <Sider
            className={`app-sidebar${mobile ? " app-sidebar-mobile" : ""}`}
            breakpoint="lg"
            collapsed={collapsed}
            collapsedWidth={mobile ? 0 : 80}
            collapsible
            theme="dark"
            trigger={null}
            width={248}
            onBreakpoint={onBreakpoint}
        >
            <div className="sidebar-content">
                <div className="sidebar-brand" aria-label="FleetOps">
                    <span className="brand-mark"><TruckOutlined /></span>
                    {!collapsed ? (
                        <span className="brand-copy">
                            <Text className="brand-name">FleetOps</Text>
                            <Text className="brand-product">Operations platform</Text>
                        </span>
                    ) : null}

                    {!mobile ? (
                        <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
                            <Button
                                className="sidebar-collapse-button"
                                type="text"
                                aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                                icon={collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
                                onClick={() => onCollapse(!collapsed)}
                            />
                        </Tooltip>
                    ) : null}
                </div>
                
                <Menu
                    className="sidebar-menu"
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={navigationItems}
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                />
            </div>
        </Sider>
    );
}
