/* RandomUserList.js */
import React,
{
    useState,
    useEffect
} from 'react';

function RandomUserList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetch('https://69a1f5952e82ee536fa2b268.mockapi.io/users_api')
            .then(response => response.json())
            .then(data => setUserList(data));
    }, []);

    return (
        <div>
            <h2>Random User List</h2>
            <ul>
                {userList.map(user => (
                    <li key={user.id}>
                        <p>
                            Name:
                            {user.first_name}
                            {user.last_name}
                        </p>
                        <p>
                            Email:
                            {user.email}
                        </p>
                        {/* Add more user data fields as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default RandomUserList;