const { TestScheduler } = require('jest');
const Employee = require('../lib/Employee');

// test that Employee is an object
test('Employee returns object', () => {
  const empObj = new Employee();
  expect(typeof(empObj)).toBe('object');
});

// test if we can set name through our constructor
test('value of name is returned', () => {
  const name = 'Matthews';
  const empObj = new Employee(name);
  expect(empObj.name).toBe(name);
});

// test if we can set id through our constructor
test('value of id is returned', () => {
  const id = 123;
  const empObj = new Employee('Amie', id);
  expect(empObj.id).toBe(id);
});




// test if getName returns a name
test('return a name', () => {
  const nameValue = 'Matthews';
  const empObj = new Employee(nameValue);
  expect(empObj.getName()).toBe(nameValue);
});




// test if getRole will return Employee
test('return Employee', () => {
  const employeeValue = 'Employee';
  const empObj = new Employee('Amie', 123, 'amie@yahoo.com');
  expect(empObj.getRole()).toBe(employeeValue);
});