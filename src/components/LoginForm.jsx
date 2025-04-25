import useForm from "../hooks/formHooks.js";
import { useUserContext } from '../hooks/contextHooks';

const LoginForm = () => {
  const {handleLogin} = useUserContext();

  const initValues = {
    username: '',
    password: '',
  };

  const doLogin = async () => {
    try {
      await handleLogin(inputs);
    } catch (e) {
      alert(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(doLogin, initValues);

  console.log(inputs);

  return (
    <>
      <h1 className="text-3xl font-semibold text-white text-center my-6">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto text-white space-y-4"
      >
        <div className="flex flex-col">
          <label htmlFor="loginuser" className="mb-1 text-sm font-medium">
            Username
          </label>
          <input
            name="username"
            type="text"
            id="loginuser"
            onChange={handleInputChange}
            autoComplete="username"
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="loginpassword" className="mb-1 text-sm font-medium">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="loginpassword"
            onChange={handleInputChange}
            autoComplete="current-password"
            className="p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          className="w-full py-2 px-4 mt-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
          type="submit"
        >
          Login
        </button>
      </form>
    </>
  );
};

export default LoginForm;
