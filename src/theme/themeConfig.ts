import type { ThemeConfig } from "antd";

export const themeConfig: ThemeConfig = {
    cssVar: { key: "fleet-console" },
    token: {
        colorPrimary: "#F49400",
        colorPrimaryHover: "#FFA733",
        colorPrimaryActive: "#D67E00",
        colorLink: "#F49400",
        colorBgLayout: "#F3F5F7",
        colorBgSpotlight: "#1F2430",
        colorText: "#1F2937",
        colorTextSecondary: "#64748B",
        colorBorder: "#D9E0E8",
        colorBorderSecondary: "#E7EBF0",
        borderRadius: 10,
        fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    components: {
        Layout: {
            headerBg: "#1F2430",
            bodyBg: "#F3F5F7",
            siderBg: "#1F2430",
            triggerBg: "#171B24",
        },
        Button: {
            controlHeightLG: 44,
            borderRadiusLG: 10,
            primaryShadow: "none",
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
            darkItemBg: "#1F2430",
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
