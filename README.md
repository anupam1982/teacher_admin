# Welcome to Teacher Admin App
# An application for managing teacher student portfolios

# Steps to run the application in the dev environment.

1. Clone the repository with the following command.

    https://github.com/anupam1982/teacher_admin.git

2. Navigate to the directory and execute the following:
    2.1 cp teacher_admin/deploy/env/dev/dotenv .env
    2.2 docker-compose build
    2.3 docker-compose up (Give -d option if you want to run it in background)
    2.4 The application should run in the localhost

3. Type "http://localhost:3000" in the browser to check if the application is running or not.

4. Following are the sample curl requests for the APIs
   
    # To Register

    curl --request POST \
    --url http://localhost:3000/api/register \
    --header 'content-type: application/json' \
    --data '{
    "teacher": "abcd@gmail.com",
    "students":
        [
        "abc@gmail.com"
        ]
    }
    '

    # To get CommonStudents

    curl --request GET \
    --url 'http://localhost:3000/api/commonstudents?teacher=patrick%40gmail.com&teacher=dicky%40gmail.com' \
    --header 'content-type: application/json' \ '

    #To Suspend a student

    curl --request POST \
    --url http://localhost:3000/api/suspend \
    --header 'content-type: application/json' \
    --cookie _plan_selector_key=SFMyNTY.g3QAAAACbQAAAAtfY3NyZl90b2tlbm0AAAAYMjRMUU9Dem13dmlWQjFWYV8wTzdQZUsybQAAAANzaWRtAAAAAzEyMw._QzZmI7orZ_I0RB5NLPzNXG_0elv24wDuD5gSPb7HFM \
    --data '{
    "student": "abc@gmail.com"
    }
    '

    # To Retrieve Notification List

    curl --request POST \
    --url http://localhost:3000/api/retrievefornotifications \
    --header 'content-type: application/json' \
    --cookie _plan_selector_key=SFMyNTY.g3QAAAACbQAAAAtfY3NyZl90b2tlbm0AAAAYMjRMUU9Dem13dmlWQjFWYV8wTzdQZUsybQAAAANzaWRtAAAAAzEyMw._QzZmI7orZ_I0RB5NLPzNXG_0elv24wDuD5gSPb7HFM \
    --data '{
    "teacher":  "robert@gmail.com",
        "notification": "Hello students! @studentagnes@gmail.com @studentmiche@gmail.com"
    }'


 5. To run the basic unit tests

    Run the following from terminal with the application running
    npm test


