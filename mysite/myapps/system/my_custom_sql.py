#!usr/bin/env python
# coding=utf-8
# Author: zhezhiyong@163.com
# Created: 2015年11月04日 04:16:52
# 编辑器：pycharm4.5.4，python版本：2.7.10
"""
# TODO(purpose): 自定义sql查询
"""
from django.db import connection, transaction


# django.db.connection：代表默认的数据库连接
# django.db.transaction ：代表默认数据库事务（transaction）
# 用database connection调用 connection.cursor() 得到一个游标(cursor)对象。
# 然后调用 cursor.execute(sql, [params]) 执行SQL
# cursor.fetchone() 或者 cursor.fetchall()： 返回结果行
# 如果执行修改操作，则调用 transaction.commit_unless_managed()来保证你的更改提交到数据库

# django.db.connections ：针对使用多个数据库
# from django.db import connections
# cursor = connections['my_db_alias'].cursor()
# transaction.commit_unless_managed(using='my_db_alias')

def my_custom_sql_q(sql):
    cursor = connection.cursor()

    # 数据修改操作——提交要求
    # cursor.execute("UPDATE bar SET foo = 1 WHERE baz = %s", [self.baz])
    # transaction.commit_unless_managed()

    # 数据检索操作,不需要提交
    cursor.execute(sql)
    row = cursor.fetchall()
    return row


def my_custom_sql_adu(sql):
    cursor = connection.cursor()
    try:
        # 数据修改操作——提交要求
        cursor.execute(sql)
        transaction.commit(cursor)
    except:
        transaction.rollback(cursor)
    return
