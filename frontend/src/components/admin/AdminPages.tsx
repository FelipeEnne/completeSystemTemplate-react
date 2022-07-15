import React, { useState, useEffect } from "react";
import { FaCogs, FaFolder, FaFile, FaUser } from "react-icons/fa";
import axios from "axios";

import { StatsInterface } from "../../utils/models";
import { baseUrl } from "../../utils/connection";
import Main from "../template/Main";
import ArticleAdmin from "./ArticleAdmin";
import CategoryAdmin from "./CategoryAdmin";
import UserAdmin from "./UserAdmin";

const AdminPages: React.FC = () => {
  return (
    <div className="admin-pages">
      <Main icon={<FaCogs />} title="Admin" subtitle="Register">
        <div className="admin-pages-tabs">
          {/* <b-card no-body>
            <b-tabs card>
              <b-tab title="Article" active>
                <ArticleAdmin />
              </b-tab>
              <b-tab title="Categories">
                <CategoryAdmin />
              </b-tab>
              <b-tab title="User">
                <UserAdmin />
              </b-tab>
            </b-tabs>
          </b-card> */}
          <div>
            <div>
              <div title="Article">
                <ArticleAdmin />
              </div>
              <div title="Categories">
                <CategoryAdmin />
              </div>
              <div title="User">
                <UserAdmin />
              </div>
            </div>
          </div>
        </div>
      </Main>
    </div>
  );
};

export default AdminPages;
