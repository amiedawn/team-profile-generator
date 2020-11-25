const Intern = require('../lib/Intern');
const Employee = require('../lib/Employee');

describe('Intern', () => {
  // test that Intern is an object
  test('Intern returns object', () => {
    const internObj = new Intern();
    expect(typeof(internObj)).toBe('object');
  });

  // test if school can be set through the constructor
  test('value of school is returned', () => {
    const school = 'Harvard';
    const internObj = new Intern('Amie', 144, 'sara@yahoo.com', school);
    expect(internObj.school).toBe(school);
  });

  // test if getSchool() returns a school name
  test('return school name', () => {
    const schoolValue = 'Stanford';
    const internObj = new Intern('Amie', 14, 'sara@yahoo.com', schoolValue);
    expect(internObj.getSchool()).toBe(schoolValue);
  });

  // test if getRole() is overriden to return Intern
  test('return Intern', () => {
    const roleValue = 'Intern';
    const internObj = new Intern('Amie', 23, 'mo@hotmail.com', roleValue);
    expect(internObj.getRole()).toBe(roleValue);
  });
});
