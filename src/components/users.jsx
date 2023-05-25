import React, { useState, useEffect } from "react";
import User from "components/user";
import SearchStatus from "components/searchStatus";
import Pagination from "components/pagination";
import api from "../api";
import { paginate } from "utils/pagination";
import GroupList from "components/groupList";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const [professions, setProfession] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProf, setSelectedProf] = useState();

  const count = users.length;
  const pageSize = 4;

  useEffect(() => {
    api.professions.fetchAll().then((professions) =>
      setProfession({
        ...professions,
        allProfession: { name: "Все профессии" },
      })
    );
  }, []);

  const handlePageChange = (pageIndex) => {
    setCurrentPage(pageIndex);
  };

  const getTableHeader = () => {
    return (
      <thead>
        <tr>
          <th scope="col">Имя</th>
          <th scope="col">Качества</th>
          <th scope="col">Профессия</th>
          <th scope="col">Встретился раз</th>
          <th scope="col">Оценка</th>
          <th scope="col">Избранное</th>
          <th scope="col">*</th>
        </tr>
      </thead>
    );
  };

  const handleDelete = (id) => {
    setUsers((prevState) => prevState.filter((u) => u._id !== id));
  };

  const handleSelectToFavorite = (id) => {
    setUsers((prevState) =>
      prevState.map((u) => {
        if (u._id === id) {
          u.bookmark = !u.bookmark;
        }
        return u;
      })
    );
  };

  const filteredUsers =
    selectedProf && selectedProf._id
      ? users.filter((u) => u.profession === selectedProf)
      : users;

  const userCrop = paginate(filteredUsers, currentPage, pageSize);

  const handleProffesionSelect = (item) => {
    setSelectedProf(item);
    console.log(item);
  };

  const clearFilter = () => {
    setSelectedProf();
  };

  return (
    <div>
      {professions && (
        <>
          <GroupList
            items={professions}
            onItemSelect={handleProffesionSelect}
            selectedItem={selectedProf}
          />
          <button className="btn btn-secondary mt-2" onClick={clearFilter}>
            Сбросить фильтры
          </button>
        </>
      )}
      <SearchStatus usersLength={count} />
      {count !== 0 && (
        <table className="table">
          {getTableHeader()}
          <tbody>
            {userCrop.map((u) => (
              <User
                key={u._id}
                user={u}
                onSelectToFavorite={handleSelectToFavorite}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        itemsCount={count}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Users;
