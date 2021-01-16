/** @jsxImportSource @emotion/core */

import { Button, useToast, Input, FormLabel } from '@chakra-ui/core';
import { useState } from 'react';
import JSONViewer from 'react-json-viewer';
import TimeRangePicker from '@wojtekmaj/react-timerange-picker';
import { Container } from '../../components';
import { postAdminCreateSlot } from '../../redux/api';

const CreateCourse = () => {
  const [result, setResult] = useState();
  const [name, setName] = useState('');
  const [timeRange, setTimeRange] = useState(['10:00', '11:00']);

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: slot } = await postAdminCreateSlot(
        name,
        timeRange[0],
        timeRange[1]
      );
      setResult(slot);
      toast({
        title: 'Sucessful',
        description: `Slot created`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (err) {
      setResult();
      toast({
        title: 'Error!!.',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Container type="center" as="form" onSubmit={handleSubmit}>
      <p>Hello this is Slot Creation</p>
      <FormLabel>Pick start and end time</FormLabel>
      <TimeRangePicker disableClock onChange={setTimeRange} value={timeRange} />
      <Input
        placeholder="Enter Slot Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create slots
      </Button>
      {result && (
        <>
          Course Created succesfully
          <JSONViewer json={result} css={{ width: '100%' }} />
        </>
      )}
    </Container>
  );
};

export default CreateCourse;
