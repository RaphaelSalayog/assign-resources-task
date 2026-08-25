import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    cssVar: { key: "fleet-console" },
    token: {
        colorPrimary: "#F49400",
        colorPrimaryHover: "#FFA733",
        colorPrimaryActive: "#D67E00",
        colorLink: "#F49400",
        colorBgLayout: "#F3F5F7",
        colorBgSpotlight: "#0D1A63",
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
            siderBg: "#0e1336",
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
            darkItemBg: "#0e1336",
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
