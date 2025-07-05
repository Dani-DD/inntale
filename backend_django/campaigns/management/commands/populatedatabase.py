"""
in that file, to create the custom command extend the BaseCommand class (from django.core.management.base import BaseCommand) and override:
(optional) the help attribute to provide a description string that explain the purpose of the command.
the handle method, that is the responsable for executing the code that you want to implement for your command.

"""

from pathlib import Path
from django.core.management.base import BaseCommand
from django.db import connection
import os
from decouple import config

USING_CLOUDINARY = config("USING_CLOUDINARY")


class Command(BaseCommand):
    help = "Populate the database with some default data"

    def handle(self, *args, **options):
        print("Populating the database...")

        if USING_CLOUDINARY:
            sql_file_name = "populate-database-cloudinary.sql"
            print("Using Cloudinary for serving Media file.")
        else:
            sql_file_name = "populate-database-project.sql"

        # Get the path of the .sql file
        sql_file_path = os.path.join(os.path.dirname(__file__), sql_file_name)
        # Read the content of that file
        sql_file_content = Path(sql_file_path).read_text()

        with connection.cursor() as cursor:
            # Execute its content
            cursor.execute(sql_file_content)
