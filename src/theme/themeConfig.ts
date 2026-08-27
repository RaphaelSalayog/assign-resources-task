import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    cssVar: { key: "fleet-console" },
    token: {
        colorPrimary: "#F49400",
        colorPrimaryHover: "#FFA733",
        colorPrimaryActive: "#D67E00",
        colorLink: "#F49400",
        colorBgLayout: "#F3F5F7",
        colorBgSpotlight: "#21232dcc",
        colorText: "#181f2a",
        colorTextSecondary: "#64748B",
        colorBorder: "#D9E0E8",
        colorBorderSecondary: "#E7EBF0",
        borderRadius: 10,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    components: {
        Layout: {
            headerBg: "#0e1336",
            bodyBg: "#F3F5F7",
            siderBg: "radial-gradient(circle at 50% 0%, rgb(244 148 0 / 18%), transparent 45%), linear-gradient(180deg, #0E1336, #171B3D)",
            triggerBg: "#0e1336",
        },
        Button: {
            controlHeightLG: 44,
            borderRadiusLG: 10,
            primaryShadow: "none",
            textTextHoverColor: "#FFF8EF",
        },
        Card: {
            headerBg: "#FFFFFF",
        },
        Select: {
            optionSelectedBg: "#FFF4E5",
            optionActiveBg: "#FFF8EF",
        },
        Tag: {
            borderRadiusSM: 999,
        },
        Menu: {
            darkItemBg: "transparent",
            darkItemSelectedBg: "#3E3526",
            darkItemSelectedColor: "#FFB13B",
            darkItemHoverBg: "#2A303D",
            itemBorderRadius: 8,
        },
        Table: {
            headerBg: "#F7F8FA",
            rowHoverBg: "#FFF8EF",
        },
    },
};
