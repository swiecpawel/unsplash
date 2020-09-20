import React from "react";
import style from "./App.module.css";
import Search from "./components/Search/Search";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <div className={style.Content}>
      <div className={style.WhiteTextLarger}>Unsplash</div>
      <div className={style.WhiteText}>
        The internet’s source of freely-usable images.
      </div>
      <div className={style.WhiteText}>Powered by creators everywhere.</div>
      <div className={style.SearchBar}>
        <Search />
      </div>
    </div>
  );
};

export default App;
