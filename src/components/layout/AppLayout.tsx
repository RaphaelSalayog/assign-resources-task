import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
import { AppSidebar } from "./AppSidebar";

const { Content } = Layout;

export function AppLayout() {
    const [collapsed, setCollapsed] = useState(false);
    const [mobile, setMobile] = useState(false);

    const handleBreakpoint = (broken: boolean) => {
        setMobile(broken);
        setCollapsed(broken);
    };

    const handleNavigation = () => {
        if (mobile) setCollapsed(true);
    };

    return (
        <Layout className="app-shell" hasSider>
            <AppSidebar
                collapsed={collapsed}
                mobile={mobile}
                onBreakpoint={handleBreakpoint}
                onCollapse={setCollapsed}
                onNavigate={handleNavigation}
            />

            {mobile && !collapsed ? (
                <button
                    className="sidebar-scrim"
                    type="button"
                    aria-label="Close navigation"
                    onClick={() => setCollapsed(true)}
                />
            ) : null}

            <Layout className="main-shell">
                <AppHeader
                    mobile={mobile}
                    onMenuToggle={() => setCollapsed((current) => !current)}
                />
                <Content className="app-content">
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
}
