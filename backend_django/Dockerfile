# INSTALLING PYTHON
FROM python:3.12
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# INSTALLING PIPENV
RUN pip install --upgrade pip
RUN pip install pipenv

# INSTALLING PROJECT DEPENDENCIES
WORKDIR /app
COPY Pipfile Pipfile.lock /app/
RUN pipenv install --system --dev

# APPLYING PERMISSION TO RUN WAIT-FOR-IT.SH AND DOCKER-ENTRYPOINT.SH
COPY wait-for-it.sh /usr/local/bin/
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# COPY ALL THE OTHER PROJECT FILES INTO THE IMAGE'S WORKING DIRECTORY
COPY . /app/

# RUN THE SERVER
EXPOSE 8000