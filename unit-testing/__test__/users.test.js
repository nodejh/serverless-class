const Users = require('../src/users');


test('用户信息写入数据库成功，发送邮件成功', () => {
  // 模拟 db.saveUser，并调用成功
  const db = {
    saveUser: jest.fn((user, cb) => cb(null, 1)),
  };
  // 模拟 mailer.sendWelcomeEmail，并调用成功
  const mailer = {
    sendWelcomeEmail: jest.fn(() => true),
  };
  
  const users = new Users(db, mailer);
  const email = 'test@gmail.com';
  users.save(email, (err, userId) => {
    // 第一个断言，保存用户信息后的结果为 null
    expect(err).toBeNull();
    // 第二个断言，保存并发送
    expect(userId).toBe(1);
  });
});


test('用户信息写入数据库成功，发送邮件失败', () => {
  const db = {
    saveUser: jest.fn((user, cb) => cb(null, 1)),
  };
  const mailer = {
    sendWelcomeEmail: jest.fn(() => false),
  };
  
  const users = new Users(db, mailer);
  const email = 'test@gmail.com';
  users.save(email, (err, userId) => {
    expect(err).toBe(`发送邮件（${email}）失败`);
    expect(userId).toBeUndefined();
  });
});


test('用户信息写入数据失败', () => {
  const db = {
    saveUser: jest.fn((user, cb) => cb(new Error('Internal Error'))),
  };
  const mailer = {
    sendWelcomeEmail: jest.fn(() => false),
  };
  
  const users = new Users(db, mailer);
  const email = 'test@gmail.com';
  users.save(email, (err, userId) => {
    expect(err).toBe('保存用户信息失败');
    expect(userId).toBeUndefined();
  });
});