/** @jsxImportSource @emotion/core */

import { Grid } from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Agog, Container } from '../../components';
import { getAdminClassesList } from '../../redux/api';

const TimeTables = () => {
  const [classesList, setClassesList] = useState([]);
  const { path } = useRouteMatch();
  useEffect(async () => {
    const { data: classes } = await getAdminClassesList();
    setClassesList(classes);
  }, []);
  return (
    <Container type="center">
      <p>This is timetables</p>
      <p>Classes:</p>
      <Grid templateColumns="repeat(auto-fill, minmax(200px, 1fr))" gap={5}>
        {classesList.map(({ semester, section, classID }) => (
          <Link to={`${path}/${classID}`} key={classID} style={{}}>
            <Agog>{`${semester} - ${section}`}</Agog>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};

export default TimeTables;
