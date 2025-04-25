import PropTypes from 'prop-types';
import {Link} from "react-router";

const MediaRow = (props) => {
  const {item} = props;

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
      <td className="p-0!">
        <Link to="/single" className="hover:bg-amber-300 hover:text-gray-900" state={{item}}>Show</Link>
      </td>
    </tr>
  );
};

MediaRow.propTypes = {
  item: PropTypes.object.isRequired,
  setSelectedItem: PropTypes.func.isRequired,
};

export default MediaRow;
