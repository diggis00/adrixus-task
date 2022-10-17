import { Button, Search, Table } from 'components';
import { useSort } from 'hooks';
import axios from 'axios';
import { ChangeEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { BASE_URL, URL } from 'services/urls';

interface PageItemProps {
  active?: boolean;
  disabled?: boolean;
}
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
const Container = styled.div`
  max-width: 1000px;
  margin: 100px auto;
`;
const PageGroup = styled.ul`
  list-style: none;
  display: flex;
`;

const PageItem = styled.li<PageItemProps>`
  padding: 8px;
  margin: 0 8px;
  border: 1px solid #000;
  border-radius: 4px;
  background-color: ${(props) => (props.active ? '#000' : '')};
  color: ${(props) => (props.active ? '#fff' : '#000')};

  opacity: ${(props) => (props.disabled ? 0.6 : 1)};

  :hover {
    cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dashboard = () => {
  const [search, setSearch] = useState<string>('');
  const [users, setUsers] = useState<IUser[]>([]);
  const [searchData, setSearchData] = useState();

  const { items, requestSort, sortConfig } = useSort(users);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    const token = localStorage.getItem('user_token');
    axios
      .get(`${BASE_URL}${URL.list}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsers(res.data.data.result);
      })
      .catch((err) => alert(err.response.data.message));
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const handleSort = (column: string) => requestSort(column);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);

    const result = users.filter(
      (item) =>
        item.firstName.toLowerCase().includes(search) ||
        item.lastName.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
    );

    //@ts-ignore
    setSearchData(result);
  };

  const ITEMS_PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const pages: number[] = [];

  const LastPage = Math.ceil(users.length / ITEMS_PER_PAGE);
  for (let i = 1; i <= LastPage; i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;

  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageNext = () => {
    if (currentPage < indexOfLastItem) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePagePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const PageNumbers = () => {
    return (
      <PageGroup>
        <PageItem disabled={currentPage === 1} onClick={handlePagePrev}>
          Prev
        </PageItem>
        {pages.map((number) => (
          <PageItem
            key={number}
            active={number === currentPage}
            onClick={() => handlePageClick(number)}
          >
            {number}
          </PageItem>
        ))}
        <PageItem disabled={currentPage === LastPage} onClick={handlePageNext}>
          Next
        </PageItem>
      </PageGroup>
    );
  };

  return (
    <Container>
      <Header>
        <h1>Dashboard</h1>
        <Button style={{ width: 100 }}>Logout</Button>
      </Header>

      <Search value={search} onChange={handleSearch} />
      <Table
        // data={search ? searchData : items}
        data={search ? searchData : currentItems}
        onClickHeader={handleSort}
        sortDirection={sortConfig}
      />
      <PageNumbers />
    </Container>
  );
};

export default Dashboard;
