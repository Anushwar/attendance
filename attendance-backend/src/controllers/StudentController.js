const {
  successResponseWithData,
} = require('../helpers/response');

module.exports.getStudentDetailsController = [async (req, res) => {
  delete req.user.password;
  successResponseWithData(res, res);
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
