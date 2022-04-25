import React, { useState } from "react";
import "../../styles/resultList.css";
import { ImPrevious2, ImNext2, ImLast, ImFirst } from "react-icons/im";

const ResultList = (props) => {
  const { active, result } = props;
  const posts = result;
  let [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(30);

  // podzielenie na strony
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //pobranie i podzielenie tablicy na ilość stron stron
  const totalPosts = result.length;
  const lastPost = Math.ceil(totalPosts / postsPerPage);

  //Wjazd na góre listy

  //zmiana strony
  const leftButton = () => {
    if (currentPage <= 1) {
      return null;
    } else {
      setCurrentPage((currentPage -= 1));
    }
  };
  const rightButton = () => {
    if (currentPage >= lastPost) {
      return null;
    } else {
      setCurrentPage((currentPage += 1));
    }
  };
  const firstPageButton = () => {
    if (currentPage <= 1) {
      return null;
    } else {
      setCurrentPage(1);
    }
  };
  const lastPageButton = () => {
    if (currentPage >= lastPost) {
      return null;
    } else {
      setCurrentPage(lastPost);
    }
  };

  return (
    <>
      {active ? (
        <section id="resultListSection">
          <div className="resultBar">
            <p>Miejsce</p>
            <p>Laptop</p>
            <p>punktacja</p>
            <p>Szczegóły</p>
          </div>

          <div className="resultList">{currentPosts}</div>

          <section className="PostsChanger" id="bottomOfList">
            <button onClick={firstPageButton}>
              <a
                href="#bottomOfList"
                className={currentPage <= 1 ? "disable" : null}
              >
                <ImFirst />
              </a>
            </button>
            <button onClick={leftButton}>
              <a
                href="#bottomOfList"
                className={currentPage <= 1 ? "disable" : null}
              >
                <ImPrevious2 />
              </a>
            </button>
            <span>{currentPage}</span>
            <button onClick={rightButton}>
              <a
                href="#bottomOfList"
                className={currentPage >= lastPost ? "disable" : null}
              >
                <ImNext2 />
              </a>
            </button>
            <button onClick={lastPageButton}>
              <a
                href="#bottomOfList"
                className={currentPage >= lastPost ? "disable" : null}
              >
                <ImLast />
              </a>
            </button>
          </section>
        </section>
      ) : null}
    </>
  );
};

export default ResultList;
