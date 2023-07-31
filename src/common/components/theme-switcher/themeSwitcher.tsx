/* eslint-disable prettier/prettier */
import { Dropdown, MenuProps } from "antd"
import { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { BsMoonStarsFill, BsSun } from "react-icons/bs"
import { useDispatch } from "react-redux"
import { setTheme } from "../../../store"
import sun from "../../../assets/icons/sun.svg"
import moon from "../../../assets/icons/moon.svg"

interface Props {
  className?: string
}

const ThemeSwitcher: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch()
  const [themeMode, setThemeMode] = useState(localStorage.getItem("theme"))
  const SetDark = (text: string) => {
    setThemeMode(text)
    localStorage.setItem("theme", text)
  }
  const element = document.documentElement
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
  const handleSytemTheme = useCallback(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) && systemTheme.matches)
    ) {
      element.classList.add("dark")
    } else {
      element.classList.remove("dark")
    }
  }, [element.classList, systemTheme.matches])

  useLayoutEffect(() => {
    handleSytemTheme()
  }, [handleSytemTheme, themeMode, dispatch, element.classList])

  useEffect(() => {
    switch (themeMode) {
      case "dark":
        element.classList.add("dark")
        localStorage.setItem("theme", "dark")
        dispatch(setTheme(themeMode))
        break
      case "light":
        element.classList.remove("dark")
        localStorage.setItem("theme", "light")
        dispatch(setTheme(themeMode))
        break
      case "system":
        systemTheme.matches
          ? element.classList.add("dark")
          : element.classList.remove("dark")
        localStorage.removeItem("theme")
        dispatch(setTheme(themeMode))
        break
      default:
        break
    }
  }, [
    themeMode,
    dispatch,
    element.classList,
    handleSytemTheme,
    systemTheme.matches,
  ])

  systemTheme.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark")
      } else {
        element.classList.remove("dark")
      }
    }
  })

  const items: MenuProps["items"] = [
    {
      label: (
        <span
          onClick={() => SetDark("dark")}
          className="flex items-center gap-3 font-bold text-black dark:text-[#f5f5f5] cursor-pointer"
        >
          <BsMoonStarsFill />
          Dark
        </span>
      ),
      key: "1",
    },
    {
      label: (
        <span
          onClick={() => SetDark("light")}
          className="flex items-center gap-3 font-bold text-black dark:text-[#f5f5f5] cursor-pointer"
        >
          <BsSun />
          Light
        </span>
      ),
      key: "2",
    },
    {
      label: (
        <span
          onClick={() => SetDark(systemTheme.matches ? "dark" : "light")}
          className="flex ml-5 items-center gap-3 font-bold text-black dark:text-[#f5f5f5] cursor-pointer"
        >
          System
        </span>
      ),
      key: "3",
    },
  ]

  return (
    <Dropdown
      menu={{ items }}
      trigger={["click"]}
      placement="bottomRight"
      className={`w-fit ${className}`}
    >
      <span>
        {themeMode === "dark" ? (
          <img src={moon} alt="" className="text-black dark:text-[#f5f5f5] cursor-pointer text-xl" />
        ) : (
          <img src={sun} alt="" className="text-black dark:text-[#f5f5f5] cursor-pointer text-xl" />
        )}
      </span>
    </Dropdown>
  )
}

export default ThemeSwitcher