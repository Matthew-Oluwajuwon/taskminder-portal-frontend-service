/* eslint-disable prettier/prettier */
import { ThemeConfig } from "antd"

export const getThemeConfig = (state: any): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#E15341",
    },
    components: {
      Modal: {
        borderRadiusLG: 0,
        borderRadiusSM: 0,
        borderRadiusXS: 0,
        contentBg: state.value === "dark" ? "#0E0D0D" : "#ffffff",
      },
      Drawer: {
        colorBgElevated: state.value === "dark" ? "#303030" : "#ffffff",
        paddingLG: 0,
        paddingMD: 0,
        paddingSM: 0,
        paddingXL: 0,
        paddingXS: 0,
        paddingXXS: 0,
      },
      Dropdown: {
        colorBgElevated: state.value === "dark" ? "#141414" : "#f5f5f5",
        lineWidth: 10,
      },
      Tabs: {
        colorBorderSecondary: "none",
      },
    },
  }
}
