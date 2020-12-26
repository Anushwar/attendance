/** @jsxImportSource @emotion/core */

import {
  Button,
  useToast,
  Select,
  FormControl,
  FormLabel,
} from '@chakra-ui/core';
import { useEffect, useState } from 'react';
import JSONViewer from 'react-json-viewer';
import { Container } from '../../components';
import {
  getAdminTeachersList,
  getAdminClassesList,
  getAdminCoursesList,
  getAdminEnrollmentsList,
  postAdminEnrollment,
} from '../../redux/api';

const CreateClass = () => {
  const [classID, setClassID] = useState('');
  const [courseID, setCourseID] = useState('');
  const [tid, setTid] = useState();
  const [teachersList, setTeachersList] = useState([]);
  const [classesList, setClassesList] = useState([]);
  const [coursesList, setCoursesList] = useState([]);
  const [enrollmentsList, setEnrollmentsList] = useState([]);
  const [result, setResult] = useState();

  useEffect(async () => {
    const { data: teachers } = await getAdminTeachersList();
    setTeachersList(teachers);
    const { data: classes } = await getAdminClassesList();
    setClassesList(classes);
    const { data: courses } = await getAdminCoursesList();
    setCoursesList(courses);
    const { data: enrollments } = await getAdminEnrollmentsList();
    setEnrollmentsList(enrollments);
  }, []);

  let applicableCoursesList = null;
  if (!classID || !enrollmentsList) {
    applicableCoursesList = coursesList;
  } else {
    const enrolledCourseIDList = enrollmentsList
      .filter((enrollment) => enrollment.classID === classID)
      .map((enrollment) => enrollment.courseID);
    if (enrolledCourseIDList.length === 0) {
      applicableCoursesList = coursesList;
    } else {
      applicableCoursesList = coursesList.filter(
        (enrollment) => !enrolledCourseIDList.includes(enrollment.courseID)
      );
    }
  }
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: enrollment } = await postAdminEnrollment(
        classID,
        courseID,
        tid
      );
      setResult(enrollment);
      toast({
        title: 'Sucessful',
        description: `Enrollment created succesfully`,
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setEnrollmentsList([...enrollmentsList, enrollment]);
      setCourseID();
    } catch (err) {
      setResult();
      toast({
        title: 'Warning.',
        description: err?.response?.data?.message,
        status: 'warning',
        duration: 5000,
        isClosable: true,
      });
    }
  };
  return (
    <Container type="center" as="form" onSubmit={handleSubmit}>
      <p>Hello this is enrollments</p>
      <FormControl>
        <FormLabel>Select a class</FormLabel>
        <Select
          value={classID}
          placeholder="Select a Class"
          onChange={(e) => setClassID(e.target.value)}
        >
          {classesList.map((myClass) => (
            <option key={myClass.classID} value={myClass.classID}>
              {`${myClass.semester} - ${myClass.section} (teacherID-${myClass.tid})`}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select a course</FormLabel>
        <Select
          value={courseID}
          placeholder="Select a course"
          onChange={(e) => setCourseID(e.target.value)}
        >
          {applicableCoursesList.map((course) => (
            <option key={course.courseID} value={course.courseID}>
              {`${course.courseName}(courseID-${course.courseID})`}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Select a teacher</FormLabel>
        <Select
          value={tid}
          placeholder="Select a teacher"
          onChange={(e) => setTid(e.target.value)}
        >
          {teachersList.map((teacher) => (
            <option key={teacher.tid} value={teacher.tid}>
              {`${teacher.name}(tid-${teacher.tid})`}
            </option>
          ))}
        </Select>
      </FormControl>

      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Class
      </Button>
      {teachersList && (
        <>
          Teachers:
          <JSONViewer json={teachersList} css={{ width: '100%' }} />
        </>
      )}
      {classesList && (
        <>
          Classes:
          <JSONViewer json={classesList} css={{ width: '100%' }} />
        </>
      )}
      {coursesList && (
        <>
          Courses:
          <JSONViewer json={coursesList} css={{ width: '100%' }} />
        </>
      )}
      {enrollmentsList && (
        <>
          Enrollments:
          <JSONViewer json={enrollmentsList} css={{ width: '100%' }} />
        </>
      )}
      {result && (
        <>
          Teacher Created succesfully
          <JSONViewer json={result} />
        </>
      )}
    </Container>
  );
};

export default CreateClass;
