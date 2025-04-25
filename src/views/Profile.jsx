import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);

  const {getUserByToken} = useUser();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, [getUserByToken]);

  console.log('user', user);
  return (
    <>
      <div className="max-w-2xl mx-auto p-6 text-white">
        <h2 className="text-3xl font-semibold text-center text-white my-6">Profile</h2>
        {user && (
          <div className="space-y-4 text-center">
            <p className="text-lg">Username: <span className="font-semibold">{user.username}</span></p>
            <p className="text-lg">Email: <span className="font-semibold">{user.email}</span></p>
            <p className="text-lg">
              Register Date: <span className="font-semibold">{new Date(user.created_at).toLocaleString('fi-FI')}</span>
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
