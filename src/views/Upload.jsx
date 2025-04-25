import {useFile, useMedia} from '../hooks/apiHooks';

import useForm from '../hooks/formHooks';
import {useNavigate} from 'react-router';
import {useState} from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);
  const {postFile} = useFile();
  const {postMedia} = useMedia();
  const navigate = useNavigate();

  const doUpload = async () => {
    try {
      // implement upload
      const token = window.localStorage.getItem('token');

      const fileResult = await postFile(file, token);
      console.log('fileResult', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);
      console.log('mediaResult', mediaResult);

      navigate('/');
    } catch (error) {
      console.log('error', error);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doUpload);

  const handleFileChange = (evt) => {
    if (evt.target.files) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-semibold text-center text-white my-6">Upload</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
            <input
              name="title"
              type="text"
              id="title"
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              rows={5}
              id="description"
              onChange={handleInputChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <div>
            <label htmlFor="file" className="block text-sm font-medium mb-1">File</label>
            <input
              name="file"
              type="file"
              id="file"
              accept="image/*, video/*"
              onChange={handleFileChange}
              className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <img
            src={
              file
                ? URL.createObjectURL(file)
                : 'https://placehold.co/600x400?text=Choose+image'
            }
            alt="preview"
            className="w-48 h-auto mx-auto my-4"
          />

          <button
            type="submit"
            disabled={!(file && inputs?.title.length > 3)}
            className="w-full py-2 px-4 mt-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
          >
            Upload
          </button>
        </form>
      </div>
    </>
  );
};

export default Upload;
