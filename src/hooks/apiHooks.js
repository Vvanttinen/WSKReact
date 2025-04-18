import {useEffect, useState} from "react";
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

export {useMedia};
