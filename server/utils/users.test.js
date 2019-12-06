const expect = require('expect');

const {Users} = require('./users');

describe('Users',() => {
 
    var users;

    beforeEach(() => {
      users = new Users();
      users.users = [{
          id:'1',
          name:'Mike',
          room:'Node'
      },{
        id:'2',
        name:'jen',
        room:'react'
    },{
        id:'3',
        name:'julia',
        room:'Node'
    }]
    });

  it('should add new user',() => {
      var users = new Users();
      var user = {
          id:'123',
          name:'Bharga',
          room:'B'
      };
      var resUser = users.addUser(user.id,user.name,user.room);
      expect(users.users).toEqual([user]);
  });

  it('should remove user',() => {

    var user = users.removeUser('1');

    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user',() => {

    var user = users.removeUser('0');

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);

  });

  it('should find User',() => {
    var user = users.getUser('1');
    expect(user).toEqual(users.users[0]);
  });

  it('should not find users ',() => { 
    var user = users.getUser(0);
    expect(user).toEqual(undefined);
  });

  it('should return names for node course',() => {
    var userList = users.getUserList('Node');
    expect(userList).toEqual(['Mike','julia']);
  });

  it('should return names for react course',() => {
    var userList = users.getUserList('react');
    expect(userList).toEqual(['jen']);
  });

});