from django.contrib import admin

from .models import Question, Choice, Atom

class ChoiceInline(admin.TabularInline):
    model = Choice
    extra = 3

class QuestionAdmin(admin.ModelAdmin):
    fieldsets = [
        (None,               {'fields': ['question_text']}),
        ('Date information', {'fields': ['pub_date'], 'classes': ['collapse']}),
    ]
    inlines = [ChoiceInline]
    list_display = ('question_text', 'pub_date', 'was_published_recently')
    list_filter = ['pub_date']
    search_fields = ['question_text']

class AtomAdmin(admin.ModelAdmin):
    fields = ['label', 'atom', 'valence', 'isotope', 'wyckoff', 'x', 'y', 'z', 'occupancy', 'thermal']

admin.site.register(Question, QuestionAdmin)
admin.site.register(Atom, AtomAdmin)