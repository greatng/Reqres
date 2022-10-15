import './App.css';
import { useEffect, useState } from 'react';
import ProfileCard from './component/ProfileCard';
import PageNumber from './component/PageNumber';
import Authenticate from './component/Authenticate';

const App = () => {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumber, setPageNumber] = useState([0]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const fetchUser = () => {
      fetch(`https://reqres.in/api/users?page=${currentPage}`)
        .then((users) => {
          return users.json();
        })
        .then((userJson) => {
          setUser(userJson.data);
          setPageNumber([...Array(userJson.total_pages).keys()]);
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchUser();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      {!isAuthenticated && <Authenticate {...{ setIsAuthenticated }} />}
      {isAuthenticated && [
        <div className="grid-container">
          {user &&
            user.map((profile, idx) => {
              return <ProfileCard key={idx} profile={profile} />;
            })}
        </div>,
        <PageNumber {...{ pageNumber, currentPage, handlePageChange }} />,
        <button
          className="btn-primary submit shadow"
          onClick={() => {
            localStorage.removeItem('auth');
            setIsAuthenticated(false);
          }}
        >
          Logout
        </button>,
      ]}
    </div>
  );
};

export default App;
