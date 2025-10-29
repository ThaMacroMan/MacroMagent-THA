from crewai import Agent, Crew, Task
from crewai import LLM
from logging_config import get_logger
from google_trends_tool import fetch_google_trends

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
            role='Data Extraction Specialist',
            goal='Extract quantitative data and facts with minimal commentary',
            backstory=(
                'You are a data extraction specialist. You focus exclusively on presenting '
                'raw data points, metrics, and factual findings. You avoid verbose explanations. '
                'When using Google Trends, you present the actual numbers, rankings, and percentages '
                'without lengthy interpretations. Your output is dense with data and sparse with words. '
                'You always include source links and verification URLs when available.'
            ),
            tools=[fetch_google_trends],
            llm=self.llm,
            verbose=self.verbose
        )

        writer = Agent(
            role='Data Formatter',
            goal='Create well-structured reports with tables, brief context, and conclusions',
            backstory=(
                'You are a data formatter specializing in presenting information in clear, structured reports. '
                'You convert raw research into markdown tables for readability. Use tables for: '
                '- Interest over time comparisons, - Regional rankings, - Related queries. '
                'Before presenting data, provide 1-2 brief sentences explaining what the data shows. '
                'After the tables, include a short conclusion (2-3 sentences) summarizing key insights. '
                'Keep commentary minimal but informative. Always cite sources.'
            ),
            verbose=self.verbose
        )

        self.logger.info("Created data-focused agents")

        crew = Crew(
            agents=[researcher, writer],
            tasks=[
                Task(
                    description='Research: {text}',
                    expected_output='Raw data points, metrics, rankings, and statistics with source links',
                    agent=researcher
                ),
                Task(
                    description='Format the data into markdown tables with brief context and a short conclusion',
                    expected_output='A report with: 1) Brief intro (1-2 sentences), 2) Markdown tables for all data sections, 3) Short conclusion (2-3 sentences) summarizing insights. Include source URLs.',
                    agent=writer
                )
            ]
        )
        self.logger.info("Crew setup completed")
        return crew