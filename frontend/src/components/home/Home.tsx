import React, { useState, useEffect } from "react";
import { FaHome, FaFolder, FaFile, FaUser } from "react-icons/fa";
import axios from "axios";

import { StatsInterface } from "../../utils/models";
import { baseUrl } from "../../utils/connection";
import Main from "../template/Main";
import Stat from "./Stat";
import "./Home.css";

const Home: React.FC = () => {
  const [stat, setStat] = useState<StatsInterface>({
    categories: 0,
    articles: 0,
    users: 0,
  });

  useEffect(() => {
    getStats();
  }, []);

  const getStats = () => {
    axios.get(`${baseUrl}/stats`).then((res) => {
      setStat(res.data);
    });
  };

  return (
    <Main icon={<FaHome />} title="Dashboard" subtitle="Compete System">
      <div className="stats">
        <Stat
          title="Categorias"
          value={stat.categories}
          icon={<FaFolder />}
          color="#d54d50"
        />
        <Stat
          title="Artigos"
          value={stat.articles}
          icon={<FaFile />}
          color="#3bc480"
        />
        <Stat
          title="Usuários"
          value={stat.users}
          icon={<FaUser />}
          color="#3282cd"
        />
      </div>
    </Main>
  );
};

export default Home;
