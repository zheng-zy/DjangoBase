#!usr/bin/env python
# coding=utf-8
import datetime
from django.db import models
from django.utils import timezone


# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    pub_date = models.DateTimeField('date published')

    def was_published_recently(self):
        now = timezone.now()
        return now - datetime.timedelta(days=1) <= self.pub_date <= now
        # return self.pub_date >= timezone.now() - datetime.timedelta(days=1)
        pass
    was_published_recently.admin_order_field = 'pub_date'
    was_published_recently.boolean = True
    # 字段重命名
    was_published_recently.short_description = 'Published recently?'

    # python 2.7
    def __unicode__(self):
        return self.question_text
        # python 3
        # __str__ == __unicode__


class Choice(models.Model):
    question = models.ForeignKey(Question)
    choice_text = models.CharField(max_length=200)
    votes = models.IntegerField(default=0)

    def __unicode__(self):
        return self.choice_text

        # __str__ == __unicode__
