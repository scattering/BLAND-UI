# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-08 17:44
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('polls', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Atom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=100)),
                ('atom', models.CharField(max_length=20)),
                ('valence', models.IntegerField()),
                ('isotope', models.IntegerField()),
                ('wyckoff', models.CharField(max_length=20)),
                ('x', models.DecimalField(decimal_places=2, max_digits=10)),
                ('y', models.DecimalField(decimal_places=2, max_digits=10)),
                ('z', models.DecimalField(decimal_places=2, max_digits=10)),
                ('occupancy', models.DecimalField(decimal_places=2, max_digits=3)),
                ('thermal', models.CharField(max_length=11)),
            ],
        ),
    ]