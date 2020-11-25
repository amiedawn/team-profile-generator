const Engineer = require('../lib/Engineer');
const Employee = require('../lib/Employee');

describe('Engineer', () => {
  // test that Engineer is an object
  test('Engineer returns object', () => {
    const engObj = new Engineer();
    expect(typeof(engObj)).toBe('object');
  });  

  // test if github can be set through the constructor
  test('value of github is returned', () => {
    const github = 'amiedawn';
    const engObj = new Engineer('Amie', 345, 'solo@hotmail.com', github);
    expect(engObj.github).toBe(github);
  });

  // test functions
  // test if getGitHub() returns a GitHub username
  test('return GitHub username', () => {
    const githubValue = 'amiedawn';
    const engObj = new Engineer('Amie', 345, 'solo@hotmail.com', githubValue);
    expect(engObj.getGitHub()).toBe(githubValue);
  });

  // test if getRole() gets overriden to return 'Engineer'
  test('return Engineer', () => {
    const roleValue = 'Engineer';
    const engObj = new Engineer('Amie', 345, 'solo@hotmail.com', 'amiedawn');
    expect(engObj.getRole()).toBe(roleValue);
  });
});