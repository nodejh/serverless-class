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

    this.db.saveUser(user, (err, id) => {
      if (err) {
        callback(err);
      } else {
        const success = this.mailer.sendWelcomeEmail(email);
        if (success) {
          callback(null, id);
        } else {
          callback(`发送邮件（${email}）失败`);
        }
      }
    });
  }
}

module.exports = Users;