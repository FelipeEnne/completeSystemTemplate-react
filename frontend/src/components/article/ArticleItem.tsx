import React from "react";
import { Link } from "react-router-dom";

import "./ArticleById.css";
import { ArticleInterface } from "../../utils/models";
import articleImg from "../../assets/img/article.png";

const ArticleItem: React.FC<ArticleInterface> = (article) => {
  return (
    <div className="article-item">
      <Link to={`/categories/?${article.id}/article`}>
        <div className="article-item-image d-none d-sm-block">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              height="150"
              width="150"
              alt="Article"
            />
          ) : (
            <img src={articleImg} height="150" width="150" alt="Article" />
          )}
        </div>

        <div className="article-item-info">
          <h2>{article.name}</h2>
          <p>{article.description}</p>
          <span className="article-item-author">
            <strong>Author: </strong>
            {article.author}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default ArticleItem;
