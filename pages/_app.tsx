import "@/styles/globals.css";
import type { AppProps, AppContext } from "next/app";
import App from "next/app";
import { Layout, ILayoutProps } from "@/components/layout";
import Head from "next/head";
import axios from "axios";
import { LOCALDOMAIN } from "@/utils";
import { ThemeContextProvider } from "@/stores/theme";
import "./global.scss";

const MyApp = (data: AppProps & ILayoutProps) => {
  const { Component, pageProps, navbarData, footerData } = data;

  return (
    <div>
      <Head>
        <title>A Demo for 《深入浅出SSR官网开发指南》</title>
        <meta
          name="description"
          content="A Demo for 《深入浅出SSR官网开发指南》"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeContextProvider>
        <Layout navbarData={navbarData} footerData={footerData}>
          <Component {...pageProps} />
        </Layout>
      </ThemeContextProvider>
    </div>
  );
};
// 我愿意称之为数据注入
// 每一个页面都要走App的getInitialProps， 我们通过在该方法中调用页面的getInitialProps（App.getInitialProps）
// 获取到对应页面的返回数据
// 然后合并header和footer的数据
MyApp.getInitialProps = async (context: AppContext) => {
  const pageProps = await App.getInitialProps(context);
  const { data = {} } = await axios.get(`${LOCALDOMAIN}/api/layout`);
  return {
    ...pageProps,
    ...data,
  };
};

export default MyApp;
