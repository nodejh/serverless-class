const Users = require('../src/users');

describe('users.js', () => {
  describe('save', () => {
    it('发送邮件成功', () => {
      const dbMock = {
        saveUser: jest.fn((user, cb) => cb(null, 1)),
      };
      const mailerMock = {
        sendWelcomeEmail: jest.fn(() => true),
      };
      const users = new Users(dbMock, mailerMock);
      const email = 'test@gmail.com';
      users.save(email, (err, id) => {
        expect(err).toBeNull();
        expect(id).toBe(1);
      });
    });

    it('发送邮件失败', () => {
      const dbMock = {
        saveUser: jest.fn((user, cb) => cb(null, 1)),
      };
      const mailerMock = {
        sendWelcomeEmail: jest.fn(() => false),
      };
      const users = new Users(dbMock, mailerMock);
      const email = 'test@gmail.com';
      users.save(email, (err, id) => {
        expect(err).toBe(`发送邮件（${email}）失败`);
        expect(id).toBeUndefined();
      });
    });
  });
});
