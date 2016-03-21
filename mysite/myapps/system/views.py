#!usr/bin/env python
# coding=utf-8
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.http import HttpResponse, Http404, HttpResponseRedirect
from django.core.urlresolvers import reverse
from django.template import RequestContext, loader
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt

from .models import Department, Dict

from .my_custom_sql import my_custom_sql_q, my_custom_sql_adu
import logging

logger = logging.getLogger('app.system')
count_sql = '''select count(*) from sm_department'''
dj_sql = '''select item_cn, item_value from cm_dict where dict_type = 'sm_department.type' order by item_order'''
count_sql = '''select count(*) from sm_department'''
count_sql = '''select count(*) from sm_department'''


def sm_smDepartmentAction(request):
    logger.info(request)
    kw = {'contextPath': 'sm'}
    logger.info()
    return render(request, 'system/smDepartment_list.html', kw)
    pass


@csrf_exempt
def queryListJson(request):
    logger.info(request)

    print request.POST

    department_list = Department.objects.order_by('dep_id')[:10]
    print department_list


    # print request.POST.getlist('artists')
    if request.is_ajax() and request.method == 'POST':
        for key in request.POST:
            print key
            valuelist = request.POST.getlist(key)
            print valuelist

    if request.method == 'POST':
        list = '''
        {"total":7,"rows":[{"numrow":"1","dep_type_cn":"地市公司","parent_id_cn":"福建研发部门","dep_id":"376","dep_cn":"福建运维部门2","dep_type":"3","dep_en":"ywbm2","parent_id":"373","dep_desc":"运维部门2"},{"numrow":"2","dep_type_cn":"部门","dep_id":"375","dep_cn":"福建运维部门1","dep_type":"5","dep_en":"ywbm","dep_desc":"运维部门"},{"numrow":"3","dep_type_cn":"部门","dep_id":"374","dep_cn":"福建交易部门","dep_type":"5","dep_en":"jybm","dep_desc":"交易部门1"},{"numrow":"4","dep_type_cn":"部门","parent_id_cn":"福建研发中心","dep_id":"373","dep_cn":"福建研发部门","dep_type":"5","dep_en":"yfbm","parent_id":"371","dep_desc":"研发部门"},{"numrow":"5","dep_type_cn":"省公司","parent_id_cn":"北京总公司","dep_id":"372","dep_cn":"上海研发中心","dep_type":"2","dep_en":"shgs","parent_id":"105","dep_desc":"上海研发中心"},{"numrow":"6","dep_type_cn":"省公司","parent_id_cn":"北京总公司","dep_id":"371","dep_cn":"福建研发中心","dep_type":"2","dep_en":"fjgs","parent_id":"105","dep_desc":"福建研发中心"},{"numrow":"7","dep_type_cn":"总公司","dep_id":"105","dep_cn":"北京总公司","dep_type":"1","dep_en":"bjgs","dep_desc":"北京总公司"}]}
        '''
        return HttpResponse(list)
    # return list
    # return render(request, 'system/smDepartment_list.html')
    # return render(request, 'system/smDepartment_list.html', {})
    pass


@csrf_exempt
def getInitValue(request):
    logger.info(request)
    value = '''{"readonlyList":[],"defaultValues":{},"comboValues":{"dep_type":[{"item_cn":"总公司","item_value":"1"},{"item_cn":"省公司","item_value":"2"},{"item_cn":"地市公司","item_value":"3"},{"item_cn":"县公司","item_value":"4"},{"item_cn":"部门","item_value":"5"}]}}'''
    return HttpResponse(value)


@csrf_exempt
def getDepNames(request):
    logger.info(request)
    names = '''[{"id":"105","text":"北京总公司","iconCls":"icon-home","children":[{"id":"371","text":"福建研发中心","iconCls":"icon-connection","parentId":"105","children":[{"id":"373","text":"福建研发部门","iconCls":"icon-group","parentId":"371","children":[{"id":"376","text":"福建运维部门2","iconCls":"icon-group","parentId":"373"}]}]},{"id":"372","text":"上海研发中心","iconCls":"icon-connection","parentId":"105"}]},{"id":"374","text":"福建交易部门","iconCls":"icon-home"},{"id":"375","text":"福建运维部门1","iconCls":"icon-home"}]
'''
    return HttpResponse(names)



