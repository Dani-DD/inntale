#!/bin/bash

# Apply database migrations
echo "Applying database migrations..."
python manage.py migrate

# Check environment and start the correct server
if [ "$ENVIRONMENT" = "development" ]; then
    echo "Running in development mode..."
    python manage.py runserver 0.0.0.0:8000
else
    echo "Collecting static files..."
    python manage.py collectstatic --noinput
    
    echo "Running in production mode with Gunicorn..."
    gunicorn inntale.wsgi:application \
        --bind 0.0.0.0:8000 \
        --timeout 120 \
        --workers 3 \
        --log-level debug \
        --access-logfile - \
        --error-logfile -

fi
