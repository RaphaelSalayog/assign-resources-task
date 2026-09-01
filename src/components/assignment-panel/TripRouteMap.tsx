import type { FitBoundsOptions, LatLngTuple, PathOptions } from "leaflet";
import {
    CircleMarker,
    MapContainer,
    Polyline,
    TileLayer,
    Tooltip,
} from "react-leaflet";
import type { GeoPoint } from "../../types";

const MAP_BOUNDS_OPTIONS: FitBoundsOptions = {
    padding: [28, 28],
    maxZoom: 13,
};

const ROUTE_HALO_STYLE: PathOptions = {
    color: "var(--ant-color-bg-container)",
    opacity: 0.92,
    weight: 9,
};

const ROUTE_STYLE: PathOptions = {
    color: "var(--ant-color-primary)",
    opacity: 1,
    weight: 4,
};

const PICKUP_MARKER_STYLE: PathOptions = {
    color: "var(--ant-color-primary)",
    fillColor: "var(--ant-color-bg-container)",
    fillOpacity: 1,
    opacity: 1,
    weight: 3,
};

const DELIVERY_MARKER_STYLE: PathOptions = {
    color: "var(--ant-color-bg-container)",
    fillColor: "var(--ant-color-primary)",
    fillOpacity: 1,
    opacity: 1,
    weight: 3,
};

interface TripRouteMapProps {
    pickup: string;
    delivery: string;
    pickupCoordinates: GeoPoint;
    deliveryCoordinates: GeoPoint;
    routeCoordinates?: GeoPoint[];
}

function toLatLng({ latitude, longitude }: GeoPoint): LatLngTuple {
    return [latitude, longitude];
}

export function TripRouteMap({
    pickup,
    delivery,
    pickupCoordinates,
    deliveryCoordinates,
    routeCoordinates,
}: TripRouteMapProps) {
    const routePoints = routeCoordinates && routeCoordinates.length >= 2
        ? routeCoordinates
        : [pickupCoordinates, deliveryCoordinates];
    const routePositions = routePoints.map(toLatLng);
    const pickupPosition = toLatLng(pickupCoordinates);
    const deliveryPosition = toLatLng(deliveryCoordinates);
    const mapKey = routePositions.map((position) => position.join(",")).join(";");

    return (
        <figure
            className="trip-route-map"
            aria-label={`Interactive route map from ${pickup} to ${delivery}`}
        >
            <MapContainer
                key={mapKey}
                className="trip-route-map-canvas"
                bounds={routePositions}
                boundsOptions={MAP_BOUNDS_OPTIONS}
                scrollWheelZoom={false}
                zoomControl
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    maxZoom={19}
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline positions={routePositions} pathOptions={ROUTE_HALO_STYLE} />
                <Polyline positions={routePositions} pathOptions={ROUTE_STYLE} />
                <CircleMarker
                    center={pickupPosition}
                    radius={13}
                    pathOptions={PICKUP_MARKER_STYLE}
                >
                    <Tooltip
                        className="trip-route-map-marker-label trip-route-map-marker-label-pickup"
                        direction="center"
                        permanent
                    >
                        A
                    </Tooltip>
                </CircleMarker>
                <CircleMarker
                    center={deliveryPosition}
                    radius={13}
                    pathOptions={DELIVERY_MARKER_STYLE}
                >
                    <Tooltip
                        className="trip-route-map-marker-label trip-route-map-marker-label-delivery"
                        direction="center"
                        permanent
                    >
                        B
                    </Tooltip>
                </CircleMarker>
            </MapContainer>

            <figcaption className="trip-route-map-caption">
                <span className="trip-route-map-location">
                    <span className="trip-route-map-location-marker trip-route-map-location-marker-pickup">
                        A
                    </span>
                    <span className="trip-route-map-location-copy">
                        <span className="trip-route-map-location-label">Pickup</span>
                        <strong title={pickup}>{pickup}</strong>
                    </span>
                </span>
                <span className="trip-route-map-location">
                    <span className="trip-route-map-location-marker trip-route-map-location-marker-delivery">
                        B
                    </span>
                    <span className="trip-route-map-location-copy">
                        <span className="trip-route-map-location-label">Delivery</span>
                        <strong title={delivery}>{delivery}</strong>
                    </span>
                </span>
            </figcaption>
        </figure>
    );
}
