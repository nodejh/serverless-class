// 获取当前时间, 例如 2020-12-01 12:01:05
const now = format(new Date());

// 取前一分钟的整点时间作为开始时间，例如 2020-12-01 12:00:00
const start_time = getStartTime(now);
// 取当前分钟的整点时间作为开始时间，例如 2020-12-01 12:01:00
const end_time = getEndTime(now);

// 日志服务 Client 实例，可以用来查询日志
const client = new Client();
// 数据库实例
const db = new DB();


// 计算前一分钟内的 PV
async function countPV() {
  const sql = `SELECT COUNT(*) FROM log WHERE time >=${start_time} AND time < ${end_time}`;
  return await client.query(sql);
}


// 计算前一分钟的 UV
async function countUV() {
  const sql = `SELECT COUNT(DISTINCT user_id) FROM log WHERE time >=${start_time} AND time < ${end_time}`;
  return await client.query(sql);
}


// 将 UV 和 PV 信息存入数据库
async function saveDataToDB() {
  const pv = await countPV();
  const uv = await countUV();
  const sql = 'INSERT INTO user(uv, pv) values(?, ?)';
  await db.query(sql, [uv, pv]);
}


// 入口函数
exports.handler = (event, callback) => {
  saveDataToDB()
  .then(() => callback(null))
  .catch(callback(error));
}
