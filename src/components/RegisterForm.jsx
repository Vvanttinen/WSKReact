import {useUser} from '../hooks/apiHooks';
import useForm from '../hooks/formHooks';

// RegisterForm.jsx
const RegisterForm = () => {
  const {postUser} = useUser();

  const initValues = {
    username: '',
    password: '',
    email: '',
  };

  const doRegister = async () => {
    console.log(inputs);
    const userResult = await postUser(inputs);
    console.log(userResult);
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doRegister,
    initValues,
  );

  console.log(inputs);
  return (
    <>
      <h1 className="text-3xl font-semibold text-white text-center my-6">Register</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto text-white space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="registeruser" className="mb-1 text-sm font-medium">
            Username
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="username"
            type="text"
            id="registeruser"
            name="username"
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="registeremail" className="mb-1 text-sm font-medium">
            Email
          </label>
          <input
            onChange={handleInputChange}
            autoComplete="email"
            type="email"
            id="registeremail"
            name="email"
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="registerpassword" className="mb-1 text-sm font-medium">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="registerpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 mt-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Register
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
