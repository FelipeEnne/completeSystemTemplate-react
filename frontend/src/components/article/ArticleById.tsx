import React, { useEffect } from "react";
import axios from "axios";
import { FaFile } from "react-icons/fa";

import "./ArticleById.css";
import { baseUrl } from "../../utils/connection";
import { ArticleInterface } from "../../utils/models";
import Main from "../template/Main";

const ArticleById: React.FC<ArticleInterface> = (article) => {
  useEffect(() => {
    mounted();
  }, []);

  const mounted = () => {
    const url = `${baseUrl}/articles/${article.id}`;
    axios(url).then((res) => (article = res.data));
  };

  return (
    <Main icon={<FaFile />} title="Dashboard" subtitle="Compete System">
      <div className="article-content">{article.content}</div>
    </Main>
  );
};

export default ArticleById;
