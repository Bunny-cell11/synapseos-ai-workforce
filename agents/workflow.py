from planner_agent import PlannerAgent
from research_agent import ResearchAgent
from developer_agent import DeveloperAgent
from qa_agent import QAAgent
from security_agent import SecurityAgent
from manager_agent import ManagerAgent

def run_workflow(goal):

    planner = PlannerAgent()
    tasks = planner.execute(goal)

    researcher = ResearchAgent()
    research = researcher.execute(goal)

    developer = DeveloperAgent()
    code = developer.execute(goal)

    qa = QAAgent()
    testing = qa.execute(code)

    security = SecurityAgent()
    security_result = security.execute(goal)

    manager = ManagerAgent()
    summary = manager.summarize()

    return {
        "tasks": tasks,
        "research": research,
        "code": code,
        "testing": testing,
        "security": security_result,
        "summary": summary
    }
