import React, { useState } from "react";
import "./App.css";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [imageData, setImageData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  function handleButtonClick() {
    const [month, day, year] = searchValue.split("/");

    setIsLoading(true);
    const fetchApi = `https://epic.gsfc.nasa.gov/api/enhanced/date/${year}-${month}-${day}`;
    fetch(fetchApi)
      .then((response) => response.json())
      .then((data) => {
        const dataList = data.map((image) => {
          let fetchImage = `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/epic_1b_`;
          return fetchImage + image.identifier + ".png";
        });

        // Not sure how to solve this
        // Maybe there is a way to get the year and compare to id
        // Maybe the most efficent way is loop thru the years and the sort to get the closest date
        if (data.length === 0) {
          console.log("Array is empty");
        }

        imageData.push(dataList);
        setImageData(imageData);
      })
      .catch((error) => console.error(error))
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <div className="nasa-container">
      <header className="nasa-header">
        {isLoading && <p>Loading...</p>}
        <div className="nasa-input">
          <label htmlFor="search-value">Enter Date: (12/31/2020) </label>
          <input
            onChange={(e) => setSearchValue(e.target.value)}
            id="search-value"
            type="text"
            value={searchValue}
          />
        </div>
        <button onClick={handleButtonClick}>Submit</button>
      </header>
      <main>
        <section className="nasa-photo">
          {imageData.map((image, index) => (
            <div key={index}>
              <img src={image[0]} alt="nasa" />
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
