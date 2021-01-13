import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import JSONViewer from 'react-json-viewer';
import {
  useToast,
  FormControl,
  FormLabel,
  Select,
  Button,
} from '@chakra-ui/core';
import { Container } from '../../components';
import {
  getAdminTimetableOfClass,
  getAdminCoursesOfClass,
  getAdminSlotList,
  postAdminTimetableOfClass,
} from '../../redux/api';
import { days } from '../../constants';

const TimeTable = () => {
  const { classID } = useParams();
  const [day, setDay] = useState('');
  const [slotID, setSlotID] = useState('');
  const [courseID, setCourseID] = useState('');
  const [timeTable, setTimeTable] = useState([]);
  const [slotsList, setSlotsList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const toast = useToast();

  // load classes
  useEffect(async () => {
    try {
      const { data: slots } = await getAdminSlotList();
      setSlotsList(slots);
    } catch (err) {
      toast({
        title: 'Error!!.',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, []);

  useEffect(async () => {
    try {
      const { data: timetable } = await getAdminTimetableOfClass(classID);
      setTimeTable(timetable);
      const { data: courses } = await getAdminCoursesOfClass(classID);
      setCourseList(courses);
    } catch (err) {
      toast({
        title: 'Error!!.',
        description: err?.response?.data?.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  }, [classID]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: timeTableEntry } = await postAdminTimetableOfClass(
      classID,
      day,
      slotID,
      courseID
    );
    setTimeTable(timeTable.concat(timeTableEntry));
  };
  return (
    <Container type="center" as="form" onSubmit={handleSubmit}>
      <p>Hello this is Timetable</p>
      <FormControl>
        <FormLabel>Select a day</FormLabel>
        <Select
          value={day}
          placeholder="Select a Day"
          onChange={(e) => setDay(e.target.value)}
        >
          {Object.entries(days).map(([index, newDay]) => (
            <option key={newDay} value={index}>
              {newDay}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select a slot</FormLabel>
        <Select
          value={slotID}
          placeholder="Select a Slot"
          onChange={(e) => setSlotID(e.target.value)}
        >
          {slotsList.map(({ slotID: id, name, startTime, endTime }) => (
            <option key={id} value={id}>
              {`${name} ${startTime} - ${endTime}`}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select a course</FormLabel>
        <Select
          value={courseID}
          placeholder="Select a Course"
          onChange={(e) => setCourseID(e.target.value)}
        >
          {courseList.map(({ courseID: id, courseName }) => (
            <option key={id} value={id}>
              {courseName}
            </option>
          ))}
        </Select>
      </FormControl>
      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Enrollment
      </Button>
      {timeTable && (
        <>
          Timetable
          <JSONViewer json={timeTable} css={{ width: '100%' }} />
        </>
      )}
      {slotsList && (
        <>
          Slots
          <JSONViewer json={slotsList} css={{ width: '100%' }} />
        </>
      )}
      {courseList && (
        <>
          Courses
          <JSONViewer json={courseList} css={{ width: '100%' }} />
        </>
      )}
    </Container>
  );
};

export default TimeTable;
