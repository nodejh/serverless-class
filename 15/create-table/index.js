const TableStore = require('tablestore');


// 初始化 TableStore client
const client = new TableStore.Client({
    accessKeyId: '<your access key>',
    accessKeySecret: '<your access secret>',
    endpoint: 'https://serverless-app.cn-shanghai.ots.aliyuncs.com',
    instancename: 'serverless-app',
});


/**
 * 创建 user 表
 */
async function createTableIfNotExist() {
    const table = {
        tableMeta: {
            tableName: 'user',
            primaryKey: [
                {
                    name: 'name',
                    type: TableStore.PrimaryKeyType.STRING
                }
            ],
            definedColumn: [
                {
                    "name": "password",
                    "type": TableStore.DefinedColumnType.DCT_STRING
                },
                {
                    "name": "age",
                    "type": TableStore.DefinedColumnType.DCT_INTEGER
                }
            ],
        },
        reservedThroughput: {
            capacityUnit: {
                read: 0,
                write: 0
            }
        },
        tableOptions: {
            timeToLive: -1,
            maxVersions: 1
        },
    };
    await client.createTable(table);
}


async function getUser() {
    const { row } = await client.getRow({
        tableName: "user",
        primaryKey: [
            {
                name: 'Jack1'
            }
        ]
    });
    console.log('user is: ', row)

    const user = {}
    row.attributes.forEach(item => user[item.columnName] = item.columnValue);
    console.log(user);

    if (row.primaryKey) {
        // res.json({
        //     success: false,
        //     message: '用户已存在'
        // });
        return;
    }
}


async function createUser() {
    var params = {
        tableName: "user",
        condition: new TableStore.Condition(TableStore.RowExistenceExpectation.EXPECT_NOT_EXIST, null),
        primaryKey: [
            {
                name: 'Jack1'
            }
        ],
        attributeColumns: [
            { 'password': '123456' },
            { 'age': 18 }
        ],
    };

    await client.putRow(params);

}


// (async function () {
//     await createTableIfNotExist()
// })()


(async function () {
    await getUser()
    // await createUser()
})()