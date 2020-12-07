const {
  successResponseWithData,
} = require('../helpers/response');

module.exports.getStudentDetailsController = [async (req, res) => {
  const result = {
    name: 'Jeevan',
    uid: '1AY18CS045',
    courses: [{
      totalClass: 70,
      classAttended: 55,
    }, {
      totalClass: 70,
      classAttended: 55,
    }, {
      totalClass: 70,
      classAttended: 55,
    }],
  };
  successResponseWithData(res, result);
}];

module.exports.getStudentCoursesController = [async (req, res) => {
  const courses = [{
    subjectCode: 'CS051',
    subjectName: 'MEITI',
  }, {
    subjectCode: 'CS052',
    subjectName: 'CNS',
  }, {
    subjectCode: 'CS053',
    subjectName: 'DBMS',
  }];
  successResponseWithData(res, courses);
}];
