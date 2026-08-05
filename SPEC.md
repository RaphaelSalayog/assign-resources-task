# SPEC — Assign Resources (Step 3: Order-to-Delivery Journey)

## 1. Purpose

Build a **standalone, front-end-only mock page** for Step 3 of the Order-to-Delivery flow — **Assign Resources**. This screen represents the Dispatcher persona assigning an available vehicle and driver to a planned trip via the **Dispatch Console**.

This is a **UI/UX demonstration only**:

- No real backend, no API calls.
- All data is mocked and lives in local state / static fixtures.
- Goal is to show a modern, polished interaction flow that stakeholders can click through, not a production-ready integration.

Reference source: "Interactive Order-to-Delivery Journey" step 3 card (Dispatcher / Dispatch Console / event `RESOURCES_ASSIGNED`).

---

## 2. Tech Stack

| Layer      | Choice                                                                                                                                               |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| Build tool | Vite                                                                                                                                                 |
| Framework  | React (functional components + hooks)                                                                                                                |
| UI library | Ant Design (antd v6, uses CSS-in-JS token theming)                                                                                                   |
| State      | Local component state (`useState`) only — no `useReducer` or external state library needed for a mock                                                |
| Mock data  | Static JS/TS fixtures + `setTimeout`-simulated async delays to mimic platform activity checks                                                        |
| Icons      | `@ant-design/icons`                                                                                                                                  |
| Language   | Your call — spec below is written framework-agnostic but examples assume plain JS unless you want TypeScript (recommended for the data models in §6) |

**Open question:** JS or TypeScript? Defaulting to **TypeScript** for the data models below since it documents shape clearly, but tell me if you want plain JS and I'll adjust.

---

## 3. Theming

Brand primary: **`#F49400`** (fleet-monitoring orange).

Proposed Ant Design token overrides (`ConfigProvider` theme):

```js
const theme = {
    token: {
        colorPrimary: "#F49400",
        colorPrimaryHover: "#FFA733",
        colorPrimaryActive: "#D67E00",
        colorLink: "#F49400",
        borderRadius: 8,
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    },
    components: {
        Layout: {
            headerBg: "#1F2430", // dark slate, assumed — mirrors the neutral header/nav in your existing screens
            siderBg: "#FFFFFF",
        },
        Menu: {
            itemSelectedBg: "#FFF4E5", // light orange tint for active nav item
            itemSelectedColor: "#F49400",
        },
        Tag: {
            // semantic colors left as Antd defaults (success green, warning gold, error red)
        },
    },
};
```

**Assumptions (flag if wrong):**

- Dark slate `#1F2430` for header/nav chrome, since your product screenshots use a dark-on-light neutral header — not derived from brand color itself.
- Success / warning / error states use **Antd's default semantic colors**, not brand orange, so status meaning stays universally readable (green = success, gold = pending, red = conflict/error).
- Font: **Inter** as a placeholder — swap if your brand has a defined typeface.

---

## 4. Page Scope

Per your direction: **List + Detail layout.**

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Logistics | breadcrumb: Dispatch Console > Assign    │
├───────────────────────┬───────────────────────────────────────┤
│ LEFT: Trip Queue       │ RIGHT: Assignment Panel                │
│ (list, filterable)     │ (selected trip detail + assign form)   │
│                        │                                         │
│ - Trip card (repeat)   │ - Trip summary                         │
│   - Order ref          │ - Minimum Required Data fields         │
│   - Route (pickup→del) │ - Vehicle picker                       │
│   - Requested window   │ - Driver picker                        │
│   - Status tag         │ - Platform Activity checklist (live)   │
│                        │ - Client-Visible Result preview        │
│                        │ - Assign button / confirmation          │
└───────────────────────┴───────────────────────────────────────┘
```

### 4.1 Left Panel — Trip Queue

- List of trips in status `Trip Planned` (awaiting resource assignment), plus a few in other statuses (`Resources Assigned`, `Driver Confirmed`) so the queue looks realistic and filterable.
- Each trip card shows: order reference, pickup → delivery route (short text), requested time window, vehicle requirement tag, status badge.
- Search/filter bar on top (by order ref, route, or status) — filtering can be purely client-side against mock data.
- Clicking a card selects it and populates the right panel.
- Selected card gets a highlighted/active state (brand orange left border or background tint).

### 4.2 Right Panel — Assignment Detail

Mirrors the fields already defined in your step card:

**Header row**

- Trip title / order reference
- Status tag (dynamic: `Trip Planned` → `Resources Assigned` after action)

**Trip Summary block**

- Order reference, vehicle requirement, time window, route constraints (pulled from "Minimum Required Data": Trip, Vehicle, Driver, Dispatch time)

**Assignment Form**

- **Vehicle select** — Antd `Select` with searchable list of mock vehicles (plate number, type, capacity, current location/availability)
- **Driver select** — Antd `Select` with searchable list of mock drivers (name, license class, current status: Available / On Trip / Off Duty)
- **Dispatch time** — `DatePicker` / `TimePicker`, defaulted to "now"
- Inline validation: can't assign a driver/vehicle marked unavailable (show disabled option + tooltip, simulating "Availability validation")

**Platform Activity — live checklist (your call, decided as: show what looks best)**
Recommend a **step-by-step animated checklist** that plays after clicking "Assign", each item resolving in sequence with a short simulated delay (300–600ms each) using antd `Steps` (vertical, small) or a custom checklist with `Spin` → `CheckCircle` icon transitions:

1. Availability validation ✓
2. Conflict detection ✓
3. Driver notification (sent) ✓
4. Assignment audit log (recorded) ✓

This directly visualizes the "Platform Activity" tags from your existing step cards and turns a static list into a satisfying, modern micro-interaction.

**Client-Visible Result**

- A preview card showing exactly what the client would see: "Vehicle and driver assigned" badge + assigned vehicle/driver summary — matches the "Client-Visible Result" section pattern from your other steps.

**Primary action**

- `Assign Resources` button (disabled until vehicle + driver selected) → triggers the checklist animation → on completion, updates trip status to `Resources Assigned`, shows success `notification`/`message`, and updates the left queue list (card moves or re-tags).

---

## 5. Interaction Flow (state machine, mock only)

```
[idle: trip selected, form empty]
        ↓ select vehicle + driver
