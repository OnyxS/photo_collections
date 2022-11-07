import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cat = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [collections, setCollections] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [catId, setCatId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const category = catId ? `category=${catId}` : '';
  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://629f8d52461f8173e4ec2e7c.mockapi.io/photo_collections?page=${page}&limit=3&${category}`,
    )
      .then((res) => res.json())
      .then((json) => setCollections(json))
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных');
      })
      .finally(() => setIsLoading(false));
  }, [catId, page]);
  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cat.map((obj, i) => (
            <li key={obj.name} className={i === catId ? 'active' : ''} onClick={() => setCatId(i)}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          collections
            .filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((obj, index) => <Collection key={index} name={obj.name} images={obj.photos} />)
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li className={page === i + 1 ? 'active' : ''} onClick={() => setPage(i + 1)}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
