class WorkflowEngine:

    def __init__(self):

        self.tasks = []

    def add_task(
        self,
        task_name
    ):

        self.tasks.append({

            "task": task_name,

            "status": "Pending"

        })

    def execute(self):

        for task in self.tasks:

            task["status"] = "Completed"

        return self.tasks
