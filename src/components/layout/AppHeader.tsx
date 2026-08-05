import BellOutlined from "@ant-design/icons/BellOutlined";
import DownOutlined from "@ant-design/icons/DownOutlined";
import EnvironmentOutlined from "@ant-design/icons/EnvironmentOutlined";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import {
    Avatar,
    Badge,
    Button,
    Dropdown,
    Layout,
    Space,
    Tooltip,
} from "antd";
import type { MenuProps } from "antd";

const { Header } = Layout;

const userMenuItems: MenuProps["items"] = [
    { key: "profile", label: "Profile" },
    { key: "logout", label: "Logout" },
];

const locationItems: MenuProps["items"] = [
    { key: "singapore", label: "Singapore" },
];

interface AppHeaderProps {
    mobile: boolean;
    onMenuToggle: () => void;
}

export function AppHeader({ mobile, onMenuToggle }: AppHeaderProps) {
    return (
        <Header className="app-header">
            {mobile ? (
                <Button
                    className="mobile-menu-button"
                    type="text"
                    icon={<MenuOutlined />}
                    aria-label="Open navigation"
                    onClick={onMenuToggle}
                />
            ) : null}

            <Space className="header-actions" size={mobile ? "small" : "middle"}>
                <Dropdown menu={{ items: locationItems, selectable: true, defaultSelectedKeys: ["singapore"] }} trigger={["click"]}>
                    <Button className="header-control" type="text">
                        <EnvironmentOutlined />
                        <span className="location-label">Singapore</span>
                        <DownOutlined className="header-control-chevron" />
                    </Button>
                </Dropdown>

                <Tooltip title="Notifications">
                    <Badge dot>
                        <Button className="header-icon-button" type="text" icon={<BellOutlined />} aria-label="Notifications" />
                    </Badge>
                </Tooltip>

                <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight">
                    <Button className="user-menu-button" type="text" aria-label="Open user menu">
                        <Avatar className="dispatcher-avatar">JL</Avatar>
                    </Button>
                </Dropdown>
            </Space>
        </Header>
    );
}
