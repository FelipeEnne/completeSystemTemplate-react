import React, { useEffect } from "react";
import axios from "axios";
import { FaFolder } from "react-icons/fa";

import "./ArticleById.css";
import ArticleItem from "./ArticleItem";
import { baseUrl } from "../../utils/connection";
import { ArticleInterface } from "../../utils/models";
import Main from "../template/Main";

const ArticlesByCategory: React.FC<{
  page: number;
  loadMore: boolean;
  category: { name: string; id: number };
  articles: Array<ArticleInterface>;
}> = ({ page, loadMore, category, articles }) => {
  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    const url = `${baseUrl}/categories/${category.id}`;
    axios(url).then((res) => (category = res.data));
  };

  const getArticles = () => {
    const url = `${baseUrl}/categories/${category.id}/articles?page=${page}`;
    axios(url).then((res) => {
      articles = articles.concat(res.data);
      page++;

      if (res.data.length === 0) loadMore = false;
    });
  };

  return (
    <div className="articles-by-category">
      <Main icon={<FaFolder />} title={category.name} subtitle="Category" />
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            <ArticleItem {...article} />
          </li>
        ))}
      </ul>
      <div className="load-more">
        <button
          v-if="loadMore"
          className="btn btn-lg btn-outline-primary"
          onClick={getArticles}
        >
          Load More Articles
        </button>
      </div>
    </div>
  );
};

export default ArticlesByCategory;
