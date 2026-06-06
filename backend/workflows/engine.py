import time

def execute_workflow(tasks):

    completed = []

    for task in tasks:

        task["status"] = "running"

        time.sleep(2)

        task["status"] = "completed"

        completed.append(task)

    return completed
