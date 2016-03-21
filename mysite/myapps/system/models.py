#!usr/bin/env python
# coding=utf-8
import datetime
from django.db import models
from django.utils import timezone


# (	"DEP_ID" NUMBER(10,0) NOT NULL ENABLE,
# "DEP_CN" VARCHAR2(50),
# "DEP_DESC" VARCHAR2(200),
# "PARENT_ID" NUMBER(10,0),
# "DEP_TYPE" NUMBER(10,0),
# "DEP_EN" VARCHAR2(50),
#  CONSTRAINT "KEY_SM_DEPARTMENT" PRIMARY KEY ("DEP_ID")
class Department(models.Model):
    #     question_text = models.CharField(max_length=200)
    # pub_date = models.DateTimeField('date published')
    dep_id = models.AutoField(max_length=10, primary_key=True)
    dep_cn = models.CharField(max_length=50, null=True)
    dep_desc = models.CharField(max_length=100, null=True)
    parent_id = models.IntegerField(null=True)
    dep_type = models.IntegerField(null=True)
    dep_en = models.CharField(max_length=50, null=True)

    class Meta:
        db_table = 'sm_department'
        # (	"SYS_INT_ID" NUMBER(11,0) NOT NULL ENABLE,


class Dict(models.Model):
    db_table = 'cm_dict'
    sys_int_id = models.AutoField(max_length=11, primary_key=True)
    name_cn = models.CharField(max_length=100, null=True)
    dict_type = models.CharField(max_length=100, null=True)
    item_cn = models.CharField(max_length=100, null=True)
    item_value = models.CharField(max_length=100, null=True)
    item_order = models.IntegerField(null=True)
    parent_node = models.CharField(max_length=100, null=True)
    create_time = models.DateTimeField(null=True)
    modify_time = models.DateTimeField(null=True)
    is_enable = models.IntegerField(null=True)

    class Meta:
        db_table = 'cm_dict'

# python manage.py makemigrations
# python manage.py migrate
