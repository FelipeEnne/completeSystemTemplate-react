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

const UserAdmin: React.FC = () => {
  const [dataArticle, setDataArticle] =
    useState<DataArticleInterface>(initalDataArticle);

  useEffect(() => {
    loadUsers();
  }, []);

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

  const reset = () => {
    setDataArticle({
      ...dataArticle,
      mode: "save",
    });
    loadUsers();
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

  return (
    <div className="user-admin">
      <div>
        <input
          id="user-id"
          type="hidden"
          value={dataArticle.user?.id}
          disabled
        />

        <div label-form="user-name">
          <h3>Name:</h3>
          <input
            id="user-name"
            type="text"
            value={dataArticle.user?.name}
            onChange={(e) =>
              setDataArticle({
                ...dataArticle,
                user: { ...dataArticle.user!, name: e.target.value },
              })
            }
            required
            disabled={dataArticle.mode === "remove"}
            placeholder="User name"
          />
        </div>

        <div label-form="user-email">
          <h3>E-mail:</h3>
          <input
            id="user-email"
            type="text"
            value={dataArticle.user?.email}
            onChange={(e) =>
              setDataArticle({
                ...dataArticle,
                user: { ...dataArticle.user!, email: e.target.value },
              })
            }
            required
            disabled={dataArticle.mode === "remove"}
            placeholder="User e-mail"
          />
        </div>

        {dataArticle.mode === "save" && (
          <div label-form="user-password">
            <h3>Password:</h3>
            <input
              id="user-password"
              type="password"
              value={dataArticle.user?.password}
              onChange={(e) =>
                setDataArticle({
                  ...dataArticle,
                  user: { ...dataArticle.user!, email: e.target.value },
                })
              }
              required
              placeholder="User password"
            />
          </div>
        )}

        {dataArticle.mode === "save" && (
          <div label-form="user-confirmPassword">
            <h3>Confirm password:</h3>
            <input
              id="user-confirmPassword"
              type="password"
              value={dataArticle.user?.password}
              onChange={(e) =>
                setDataArticle({
                  ...dataArticle,
                  user: { ...dataArticle.user!, email: e.target.value },
                })
              }
              required
              placeholder="User confirm password"
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

export default UserAdmin;
