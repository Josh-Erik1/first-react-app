import { Card } from "react-bootstrap";
import { NewsArticle } from "../models/NewsArticles";
import styles from "../styles/NewsArticleEntry.module.css";
import newsImage from "@/assets/newsimage.jpg";
import Image from "next/image";
interface NewsArticleEntryProps {
  article: NewsArticle;
}

const NewsArticleEntry = ({
  article: { title, description, url, urlToImage },
}: NewsArticleEntryProps) => {
  const validImageUrl =
    urlToImage?.startsWith("http://") || urlToImage?.startsWith("https://")
      ? urlToImage
      : undefined;

  return (
    <a href={url}
    target='_blank' rel="noopener">
      <Card className="h-100">
        <Image
          src={validImageUrl || newsImage}
          alt="Image"
          width={500}
          height={200}
          className={"card-img-top "}
          // style={{ height: "200px", width: "100%", objectFit: "cover" }}
        />
        {/* <Card.Img variant="top" src={newsImage} /> */}
        <Card.Body>
          <Card.Title className={styles.cardtitle}>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
      </Card>
    </a>
  );
};

export default NewsArticleEntry;
