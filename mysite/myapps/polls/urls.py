#!usr/bin/env python
# coding=utf-8
# Author: zhezhiyong@163.com
# Created: 2015年10月30日 30:11:05
# 编辑器：pycharm4.5.4，python版本：2.7.10
"""
# TODO(purpose): URL视图映射
"""
from django.conf.urls import url

from . import views

# 正则表达式
# 字符		含义
# ^			行首
# $			行尾
# \d			任意数字
# \s			任意空白字符
# \w			[A-Za-z0-9]
# *			零个或多个
# +			一个或多个
# ?			零个或一个
# {2,}		两个以上
urlpatterns = [
    # ex: /polls/
    url(r'^$', views.index, name='index'),
    # ex: /polls/5/
    url(r'^(?P<question_id>[0-9]+)/$', views.detail, name='detail'),
    # ex: /polls/5/results/
    url(r'^(?P<question_id>[0-9]+)/results/$', views.results, name='results'),
    # ex: /polls/5/vote/
    url(r'^(?P<question_id>[0-9]+)/vote/$', views.vote, name='vote'),
]
