import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { GetServerSideProps } from "next";

interface BreakingNewsPageProps {
  newsArticles: NewsArticle[];
}

export const getServerSideProps: GetServerSideProps<
  BreakingNewsPageProps
> = async () => {
  const res = await fetch(
    "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=" +
      process.env.NEWS_API_KEY
  );
  const data = await res.json();
  return {
    props: {
      newsArticles: data.articles,
    },
  };
};

export default function BreakingNewsPage() {
  return (
    <>
      <Head>
        <title key="title"> Breaking News - NextJS News App</title>
      </Head>
      <main>
        <h1>Breaking News!</h1>
      </main>
    </>
  );
}
