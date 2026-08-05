import { useState } from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { mockTrips } from "./data/mockTrips";
import { AssignResourcesPage } from "./pages/AssignResourcesPage";
import { ClientsPage } from "./pages/ClientsPage";
import { themeConfig } from "./theme/themeConfig";
import type { Trip } from "./types";

function App() {
    const [trips, setTrips] = useState<Trip[]>(mockTrips);

    const updateTrip = (tripId: string, updates: Partial<Trip>) => {
        setTrips((currentTrips) => currentTrips.map((trip) => (
            trip.id === tripId ? { ...trip, ...updates } : trip
        )));
    };

    return (
        <ConfigProvider theme={themeConfig}>
            <AntApp>
                <Routes>
                    <Route element={<AppLayout />}>
                        <Route index element={<Navigate replace to="/dispatch" />} />
                        <Route
                            path="dispatch"
                            element={<AssignResourcesPage trips={trips} onTripUpdate={updateTrip} />}
                        />
                        <Route path="clients" element={<ClientsPage trips={trips} />} />
                        <Route path="assign-resources" element={<Navigate replace to="/dispatch" />} />
                        <Route path="*" element={<Navigate replace to="/dispatch" />} />
                    </Route>
                </Routes>
            </AntApp>
        </ConfigProvider>
    );
}

export default App;
