import { FormEvent, useState } from "react";
import { Button, Form, Pagination, Spinner } from "react-bootstrap";
import { NewsArticle } from "@/models/NewsArticles";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import Head from "next/head";

const SearchNewsPage = () => {
  const [searchResults, setSearchResults] = useState<NewsArticle[] | null>(
    null
  );
  const [searchResultsLoading, setSearchResultsLoading] = useState(false);
  const [searchResultsLoadingError, setSearchResultsLoadingError] =
    useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if (searchQuery) {
      try {
        setSearchResults(null);
        setSearchResultsLoadingError(false);
        setSearchResultsLoading(true);
        const response = await fetch("/api/search-news?q=" + searchQuery);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultsLoadingError(true);
      } finally {
        setSearchResultsLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title key="title">Search News - NextJS News App</title>
      </Head>

      <main>
        <h1>Search News</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label> Search query</Form.Label>
            <Form.Control
              type="text"
              name="searchQuery"
              placeholder="E.g politics, business, sports, ..."
            />
          </Form.Group>
          <Button
            type="submit"
            className="mb-3"
            disabled={searchResultsLoading}
          >
            Search
          </Button>
        </Form>
        <div className="d-flex flex-column aligh-items-center">
          {searchResultsLoading && <Spinner animation="border" />}
          {searchResultsLoadingError && (
            <p>Something went wrong. Please try agaiin</p>
          )}
          {searchResults?.length === 0 && (
            <p>Nothing found! Try a different query</p>
          )}
          {searchResults && <NewsArticlesGrid articles={searchResults} />}
        </div>
      </main>
    </>
  );
};

export default SearchNewsPage;
