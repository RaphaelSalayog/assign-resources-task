import BellOutlined from "@ant-design/icons/BellOutlined";
import MenuOutlined from "@ant-design/icons/MenuOutlined";
import type { MenuProps } from "antd";
import { Avatar, Badge, Button, Dropdown, Layout, Space, Tooltip } from "antd";

const { Header } = Layout;

const userMenuItems: MenuProps["items"] = [
    { key: "profile", label: "Profile" },
    { key: "logout", label: "Logout" },
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
                <Tooltip title="Notifications">
                    <Badge dot>
                        <Button
                            className="header-icon-button"
                            type="text"
                            icon={<BellOutlined />}
                            aria-label="Notifications"
                        />
                    </Badge>
                </Tooltip>

                <Dropdown
                    menu={{ items: userMenuItems }}
                    trigger={["click"]}
                    placement="bottomRight"
                >
                    <Button className="user-menu-button" type="text" aria-label="Open user menu">
                        <Avatar className="dispatcher-avatar">JL</Avatar>
                    </Button>
                </Dropdown>
            </Space>
        </Header>
    );
}
