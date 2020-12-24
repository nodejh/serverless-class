class Users {
  constructor(db, mailer) {
    this.db = db;
    this.mailer = mailer;
  }

  save(email, callback) {
    const user = {
      email: email,
      created_at: Date.now(),
    };
    
    // 将用户信息存入数据库
    this.db.saveUser(user, (err, userId) => {
      if (err) { 
        callback('保存用户信息失败');
      } else {
        // 存入成功后，为用户发送一封邮件
        const success = this.mailer.sendWelcomeEmail(email);
        if (success) {
          // 如果发送邮件成功，则通过回调函数返回 userId
          callback(null, userId);
        } else {
          // 如果发送邮件失败，则通过回调函数告诉调用方发送邮件失败
          callback(`发送邮件（${email}）失败`);
        }
      }
    });
  }
}

module.exports = Users;