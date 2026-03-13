import { useState, useEffect } from 'react';
import Controls from './Controls';
//import sampleUsers from './sampleUsers';
import UserList from './UserList';

function UserDirectoryPage() {
  // TODO: add users, sortBy, and viewMode state in this component.
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState('id');
  const [viewMode, setViewMode] = useState('grid');
  // TODO: fetch the initial users with useEffect.
  useEffect(() => {
    fetch('https://69a1edcc2e82ee536fa29f3f.mockapi.io/users_api')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

  function handleDeleteClick(userId) {
    fetch(`https://69a1edcc2e82ee536fa29f3f.mockapi.io/users_api/${userId}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Filter out the deleted user from state
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
      })
      .catch(err => console.error("Failed to delete user", err));
  }

  function handleSortByGroupClick() {
    const sorted = [...users].sort((a, b) => a.user_group - b.user_group);
    setUsers(sorted);
    setSortBy('group');
  }

  function handleSortByIdClick() {
    const sorted = [...users].sort((a, b) => a.id - b.id);
    setUsers(sorted);
    setSortBy('id');
  }

  function handleViewToggleClick() {
    setViewMode(prev => prev === 'grid' ? 'list' : 'grid');
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls onSortByIdClick={handleSortByIdClick}
          onSortByGroupClick={handleSortByGroupClick}
          onViewToggleClick={handleViewToggleClick}
          onDeleteClick={handleDeleteClick} />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
