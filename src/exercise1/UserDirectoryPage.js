import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import { 
  useState,
  useEffect 
 } from 'react';

function UserDirectoryPage() {
  // TODO: add users, sortBy, and viewMode state in this component.
  // TODO: fetch the initial users with useEffect.
  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch('https://69a1f5952e82ee536fa2b268.mockapi.io/users_api')
      .then(response => response.json())
      .then(data =>  setUsers(data));
  }, []);

  const [sortBy, setSortBy] = useState('id');

  const sortedUsers = [...(users ?? [])].sort((a, b) => {
    if (sortBy === 'id') {
      return a.id - b.id;
    } else {
      return a.user_group.localeCompare(b.user_group);
    }
  });

  const [viewMode, setViewMode] = useState('grid');


  function handleDeleteClick(userId) {
    console.log('TODO: delete the user with id', userId);
  }

  function handleSortByGroupClick() {
    setSortBy("group");
  }

  function handleSortByIdClick() {
    setSortBy("id")
  }

  function handleViewToggleClick() {
    setViewMode(viewMode === "grid" ? "list" : "grid");
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls />
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={ sortedUsers } viewMode= { viewMode } />
      </section>
    </>
  );
}

export default UserDirectoryPage;
