const Manager = require('../lib/Manager');
const Employee = require('../lib/Employee');

describe('Manager', () => {
  // test that Manager is an object
  test('Manager returns object', () => {
    const mgrObj = new Manager();
    expect(typeof(mgrObj)).toBe('object');  
  });

  // test if officeNumber can be set through the constructor
  test('value of office number is returned', () => {
    const officeNumber = 50;
    const mgrObj = new Manager('Amie', 345, 'brad@yahoo.com', officeNumber);
    expect(mgrObj.officeNumber).toBe(officeNumber);
  });

  // test function
  // test if getRole() gets overridden to return 'Manager'
  test('return Manager', () => {
    const roleValue = 'Manager';
    const mgrObj = new Manager('Amie', 345, 'brad@yahoo.com', 80);
    expect(mgrObj.getRole()).toBe(roleValue);
  });
});  
