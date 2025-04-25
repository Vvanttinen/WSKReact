import PropTypes from 'prop-types';
import {Link} from "react-router";
import {useUserContext} from "../hooks/contextHooks.js";
import {useMedia} from "../hooks/apiHooks.js";

const MediaRow = (props) => {
  const {item} = props;
  const {user} = useUserContext();
  const {deleteMedia, modifyMedia} = useMedia();

  const handleDelete = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const result = await deleteMedia(item, token);
      console.log(result);

      window.location.reload();
    } catch (e) {
      console.log('error', e.message);
    }
  }

  const handleUpdate = async () => {
    try {
      const token = window.localStorage.getItem("token");
      const result = await modifyMedia(item, token);
      console.log(result);

      window.location.reload();
    } catch (e) {
      console.log('error', e.message);
    }
  }

  return (
    <tr className="*:p-4 *:border *:text-center">
      <td>
        <img src={item.thumbnail} alt={item.title} className="h-52 object-cover" />
      </td>
      <td>{item.title}</td>
      <td>{item.description}</td>
      <td>{new Date(item.created_at).toLocaleString('fi-FI')}</td>
      <td>{item.filesize}</td>
      <td>{item.media_type}</td>
      <td className="p-0">
        <Link to="/single"
              className="w-full py-2 px-4 mt-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200" state={{item}}>Show</Link>
        {user && user.user_id === item.user_id && (
          <div className="w-full mt-2">
            <button
              className="w-full py-2 px-4 mt-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
              onClick={() => handleUpdate()}>Edit</button>
            <button
              className="w-full py-2 px-4 mt-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
              onClick={() => handleDelete()}>Delete</button>
          </div>
        )}
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
