import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { Buttons } from "../Buttons";
import { Card } from "../Card";
import { Loading } from "../Loading";
import "./index.scss";

export function CardList() {
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [term, setTerm] = useState("");
  const [currentTerm, setCurrentTerm] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/character?page=${currentPage}&name=${currentTerm}`)
      .then((res) => {
        setCharacterList(res.data);
      })
      .catch((err) => {
        setError(false);
        console.log("error", err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage, currentTerm]);

  if (loading) {
    return <Loading width="150px" height="150px" />;
  }

  if (error) {
    return (
      <div className="error">
        <h1>404</h1>
        <h3>An error has occurred! Please try again.</h3>
        <button onClick={() => window.location.reload()}>Try again</button>
      </div>
    );
  }

  function handleChange(event) {
    setTerm(event.target.value);
  }

  function searchTerm(e) {
    setCurrentTerm(term);
    e.preventDefault();
  }

  const prevButton = !characterList?.info?.prev;
  const nextButton = !characterList?.info?.next;

  return (
    <div className="CardList">
      <div className="filters">
        <form className="InputSearch">
          <input
            type="search"
            placeholder="Search a name..."
            onChange={handleChange}
          />
          <button onClick={searchTerm}>Enter</button>
        </form>
      </div>
      <div className="content-list">
        {characterList?.results &&
          characterList?.results.map((item) => (
            <Card
              key={item.id}
              classNameImg={item.status === "Dead" ? "img-gray" : null}
              image={item.image}
              name={item.name}
              gender={item.gender}
              origin={item.origin.name}
              location={item.location.name}
              status={item.status}
              species={item.species}
              totalViews={item.episode.length}
            />
          ))}
      </div>
      <Buttons
        prevDisabled={prevButton}
        nextDisabled={nextButton}
        prevOnclick={() => setCurrentPage(currentPage - 1)}
        nextOnclick={() => setCurrentPage(currentPage + 1)}
      />
    </div>
  );
}
