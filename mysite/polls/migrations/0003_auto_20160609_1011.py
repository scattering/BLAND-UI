# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-09 14:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0002_atom'),
    ]

    operations = [
        migrations.AlterField(
            model_name='atom',
            name='isotope',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='atom',
            name='valence',
            field=models.TextField(),
        ),
    ]