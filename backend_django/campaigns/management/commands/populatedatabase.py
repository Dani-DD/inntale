"""
in that file, to create the custom command extend the BaseCommand class (from django.core.management.base import BaseCommand) and override:
(optional) the help attribute to provide a description string that explain the purpose of the command.
the handle method, that is the responsable for executing the code that you want to implement for your command.

"""

from pathlib import Path
from django.core.management.base import BaseCommand
from django.db import connection
import os


class Command(BaseCommand):
    help = "Populate the database with some default data"

    def handle(self, *args, **options):
        print("Populating the database...")
        sql_file_path = os.path.join(os.path.dirname(__file__), "populate-database.sql")
        sql_file_content = Path(sql_file_path).read_text()

        with connection.cursor() as cursor:
            cursor.execute(sql_file_content)
