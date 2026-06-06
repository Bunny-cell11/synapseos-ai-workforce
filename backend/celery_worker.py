from celery import Celery
import time
import random

celery = Celery(
    "synapseos",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/0"
)

@celery.task
def execute_agent_task(task_name):

    print(f"Starting task: {task_name}")

    time.sleep(5)

    result = {

        "task": task_name,

        "status": "completed",

        "execution_time":
        random.randint(1, 10),

        "agent":
        "AI Workforce Agent"

    }

    print(result)

    return result


@celery.task
def execute_workflow(workflow_tasks):

    completed_tasks = []

    for task in workflow_tasks:

        result = execute_agent_task(task)

        completed_tasks.append(result)

    return completed_tasks