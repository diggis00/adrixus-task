import { ChangeEvent, FormEvent, useState } from 'react';
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

const InitialData = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

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
const SignUp = () => {
  const [data, setData] = useState(InitialData);

  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { email, firstName, lastName, password, confirmPassword } = data;

    const submitData = { email, firstName, lastName, password };

    if (!email || !firstName || !lastName || !password) {
      alert('Fill required fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios
      .post(`${BASE_URL}${URL.register}`, submitData)
      .then((res) => {
        setData(InitialData);
        setToken(res.data.data.token);
        navigate('/dashboard');
      })
      .catch((err) => alert(err.response.data.message));
  };
  return (
    <Container>
      <h2>SIgn Up</h2>
      <Form onSubmit={handleSubmit}>
        <Input
          label='First Name'
          placeholder='John'
          name='firstName'
          value={data.firstName}
          onChange={handleChange}
        />
        <Input
          label='Last Name'
          placeholder='Doe'
          name='lastName'
          value={data.lastName}
          onChange={handleChange}
        />
        <Input
          label='Email'
          placeholder='abc@gmail.com'
          name='email'
          value={data.email}
          onChange={handleChange}
        />
        <Input
          label='Password'
          type='password'
          placeholder='Password'
          name='password'
          value={data.password}
          onChange={handleChange}
        />
        <Input
          label='Confirm Password'
          type='password'
          placeholder='Password'
          name='confirmPassword'
          value={data.confirmPassword}
          onChange={handleChange}
        />

        <RedirectContainer>
          <span>Aready have and account? </span>
          <RedirectLink to='/login'>Login</RedirectLink>
        </RedirectContainer>
        <Button type='submit'>Submit</Button>
      </Form>
    </Container>
  );
};

export default SignUp;
