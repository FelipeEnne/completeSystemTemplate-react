import React, { useState, useEffect } from "react";
import { FaCogs, FaFolder, FaFile, FaUser } from "react-icons/fa";
import axios from "axios";

import { toastError, toastSuccess } from "../../utils/msg";
import {
  DataArticleInterface,
  UserInterface,
  ArticleInterface,
  CategoryInterface,
} from "../../utils/models";
import { baseUrl } from "../../utils/connection";
import Main from "../template/Main";
import { light } from "@mui/material/styles/createPalette";

const initalDataArticle: DataArticleInterface = {
  mode: "save",
  articles: [],
  categories: [],
  users: [],
  page: 1,
  limit: 0,
  count: 0,
  fields: [
    { key: "id", label: "Código", sortable: true },
    { key: "name", label: "Nome", sortable: true },
    { key: "description", label: "Descrição", sortable: true },
    { key: "actions", label: "Ações" },
  ],
};

const ArticleAdmin: React.FC = () => {
  const [dataArticle, setDataArticle] =
    useState<DataArticleInterface>(initalDataArticle);

  useEffect(() => {
    loadArticles();
    loadCategories();
    loadUsers();
  }, []);

  const loadArticles = () => {
    const url = `${baseUrl}/articles?page=${dataArticle.page}`;
    axios.get(url).then((res) => {
      setDataArticle({
        ...dataArticle,
        articles: res.data.data,
        count: res.data.count,
        limit: res.data.limit,
      });
    });
  };

  const reset = () => {
    setDataArticle({
      ...dataArticle,
      mode: "save",
      article: undefined,
    });
  };

  const save = () => {
    const method = dataArticle.article?.id ? "put" : "post";
    const id = dataArticle.article?.id ? `/${dataArticle.article.id}` : "";
    dataArticle.article &&
      axios[method](`${baseUrl}/articles${id}`, dataArticle.article)
        .then(() => {
          toastSuccess("success");
          reset();
        })
        .catch((e) => toastError(e.response.data));
  };

  const remove = () => {
    const id = dataArticle.article?.id;
    dataArticle.article &&
      axios
        .delete(`${baseUrl}/articles/${id}`)
        .then(() => {
          toastSuccess("success");
          reset();
        })
        .catch((e) => toastError(e.response.data));
  };

  const loadArticle = (article: ArticleInterface, mode = "save") => {
    dataArticle.article &&
      axios
        .get(`${baseUrl}/articles/${article.id}`)
        .then((res) => (article = res.data));
  };

  const loadCategories = () => {
    const url = `${baseUrl}/categories`;
    axios.get(url).then((res) => {
      setDataArticle({
        ...dataArticle,
        categories: res.data.map((category: CategoryInterface) => {
          return { value: category.id, text: category.path };
        }),
      });
    });
  };

  const loadUsers = () => {
    const url = `${baseUrl}/users`;
    axios.get(url).then((res) => {
      setDataArticle({
        ...dataArticle,
        users: res.data.map((user: UserInterface) => {
          return { value: user.id, text: `${user.name} - ${user.email}` };
        }),
      });
    });
  };

  return (
    <div className="article-admin">
      <div>
        <input id="article-id" type="hidden" v-model="article.id" />

        <div label-form="article-name">
          <h3>Name:</h3>
          <input
            id="article-name"
            type="text"
            value={dataArticle.article?.name}
            onChange={(e) =>
              setDataArticle({
                ...dataArticle,
                article: { ...dataArticle.article!, name: e.target.value },
              })
            }
            required
            placeholder="Article name"
            disabled={dataArticle.mode === "remove"}
          />
        </div>

        <div label-form="article-description">
          <h3>Description:</h3>
          <input
            id="article-description"
            type="text"
            value={dataArticle.article?.description}
            onChange={(e) =>
              setDataArticle({
                ...dataArticle,
                article: {
                  ...dataArticle.article!,
                  description: e.target.value,
                },
              })
            }
            required
            placeholder="Article description"
            disabled={dataArticle.mode === "remove"}
          />
        </div>

        {dataArticle.mode === "save" && (
          <div label-form="article-imageUrl">
            <h3>Image (Url)::</h3>
            <input
              id="article-imageUrl"
              type="text"
              value={dataArticle.article?.imageUrl}
              onChange={(e) =>
                setDataArticle({
                  ...dataArticle,
                  article: {
                    ...dataArticle.article!,
                    imageUrl: e.target.value,
                  },
                })
              }
              required
              placeholder="Article imageUrl"
            />
          </div>
        )}

        {dataArticle.mode === "save" && (
          <div label-for="article-categoryId">
            <h3>Categories:</h3>
            <select
              id="article-categoryId"
              value={dataArticle.article?.categoryId}
              onChange={(e) =>
                setDataArticle({
                  ...dataArticle,
                  article: {
                    ...dataArticle.article!,
                    categoryId: Number(e.target.value),
                  },
                })
              }
            >
              {dataArticle.categories.map((category) => {
                <option>{category}</option>;
              })}
            </select>
          </div>
        )}

        {dataArticle.mode === "save" && (
          <div label-form="article-content">
            <h3>Content:</h3>
            <textarea
              value={dataArticle.article?.content}
              onChange={(e) =>
                setDataArticle({
                  ...dataArticle,
                  article: {
                    ...dataArticle.article!,
                    content: e.target.value,
                  },
                })
              }
              placeholder="Article content"
            />
          </div>
        )}
      </div>

      <div>
        <div>
          {dataArticle.mode === "save" && <button onClick={save}>Save</button>}
          {dataArticle.mode === "remove" && (
            <button onClick={remove}>Remove</button>
          )}
          <button onClick={reset}>Reset</button>
        </div>
      </div>

      <hr />
    </div>
  );
};

export default ArticleAdmin;
