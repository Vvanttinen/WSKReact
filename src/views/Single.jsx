import {useLocation, useNavigate} from "react-router";
import {useUserContext} from "../hooks/contextHooks.js";
import Likes from "../components/Likes.jsx";

const Single = () => {
  const navigate = useNavigate();
  const {state} = useLocation();
  const {item} = state;
  const {user} = useUserContext();

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 text-white text-center">
        {item.media_type.includes('video') ? (
          <video
            src={item.filename}
            controls
            className="w-full max-h-[500px] rounded mb-4"
          />
        ) : (
          <img
            src={item.filename}
            alt={item.title}
            className="w-full max-h-[500px] object-contain rounded mb-4"
          />
        )}
        {user && (
          <Likes mediaId={item.media_id} />
        )}
        <h3 className="text-2xl font-semibold mb-2">Title: {item.title}</h3>
        <p className="text-gray-300 mb-6">{item.description}</p>
        <button
          onClick={() => navigate(-1)}
          className="py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 transition-colors duration-200 font-semibold"
        >
          Back
        </button>
      </div>
    </>
  );
};

export default Single;
