const TableStore = require("tablestore");
const { accessKeyId, accessKeySecret } = require("./config");

const client = new TableStore.Client({
  accessKeyId,
  accessKeySecret,
  endpoint: "https://serverless-app.cn-shanghai.ots.aliyuncs.com",
  instancename: "serverless-cms",
});

/**
 * 插入一行数据
 * @param {string} table 表名，如 user
 * @param {array<object>} primary  主键数据，如 [{ username: 'Jack' }]
 * @param {array<object>} colums 列数据，如 [{ password: '123456' }]
 */
const createRow = async function (table, primary, colums) {
  const params = {
    tableName: table,
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: primary,
    attributeColumns: colums,
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
 * @param {primary} primary 主键数据，如 [{ username: 'Jack' }]
 * @return {object} 查询结构，如 { username: 'Jack', password: '123456' }
 */
const getRow = async function (table, primary) {
  const params = {
    tableName: "user",
    primaryKey: primary,
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
 * @param {array<object>} primary  主键数据，如 [{ username: 'Jack' }]
 * @param {array<object>} colums 需要更新的列数据，如 [{ password: '123456' }]
 */
const updateRow = async function (table, primary, data) {
  var params = {
    tableName: table,
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: primary,
    updateOfAttributeColumns: [
      {
        PUT: data,
      },
    ],
  };

  await client.updateRow(params);
};

/**
 * 删除一行数据
 * @param {*} table
 * @param {array<object>} primary  主键数据，如 [{ username: 'Jack' }]
 */
const deleteRow = async function (table, primary) {
  var params = {
    tableName: table,
    condition: new TableStore.Condition(
      TableStore.RowExistenceExpectation.IGNORE,
      null
    ),
    primaryKey: primary,
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
