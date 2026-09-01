import type { GeoPoint } from "../../types";

const MAP_WIDTH = 560;
const MAP_HEIGHT = 220;
const MAP_PADDING_X = 48;
const MAP_PADDING_TOP = 28;
const MAP_PADDING_BOTTOM = 70;

const SINGAPORE_BOUNDS = {
    north: 1.48,
    south: 1.2,
    west: 103.6,
    east: 104.08,
};

const MAP_BACKGROUND = (
    <g aria-hidden="true">
        <rect className="trip-route-map-water" width={MAP_WIDTH} height={MAP_HEIGHT} />
        <path
            className="trip-route-map-land"
            d="M34 137C52 112 90 104 118 90C151 72 185 68 213 76C249 86 267 66 305 71C345 75 370 92 405 83C448 73 480 89 514 105C534 115 538 132 522 142C496 160 455 161 420 157C377 151 345 164 308 159C273 154 244 143 212 151C173 160 141 154 109 149C77 144 50 154 34 137Z"
        />
        <path className="trip-route-map-island" d="M249 177C263 171 279 174 287 184C274 191 255 191 243 184Z" />
        <path className="trip-route-map-island" d="M301 183C310 178 322 181 328 189C317 194 305 193 297 188Z" />
        <path
            className="trip-route-map-road trip-route-map-road-major"
            d="M50 126C105 112 141 95 196 96C253 97 293 119 348 111C405 102 452 100 514 121"
        />
        <path
            className="trip-route-map-road trip-route-map-road-major"
            d="M71 143C125 135 164 118 217 121C273 124 318 145 374 137C430 129 464 119 508 128"
        />
        <path
            className="trip-route-map-road"
            d="M104 96C132 108 154 126 169 151M183 78C191 101 210 125 234 151M284 72C281 96 291 127 316 158M386 87C374 105 374 133 391 157M458 88C446 108 450 137 470 157"
        />
        <path
            className="trip-route-map-road trip-route-map-road-secondary"
            d="M65 116C117 128 164 136 214 133C270 130 312 101 363 96C416 91 461 106 520 139M118 91C166 86 204 105 249 107C302 109 345 86 398 89C441 92 475 113 499 144"
        />
        <circle className="trip-route-map-landmark" cx="164" cy="111" r="3" />
        <circle className="trip-route-map-landmark" cx="301" cy="122" r="3" />
        <circle className="trip-route-map-landmark" cx="431" cy="111" r="3" />
    </g>
);

interface ProjectedPoint {
    x: number;
    y: number;
}

interface TripRouteMapProps {
    pickup: string;
    delivery: string;
    pickupCoordinates: GeoPoint;
    deliveryCoordinates: GeoPoint;
}

function clamp(value: number) {
    return Math.min(1, Math.max(0, value));
}

function projectPoint({ latitude, longitude }: GeoPoint): ProjectedPoint {
    const horizontalPosition = clamp(
        (longitude - SINGAPORE_BOUNDS.west)
        / (SINGAPORE_BOUNDS.east - SINGAPORE_BOUNDS.west)
    );
    const verticalPosition = clamp(
        (SINGAPORE_BOUNDS.north - latitude)
        / (SINGAPORE_BOUNDS.north - SINGAPORE_BOUNDS.south)
    );
    const usableWidth = MAP_WIDTH - MAP_PADDING_X * 2;
    const usableHeight = MAP_HEIGHT - MAP_PADDING_TOP - MAP_PADDING_BOTTOM;

    return {
        x: Math.round((MAP_PADDING_X + horizontalPosition * usableWidth) * 10) / 10,
        y: Math.round((MAP_PADDING_TOP + verticalPosition * usableHeight) * 10) / 10,
    };
}

function createRoutePath(start: ProjectedPoint, end: ProjectedPoint) {
    const deltaX = end.x - start.x;
    const deltaY = end.y - start.y;
    const distance = Math.max(Math.hypot(deltaX, deltaY), 1);
    const bend = Math.min(44, Math.max(20, distance * 0.14));
    const direction = start.x <= end.x ? -1 : 1;
    const normalX = -deltaY / distance;
    const normalY = deltaX / distance;
    const controlX = (start.x + end.x) / 2 + normalX * bend * direction;
    const controlY = (start.y + end.y) / 2 + normalY * bend * direction;

    return `M${start.x} ${start.y}Q${controlX.toFixed(1)} ${controlY.toFixed(1)} ${end.x} ${end.y}`;
}

export function TripRouteMap({
    pickup,
    delivery,
    pickupCoordinates,
    deliveryCoordinates,
}: TripRouteMapProps) {
    const pickupPoint = projectPoint(pickupCoordinates);
    const deliveryPoint = projectPoint(deliveryCoordinates);
    const routePath = createRoutePath(pickupPoint, deliveryPoint);

    return (
        <figure className="trip-route-map">
            <svg
                className="trip-route-map-canvas"
                viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
                preserveAspectRatio="xMidYMid slice"
                role="img"
                aria-labelledby="trip-route-map-title trip-route-map-description"
            >
                <title id="trip-route-map-title">Route from {pickup} to {delivery}</title>
                <desc id="trip-route-map-description">
                    Illustrative Singapore map showing the pickup and delivery locations connected by a route.
                </desc>
                {MAP_BACKGROUND}
                <g aria-hidden="true">
                    <path className="trip-route-map-route-halo" d={routePath} />
                    <path className="trip-route-map-route" d={routePath} />
                    <circle
                        className="trip-route-map-marker-halo"
                        cx={pickupPoint.x}
                        cy={pickupPoint.y}
                        r="16"
                    />
                    <circle
                        className="trip-route-map-marker trip-route-map-marker-pickup"
                        cx={pickupPoint.x}
                        cy={pickupPoint.y}
                        r="12"
                    />
                    <text
                        className="trip-route-map-marker-label trip-route-map-marker-label-pickup"
                        x={pickupPoint.x}
                        y={pickupPoint.y}
                    >
                        A
                    </text>
                    <circle
                        className="trip-route-map-marker-halo"
                        cx={deliveryPoint.x}
                        cy={deliveryPoint.y}
                        r="16"
                    />
                    <circle
                        className="trip-route-map-marker trip-route-map-marker-delivery"
                        cx={deliveryPoint.x}
                        cy={deliveryPoint.y}
                        r="12"
                    />
                    <text
                        className="trip-route-map-marker-label trip-route-map-marker-label-delivery"
                        x={deliveryPoint.x}
                        y={deliveryPoint.y}
                    >
                        B
                    </text>
                </g>
            </svg>

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
