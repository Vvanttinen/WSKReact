import {useEffect, useState} from 'react';
import {useLike} from "../hooks/apiHooks.js";
import {useUserContext} from "../hooks/contextHooks.js";

const Likes = ({ mediaId }) => {
  const [likes, setLikes] = useState([]);
  const [userLikes, setUserLikes] = useState(false);
  const { getLikesByMediaId, postLike, deleteLike } = useLike();
  const {user} = useUserContext();
  const token = localStorage.getItem('token');

  const fetchLikes = async () => {
    try {
      const likesData = await getLikesByMediaId(mediaId);
      setLikes(likesData);

      const hasLiked = likesData.some((like) => like.user_id === user.user_id);
      setUserLikes(hasLiked);
    } catch (error) {
      console.error('Failed to fetch likes', error);
    }
  };

  useEffect(() => {
    fetchLikes();
  }, [mediaId]);

  const handleLike = async () => {
    if (userLikes) {
      const userLike = likes.find((like) => like.user_id === user.user_id);
      if (userLike) {
        await deleteLike(userLike.like_id, token);
      }
    } else {
      await postLike({ media_id: mediaId }, token);
    }

    await fetchLikes();
  };

  return (
    <button onClick={handleLike}>
      {userLikes ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="red"
          viewBox="0 0 16 16"
        >
          <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385C2.982 9.43 6.136 12 8 13.293c1.864-1.293 5.018-3.863 6.286-5.855.955-1.885.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01 8.48 1.771 8.24 1.554 8 1.554c-.24 0-.48.217-.717.456C5.6.28 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385C2.982 9.43 6.136 12 8 13.293c1.864-1.293 5.018-3.863 6.286-5.855.955-1.885.838-3.362.314-4.385C13.486.878 10.4.281 8.717 2.011L8 2.748z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385C2.982 9.43 6.136 12 8 13.293c1.864-1.293 5.018-3.863 6.286-5.855.955-1.885.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.721-3.042 23.333 4.867 8 15z" />
        </svg>
      )}
    </button>
  );
};

export default Likes;
