const Employee = require('../lib/Employee');

describe('Employee', () => {
  // test that Employee is an object
  test('Employee returns object', () => {
    const empObj = new Employee();
    expect(typeof(empObj)).toBe('object');
  });

  // test if name can be set through the constructor
  test('value of name is returned', () => {
    const name = 'Matthews';
    const empObj = new Employee(name);
    expect(empObj.name).toBe(name);
  });

  // test if id can be set through the constructor
  test('value of id is returned', () => {
    const id = 123;
    const empObj = new Employee('Amie', id);
    expect(empObj.id).toBe(id);
  });

  // test if email can be set through the constructor
  test('value of email is returned', () => {
    const email = 'bill@yahoo.com';
    const empObj = new Employee('Amie', 345, email);
    expect(empObj.email).toBe(email);
  });

  // test functions
  // test if getName() returns a name
  test('return a name', () => {
    const nameValue = 'Matthews';
    const empObj = new Employee(nameValue);
    expect(empObj.getName()).toBe(nameValue);
  });

  // test if getId() returns an ID
  test('return an ID', () => {
    const idValue = '789';
    const empObj = new Employee('Amie', idValue);
    expect(empObj.getId()).toBe(idValue);
  });

  // test if getEmail() returns an email
  test('return an email', () => {
    const emailValue = 'liz@aol.com';
    const empObj = new Employee('Amie', 432, emailValue);
    expect(empObj.getEmail()).toBe(emailValue);
  });

  // test if getRole will return Employee
  test('return Employee', () => {
    const roleValue = 'Employee';
    const empObj = new Employee('Amie', 123, 'amie@yahoo.com');
    expect(empObj.getRole()).toBe(roleValue);
  });
});