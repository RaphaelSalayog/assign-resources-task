import ApartmentOutlined from "@ant-design/icons/ApartmentOutlined";
import MenuFoldOutlined from "@ant-design/icons/MenuFoldOutlined";
import MenuUnfoldOutlined from "@ant-design/icons/MenuUnfoldOutlined";
import TeamOutlined from "@ant-design/icons/TeamOutlined";
import TruckOutlined from "@ant-design/icons/TruckOutlined";
import { Button, Layout, Menu, Tooltip, Typography } from "antd";
import type { MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
const { Text } = Typography;

const navigationItems: MenuProps["items"] = [
    { key: "/dispatch", icon: <ApartmentOutlined />, label: "Dispatch" },
    { key: "/clients", icon: <TeamOutlined />, label: "Clients" },
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
                </div>

                {!collapsed ? <div className="sidebar-section-label">Workspace</div> : null}
                <Menu
                    className="sidebar-menu"
                    mode="inline"
                    theme="dark"
                    inlineCollapsed={collapsed}
                    items={navigationItems}
                    selectedKeys={[selectedKey]}
                    onClick={handleMenuClick}
                />

                {!mobile ? (
                    <div className="sidebar-footer">
                        <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
                            <Button
                                className="sidebar-collapse-button"
                                type="text"
                                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                                onClick={() => onCollapse(!collapsed)}
                            >
                                {!collapsed ? "Collapse sidebar" : null}
                            </Button>
                        </Tooltip>
                    </div>
                ) : null}
            </div>
        </Sider>
    );
}
