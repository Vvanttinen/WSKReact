import {useState} from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = () => {
  const [formToggle, setFormToggle] = useState(true);

  const clickHandler = () => {
    setFormToggle(!formToggle);
  };

  return (
    <>
      {formToggle ? <LoginForm /> : <RegisterForm />}
      <div className="flex justify-center mt-4">
        <button
          className="w-full max-w-md py-2 px-4 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors duration-200"
          onClick={clickHandler}
        >
          {formToggle ? 'or Register' : 'or Login'}
        </button>
      </div>
    </>
  );
};

export default Login;
