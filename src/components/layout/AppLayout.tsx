import type { PropsWithChildren } from "react";
import { Layout } from "antd";
import { AppHeader } from "./AppHeader";

const { Content } = Layout;

export function AppLayout({ children }: PropsWithChildren) {
    return (
        <Layout className="app-shell">
            <AppHeader />
            <Content className="app-content">{children}</Content>
        </Layout>
    );
}
