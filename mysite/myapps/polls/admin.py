#!usr/bin/env python
# coding=utf-8
from django.contrib import admin

# Register your models here.
from models import Question, Choice


# class ChoiceInline(admin.StackedInline):
class ChoiceInline(admin.TabularInline):  # 显示成紧凑的、基于表格的形式
    model = Choice
    extra = 3


class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date']}),
        # 任意为每个字段集指定HTML样式类。
        # ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']  # 添加过滤条件
    search_fields = ['question_text']  # 添加搜索条件，后台数据库实现用like


admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice)  # 第一种
