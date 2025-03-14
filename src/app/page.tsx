import React from 'react';
import Head from 'next/head';
import styles from './page.module.css';
import type { ReactElement } from 'react';
import type {NextPageWithLayout} from "./_app"
import Layout from './components/layout/Layout';

const Home: NextPageWithLayout = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <div className="container">
          <h1 className={styles.title}>
            안녕하세요
          </h1>
          <p className={styles.description}>
            중첩 레이아웃 적용 완료!
          </p>
          </div>
      </Layout>
    </div>
  );
};
// (페이지 컴포넌트 이름).getLayout 으로 호출.
Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout> {/* 이 단계에서 레이아웃 중첩 가능 */}
      {page} {/* 중첩할 레이아웃 nested layout*/}
    </Layout>
  );
};

export default Home;