/** @jsxImportSource @emotion/core */

import { Input, Button, useToast, Textarea } from '@chakra-ui/core';
import { useState } from 'react';
import JSONViewer from 'react-json-viewer';
import { Container } from '../../components';
import { postAdminCreateCourse } from '../../redux/api';

const CreateCourse = () => {
  const [courseCode, setCourseCode] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseHoursLecture, setCourseHoursLecture] = useState('');
  const [courseHoursTutorial, setCourseHoursTutorial] = useState('');
  const [courseHoursPractical, setCourseHoursPractical] = useState('');
  const [courseCredits, setCourseCredits] = useState('');
  const [courseDescription, setCourseDescription] = useState();
  const [result, setResult] = useState();

  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data: course } = await postAdminCreateCourse(
        courseCode,
        courseName,
        courseHoursLecture,
        courseHoursTutorial,
        courseHoursPractical,
        courseCredits,
        courseDescription
      );
      setResult(course);
    } catch (err) {
      setResult();
      console.log(JSON.stringify(err.res, null, 4));
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
      <p>Hello this is Course creation</p>
      Course code
      <Input
        placeholder="Enter Course Code"
        value={courseCode}
        onChange={(e) => setCourseCode(e.target.value)}
      />
      Course Name
      <Input
        placeholder="Enter Course Name"
        value={courseName}
        onChange={(e) => setCourseName(e.target.value)}
      />
      <div css={{ display: 'flex', '& > div': { flexGrow: 1 } }}>
        <div>
          Course Lecture hours
          <Input
            placeholder="Enter Course Lecture hours"
            type="number"
            step="1"
            pattern="\d+"
            value={courseHoursLecture}
            onChange={(e) => setCourseHoursLecture(e.target.value)}
          />
        </div>
        <div>
          Course tutorial hours
          <Input
            placeholder="Enter Course Tutorial hours"
            type="number"
            step="1"
            pattern="\d+"
            value={courseHoursTutorial}
            onChange={(e) => setCourseHoursTutorial(e.target.value)}
          />
        </div>
        <div>
          Course practical hourse
          <Input
            placeholder="Enter Course Practical hours"
            type="number"
            step="1"
            pattern="\d+"
            value={courseHoursPractical}
            onChange={(e) => setCourseHoursPractical(e.target.value)}
          />
        </div>
        <div>
          Course Credits
          <Input
            placeholder="Enter Course Credits"
            type="number"
            step="1"
            pattern="\d+"
            value={courseCredits}
            onChange={(e) => setCourseCredits(e.target.value)}
          />
        </div>
      </div>
      Course Description
      <Textarea
        placeholder="Enter Course Description"
        value={courseDescription}
        onChange={(e) => setCourseDescription(e.target.value)}
      />
      <Button
        css={{ margin: '1rem auto 2rem', display: 'block', width: '100%' }}
        type="submit"
      >
        Create Course
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
