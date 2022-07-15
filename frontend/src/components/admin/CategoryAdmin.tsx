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

const CategoryAdmin: React.FC = () => {
  const [dataArticle, setDataArticle] =
    useState<DataArticleInterface>(initalDataArticle);

  useEffect(() => {
    loadCategories();
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

  return (
    <div className="category-admin">
      <div>
        <input id="category-id" type="hidden" v-model="category.id" />

        <div label-form="category-name">
          <h3>Name:</h3>
          <input
            id="category-name"
            type="text"
            value={dataArticle.category?.name}
            onChange={(e) =>
              setDataArticle({
                ...dataArticle,
                category: { ...dataArticle.category!, name: e.target.value },
              })
            }
            required
            disabled={dataArticle.mode === "remove"}
            placeholder="Category name"
          />
        </div>

        <div label-for="category-parentId">
          <h3>Category:</h3>
          {dataArticle.mode === "save" ? (
            <select id="category-parentId">
              {dataArticle.categories.map((category) => {
                <option key={category.id}>{category}</option>;
              })}
            </select>
          ) : (
            <input id="category-parentId" type="text" disabled>
              {dataArticle.categories.map((category) => {
                <option key={category.id}>{category.path}</option>;
              })}
            </input>
          )}
        </div>
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

export default CategoryAdmin;
