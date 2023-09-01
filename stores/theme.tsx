// ./stores/theme.tsx
import React, { useState, useEffect, createContext } from "react";
import { Themes } from "@/constants/enum";

interface IThemeContextProps {
  theme: Themes;
  setTheme: (theme: Themes) => void;
}

interface IProps {
  children: JSX.Element;
}

export const ThemeContext = createContext<IThemeContextProps>(
  {} as IThemeContextProps
);

export const ThemeContextProvider = ({ children }: IProps): JSX.Element => {
  const [theme, setTheme] = useState<Themes>(Themes.light);
  // 组件创建的时候监听存储的改变
  //return 监听组件的销毁，然后移除对应的监听removeEventListener
  debugger;
  useEffect(() => {
    const checkTheme = (): void => {
      const item = (localStorage.getItem("theme") as Themes) || Themes.light;
      setTheme(item);
      document.getElementsByTagName("html")[0].dataset.theme = item;
    };

    checkTheme();

    window.addEventListener("storage", checkTheme);
    return (): void => {
      window.removeEventListener("storage", checkTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (currentTheme) => {
          setTheme(currentTheme);
          localStorage.setItem("theme", currentTheme);
          document.getElementsByTagName("html")[0].dataset.theme = currentTheme;
        },
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
