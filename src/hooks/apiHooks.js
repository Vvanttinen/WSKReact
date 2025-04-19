import {useCallback, useEffect, useState} from "react";
import {fetchData} from "../utils/FetchData.js";
import {uniqBy} from "lodash";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const mediaData = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const uniqueUserIds = uniqBy(mediaData, 'user_id');

      console.log('uniqueUserIds', uniqueUserIds);

      const authApiUrl = import.meta.env.VITE_AUTH_API;

      const userData = await Promise.all(
        uniqueUserIds.map(
          async (item) =>
            await fetchData(`${authApiUrl}/users/${item.user_id}`),
        ),
      );
      console.log('userData', userData);

      const userMap = userData.reduce((map, {user_id, username}) => {
        map[user_id] = username;
        return map;
      }, {});

      const newData = mediaData.map((item) => ({
        ...item,
        username: userMap[item.user_id],
      }));

      setMediaArray(newData);
    } catch (error) {
      console.error('error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log('mediaArray', mediaArray);
  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      const loginResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/auth/login',
        fetchOptions,
      );

      console.log('loginResult', loginResult.token);

      window.localStorage.setItem('token', loginResult.token);

      return loginResult;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      };
      return await fetchData(
        import.meta.env.VITE_AUTH_API + '/users',
        fetchOptions,
      );
    } catch (error) {
      console.error('User registration failed:', error);
    }
  };

  const getUserByToken = useCallback(async (token) => {
    try {
      const fetchOptions = {
        headers: {
          Authorization: 'Bearer: ' + token,
        },
      };

      const userResult = await fetchData(
        import.meta.env.VITE_AUTH_API + '/users/token',
        fetchOptions,
      );

      console.log('userResult', userResult);

      return userResult;
    } catch (error) {
      console.error('Fetching user by token failed:', error);
    }
  }, []);

  return {getUserByToken, postUser};
};

export {useMedia, useAuthentication, useUser};
