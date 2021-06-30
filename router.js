const express = require('express');
const route = express.Router();
const mysql = require('mysql');

//数据库连接池

var pool = mysql.createPool({
    connectionLimit: 10,
    host: '132.226.231.148',
    port: '3306',
    user: 'root',
    password: '880623ll',
    database: 'job'
});

route.get("/getstudents", (req, res) => {
    console.log(req.query.suppliername)
    let sql = 'select * from supplier where 1=1';
    let params = [];

    //拼接sql
    if(req.query.suppliername){
        sql+=" and supplier_name like ?";
        params.push(req.query.suppliername);
    }


    //根据筛选条件查询信息
    pool.getConnection(function (err, connection) {
        if (err) throw err;
        connection.query(sql, params, function (error, results, fields) {

            connection.release();
            //console.log(results);
            res.render('student', {
                res: results,
                searchname: req.query.suppliername?req.query.suppliername:''
            })


            if (error) throw error;


        });
    });

    //渲染ejs

})

module.exports = route;