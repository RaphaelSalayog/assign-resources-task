import { App as AntApp, ConfigProvider } from "antd";
import { AppLayout } from "./components/layout/AppLayout";
import { AssignResourcesPage } from "./pages/AssignResourcesPage";
import { themeConfig } from "./theme/themeConfig";

function App() {
    return (
        <ConfigProvider theme={themeConfig}>
            <AntApp>
                <AppLayout>
                    <AssignResourcesPage />
                </AppLayout>
            </AntApp>
        </ConfigProvider>
    );
}

export default App;
