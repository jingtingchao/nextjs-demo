import { FC, useContext } from "react";
import styles from "./styles.module.scss";
import { ThemeContext } from "@/stores/theme";
import { Themes } from "@/constants/enum";

export interface INavBarProps {}

export const NavBar: FC<INavBarProps> = ({}) => {
  const { setTheme } = useContext(ThemeContext);
  return (
    <div className={styles.navBar}>
      <a href="http://localhost:3000/">
        <div className={styles.logoIcon}></div>
      </a>
      <div
        className={styles.themeIcon}
        // 这个地方通过调用setTheme，修改theme的值，-同时引发dom的修改。进而触发对应属性选择器下的图片
        // 浏览器是多进程的，记住，如果是同站的，并且是通过window.open等js代码打开的页面那么他们会同用一个进程
        onClick={() => {
          if (localStorage.getItem("theme") === Themes.light) {
            setTheme(Themes.dark);
          } else {
            setTheme(Themes.light);
          }
        }}
      ></div>
    </div>
  );
};
