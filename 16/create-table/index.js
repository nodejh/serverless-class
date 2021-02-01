const TableStore = require("tablestore");

// 初始化 TableStore client
const client = new TableStore.Client({
  accessKeyId: process.env.AK,
  accessKeySecret: process.env.SK,
  endpoint: "https://serverless-app.cn-shanghai.ots.aliyuncs.com",
  instancename: "serverless-cms",
});

/**
 * 创建 user 表
 *
 * 参考文档： https://help.aliyun.com/document_detail/100594.html
 */
async function createUserTable() {
  const table = {
    tableMeta: {
      tableName: "user",
      primaryKey: [
        {
          name: "username", // 用户名
          type: TableStore.PrimaryKeyType.STRING,
        },
      ],
      definedColumn: [
        {
          name: "password", // 密码
          type: TableStore.DefinedColumnType.DCT_STRING,
        },
      ],
    },
    // 为数据表配置预留读吞吐量或预留写吞吐量。0 表示不预留吞吐量，完全按量付费
    reservedThroughput: {
      capacityUnit: {
        read: 0,
        write: 0,
      },
    },
    tableOptions: {
      // 数据的过期时间，单位为秒，-1表示永不过期
      timeToLive: -1,
      // 保存的最大版本数，1 表示每列上最多保存一个版本即保存最新的版本
      maxVersions: 1,
    },
  };
  await client.createTable(table);
}

/**
 * 创建文章表
 */
async function createArticleTable() {
  const table = {
    tableMeta: {
      tableName: "article",
      primaryKey: [
        {
          name: "article_id", // 文章 ID，唯一字符串
          type: TableStore.PrimaryKeyType.STRING,
        },
      ],
      definedColumn: [
        {
          name: "title",
          type: TableStore.DefinedColumnType.DCT_STRING,
        },
        {
          name: "username",
          type: TableStore.DefinedColumnType.DCT_STRING,
        },
        {
          name: "content",
          type: TableStore.DefinedColumnType.DCT_STRING,
        },
        {
          name: "create_date",
          type: TableStore.DefinedColumnType.DCT_STRING,
        },
        {
          name: "update_date",
          type: TableStore.DefinedColumnType.DCT_STRING,
        },
      ],
    },
    // 为数据表配置预留读吞吐量或预留写吞吐量。0 表示不预留吞吐量，完全按量付费
    reservedThroughput: {
      capacityUnit: {
        read: 0,
        write: 0,
      },
    },
    tableOptions: {
      // 数据的过期时间，单位为秒，-1表示永不过期
      timeToLive: -1,
      // 保存的最大版本数，1 表示每列上最多保存一个版本即保存最新的版本
      maxVersions: 1,
    },
  };

  await client.createTable(table);
}

(async function () {
    await createUserTable();
  await createArticleTable();
})();
