from crewai import Agent, Crew, Task
from crewai import LLM
from logging_config import get_logger

class ResearchCrew:
    def __init__(self, verbose=True, logger=None, model=None, temperature=None):
        self.verbose = verbose
        self.logger = logger or get_logger(__name__)
        # Configure LLM - support custom model and temperature, default to gpt-5-nano
        if model:
            llm_params = {"model": model}
            if temperature is not None:
                llm_params["temperature"] = temperature
            self.llm = LLM(**llm_params)
        else:
            self.llm = LLM(model="gpt-5-nano")
        self.crew = self.create_crew()
        self.logger.info("ResearchCrew initialized")

    def create_crew(self):
        self.logger.info("Creating research crew with agents")
        
        researcher = Agent(
            role='Research Analyst',
            goal='Find and analyze key information',
            backstory='Expert at extracting information',
            llm=self.llm,
            verbose=self.verbose
        )

        writer = Agent(
            role='Content Summarizer',
            goal='Create clear summaries from research',
            backstory='Skilled at transforming complex information',
            verbose=self.verbose
        )

        self.logger.info("Created research and writer agents")

        crew = Crew(
            agents=[researcher, writer],
            tasks=[
                Task(
                    description='Research: {text}',
                    expected_output='Detailed research findings about the topic',
                    agent=researcher
                ),
                Task(
                    description='Write summary',
                    expected_output='Clear and concise summary of the research findings',
                    agent=writer
                )
            ]
        )
        self.logger.info("Crew setup completed")
        return crew