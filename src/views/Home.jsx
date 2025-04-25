import {useEffect, useState} from 'react';
import MediaRow from '../components/MediaRow';
import SingleView from '../components/SingleView';
import {useMedia} from "../hooks/apiHooks.js";

const Home = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const {getMedia, mediaArray} = useMedia();

  useEffect(() => {
    getMedia();
  }, []);

  return (
    <>
      <h2 className="text-3xl font-semibold text-white text-center my-6">My Media</h2>
      <table className="w-full border-collapse">
        <thead>
        <tr className="*:p-4 *:border *:text-center">
          <th>Thumbnail</th>
          <th>Title</th>
          <th>Description</th>
          <th>Created</th>
          <th>Size</th>
          <th>Type</th>
          <th>Operations</th>
        </tr>
        </thead>
        <tbody>
        {mediaArray.map((item) => (
          <MediaRow
            key={item.media_id}
            item={item}
            setSelectedItem={setSelectedItem} />
        ))}
        </tbody>
      </table>
      <SingleView item={selectedItem} setSelectedItem={setSelectedItem} />
    </>
  );
};

export default Home;