[ready: Assign button enabled]
        ↓ click "Assign Resources"
[validating: checklist animating step-by-step]
        ↓ all checks pass (always succeeds in mock,
          optionally simulate 1 failure case for demo realism)
[assigned: status → Resources Assigned]
        ↓
[success toast + queue list updates + right panel shows confirmation state]
```

**Optional but recommended for realism:** include one seeded "conflict" scenario (e.g., selecting a driver already assigned to an overlapping trip) that fails the "Conflict detection" step and shows an inline error state with a "choose another driver" prompt. This demonstrates the UI's error-handling polish, not just the happy path. Confirm if you want this included — adds a bit of scope but makes the demo much stronger.

---

## 6. Mock Data Models (TypeScript)

```ts
type TripStatus = "AWAITING_PLANNING" | "TRIP_PLANNED" | "RESOURCES_ASSIGNED" | "DRIVER_CONFIRMED";

interface Trip {
    id: string;
    orderRef: string;
    client: string;
    pickup: string;
    delivery: string;
    requestedWindow: string; // e.g. "Aug 6, 9:00–11:00 AM"
    vehicleRequirement: string; // e.g. "10ft box truck"
    routeConstraints?: string;
    status: TripStatus;
    assignedVehicleId?: string;
    assignedDriverId?: string;
    dispatchTime?: string;
}

interface Vehicle {
    id: string;
    plateNumber: string;
    type: string; // "10ft box truck", "van", etc.
    capacityKg: number;
    currentLocation: string;
    available: boolean;
}

interface Driver {
    id: string;
    name: string;
    licenseClass: string;
    status: "AVAILABLE" | "ON_TRIP" | "OFF_DUTY";
    avatarUrl?: string;
}
```

Fixture files: `mockTrips.ts`, `mockVehicles.ts`, `mockDrivers.ts` — suggest 6–8 trips, 5–6 vehicles, 5–6 drivers, with at least one deliberately unavailable vehicle and one driver in `ON_TRIP` status to demonstrate disabled-state styling.

---

## 7. Component Breakdown

```
src/
  theme/
    themeConfig.ts
  data/
    mockTrips.ts
    mockVehicles.ts
    mockDrivers.ts
  types/
    index.ts
  components/
    layout/
      AppHeader.tsx
      AppLayout.tsx
    trip-queue/
      TripQueue.tsx
      TripCard.tsx
      TripFilterBar.tsx
    assignment-panel/
      AssignmentPanel.tsx
      TripSummary.tsx
      AssignmentForm.tsx
      VehicleSelect.tsx
      DriverSelect.tsx
      PlatformActivityChecklist.tsx
      ClientVisibleResultPreview.tsx
  pages/
    AssignResourcesPage.tsx
  App.tsx
  main.tsx
```

---

## 8. States to Design For

- Empty state: no trip selected → right panel shows placeholder ("Select a trip to assign resources")
- Loading state: checklist animation mid-flight (buttons disabled, cancel not allowed mid-validation — or allow cancel, your call)
- Success state: post-assignment confirmation
- Error/conflict state: optional, per §5
- Responsive: stacks to single column below ~992px (queue collapses into a drawer or sits above the panel)

---

## 9. Explicitly Out of Scope

- Real authentication / dispatcher identity
- Persisted state (refresh resets to fixture defaults)
- Real driver notifications
- Backend/API integration of any kind
- Steps 1–2 and 4–10 of the broader journey (this page is Step 3 only)

---

## 10. Open Questions for You

1. **TypeScript or plain JS?** (defaulted to TS above)
2. **Include the seeded conflict/error scenario** (§5), or happy-path only for now?
3. **Secondary/neutral colors** — okay with the assumed dark slate `#1F2430` header, or do you have an exact brand neutral palette?
4. Any existing **logo/favicon** assets to drop into the header, or placeholder text logo ("Logistics") like the reference screens?
