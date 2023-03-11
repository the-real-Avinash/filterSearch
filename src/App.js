import { useState, useEffect } from "react";
import "./App.css";
// Note: the empty deps array [] means
// this useEffect will run once
function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [searchParam] = useState(["capital", "name"]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <>{error.message}</>;
  } else if (!isLoaded) {
    return <>loading...</>;
  } else {
    return (
      <div className="wrapper">
        <div className="search-wrapper">
          <label htmlFor="search-form">
            <input
              type="search"
              name="search-form"
              id="search-form"
              className="search-input"
              placeholder="Search for..."
              value={q}
              /*
                                // set the value of our useState q
                                //  anytime the user types in the search box
                                */
              onChange={(e) => setQ(e.target.value)}
            />
            <span className="sr-only">Search countries here</span>
          </label>
        </div> 
        <ul className="card-grid">
          {items.map((country, index) => (
            <li>
              <article className="card" key={index}>
                <div className="card-image">
                  <img
                    src={country?.coatOfArms?.svg}
                    alt={country?.altSpellings[1]}
                  />
                </div>
                <div className="card-content">
                  <h2 className="card-name">{country?.altSpellings[1]}</h2>
                  <ol className="card-list">
                    <li>
                      population: <span> {country?.population}</span>
                    </li>
                    <li>
                      Region: <span>{country?.region}</span>
                    </li>
                    <li>
                      Capital: <span>{country?.capital}</span>
                    </li>
                  </ol>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
