import psutil
import time
import random

def get_live_metrics():

    return {

        "cpu_usage":
        psutil.cpu_percent(),

        "memory_usage":
        psutil.virtual_memory().percent,

        "disk_usage":
        psutil.disk_usage("/").percent,

        "active_agents":
        random.randint(5, 20),

        "running_workflows":
        random.randint(1, 10),

        "completed_tasks":
        random.randint(50, 500),

        "system_status":
        "operational",

        "timestamp":
        time.time()
    }