/** @jsxImportSource @emotion/core */
import { Select, Input, Button } from "@chakra-ui/core";
import { useState } from "react";
import { dispatchRegisterUser } from '../../redux/triggers';
import {useDispatch} from 'react-redux';

const Register = () => {
  const roleOptions = ["admin", "staff", "teacher", "student"];
  const [uid, setUid] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState(roleOptions[0]);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatchRegisterUser(uid, name, role, password)(dispatch);
    console.log('user registered succesfully')
  }

  return (
    <form css={{ maxWidth: 300 }} onSubmit={handleSubmit}>
      <p>This is register page</p>
      <Input
        placeholder="uid"
        value={uid}
        onChange={(e) => {
          setUid(e.target.value);
        }}
      />
      <Input
        type="name"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <Select value={role} onChange={(e) => setRole(e.target.value)}>
        {roleOptions.map((ele, i) => {
          return <option key={ele} value={ele}>{ele}</option>
        })}
      </Select>
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button type="submit" css={{width: '100%', marginTop:10}}>Register</Button>
    </form>
  );
};

export default Register;
