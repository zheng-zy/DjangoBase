# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Department',
            fields=[
                ('dep_id', models.AutoField(max_length=10, serialize=False, primary_key=True)),
                ('dep_cn', models.CharField(max_length=50, null=True)),
                ('dep_desc', models.CharField(max_length=100, null=True)),
                ('parent_id', models.IntegerField(null=True)),
                ('dep_type', models.IntegerField(null=True)),
                ('dep_en', models.CharField(max_length=50, null=True)),
            ],
            options={
                'db_table': 'sm_department',
            },
        ),
        migrations.CreateModel(
            name='Dict',
            fields=[
                ('sys_int_id', models.AutoField(max_length=11, serialize=False, primary_key=True)),
                ('name_cn', models.CharField(max_length=100, null=True)),
                ('dict_type', models.CharField(max_length=100, null=True)),
                ('item_cn', models.CharField(max_length=100, null=True)),
                ('item_value', models.CharField(max_length=100, null=True)),
                ('item_order', models.IntegerField(null=True)),
                ('parent_node', models.CharField(max_length=100, null=True)),
                ('create_time', models.DateTimeField(null=True)),
                ('modify_time', models.DateTimeField(null=True)),
                ('is_enable', models.IntegerField(null=True)),
            ],
            options={
                'db_table': 'cm_dict',
            },
        ),
    ]
