import { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import Input from 'components/Input';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL, URL } from 'services/urls';
import { setToken } from 'utils/auth';

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  max-width: 500px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const RedirectContainer = styled.div`
  margin: 10px 0;
`;

const RedirectLink = styled(Link)`
  font-weight: 900;
  font-size: 18px;
  color: #000;
  :hover {
    text-decoration: underline;
  }
`;

const InitialData = {
  email: '',
  password: '',
};
const Login = () => {
  const [data, setData] = useState(InitialData);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const { email, password } = data;

    const submitData = { email, password };

    if (!email || !password) {
      alert('Fill required fields');
      return;
    }

    axios
      .post(`${BASE_URL}${URL.login}`, submitData)
      .then((res) => {
        setData(InitialData);
        setToken(res.data.data.token);
        navigate('/dashboard');
      })
      .catch((err) => alert(err.response.data.message));

    setLoading(false);
  };

  return (
    <Container>
      <h2>Login</h2>

      <Form onSubmit={handleSubmit}>
        <Input
          label='Email'
          name='email'
          placeholder='abc@gmail.com'
          value={data.email}
          onChange={handleChange}
        />
        <Input
          label='Password'
          type='password'
          name='password'
          value={data.password}
          placeholder='Password'
          onChange={handleChange}
        />
        <RedirectContainer>
          <span>Don't have an account? </span>
          <RedirectLink to='/signup'>Signup</RedirectLink>
        </RedirectContainer>
        <Button type='submit'>{loading ? 'loading...' : 'Submit'}</Button>
      </Form>
    </Container>
  );
};

export default Login;
