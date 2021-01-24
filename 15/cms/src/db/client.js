const TableStore = require("tablestore");
const { accessKeyId, accessKeySecret } = require("../config/index");

const client = new TableStore.Client({
  accessKeyId,
  accessKeySecret,
  endpoint: "https://serverless-app.cn-shanghai.ots.aliyuncs.com",
  instancename: "serverless-cms",
});

/**
 * 将对象转换为数组对象
 * @param {object} obj 待转换对象，例如 { username: 'Jack' }
 * @return {array<object>} 转换后的数组，例如 [{ username: 'Jack' }]
 */
const changeObjectToArray = function (obj) {
  const res = [];
  Object.keys(obj).forEach((key) => {
    res.push({ [key]: obj[key] });
  });
  return res;
};

/**
 * 插入一行数据
 * @param {string} table 表名，如 user
 * @param {object} primary  主键数据，如 { username: 'Jack' }
 * @param {object} colums 列数据，如 { password: '123456' }
 */
const createRow = async function (table, primary, colums) {
  const params = {
    tableName: table,
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: changeObjectToArray(primary),
    attributeColumns: changeObjectToArray(colums),
    returnContent: {
      returnType: TableStore.ReturnType.Primarykey,
    },
  };
  await client.putRow(params);
};

/**
 * 根据主键查询数据
 *
 * @param {string} table 表名，如 user
 * @param {object} primary  主键数据，如 { username: 'Jack' }
 */
const getRow = async function (table, primary) {
  const params = {
    tableName: table,
    primaryKey: changeObjectToArray(primary),
    maxVersions: 2,
  };

  const { row } = await client.getRow(params);
  const res = {};
  row.primaryKey.forEach((item) => (res[item.name] = item.value));
  row.attributes.forEach((item) => (res[item.columnName] = item.columnValue));
  return res;
};

/**
 * 更新一行数据
 * @param {string} table 表名，如 user
 * @param {object} primary  主键数据，如 { username: 'Jack' }
 * @param {object} colums 列数据，如 { password: '123456' }
 */
const updateRow = async function (table, primary, data) {
  var params = {
    tableName: table,
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: changeObjectToArray(primary),
    updateOfAttributeColumns: [{ PUT: changeObjectToArray(data) }],
  };

  await client.updateRow(params);
};

/**
 * 删除一行数据
 * @param {*} table
 * @param {object} primary  主键数据，如 { username: 'Jack' }
 */
const deleteRow = async function (table, primary) {
  var params = {
    tableName: table,
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: changeObjectToArray(primary),
  };

  await client.deleteRow(params);
};

module.exports = {
  client,
  createRow,
  updateRow,
  getRow,
  deleteRow,
};
