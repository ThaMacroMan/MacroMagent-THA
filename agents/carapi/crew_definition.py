from crewai import Agent, Crew, Task
from crewai import LLM
from logging_config import get_logger
from crew_tools import (
    search_car_makes,
    search_car_models,
    search_car_trims,
    search_car_engines
)

class ResearchCrew:
    def __init__(self, verbose=True, logger=None):
        self.verbose = verbose
        self.logger = logger or get_logger(__name__)
        # Configure LLM to use gpt-5-mini
        self.llm = LLM(model="gpt-5-nano")
        self.crew = self.create_crew()
        self.logger.info("ResearchCrew initialized")

    def create_crew(self):
        self.logger.info("Creating research crew with agents")
        
        # Create a specialized car research agent
        car_researcher = Agent(
            role='Car Research Specialist',
            goal='Find and analyze detailed vehicle information including makes, models, trims, and specifications. Always cite your sources and include verification metadata.',
            backstory=(
                'Expert automotive researcher with deep knowledge of vehicle databases. '
                'You specialize in finding accurate car information, comparing specifications, '
                'and helping users understand vehicle options. You have access to comprehensive '
                'car databases via CarAPI and can find specific details about any vehicle. '
                'You are meticulous about citing sources and providing clear verification details '
                'so users can trust and verify your findings.'
            ),
            llm=self.llm,
            verbose=self.verbose,
            tools=[search_car_makes, search_car_models, search_car_trims, search_car_engines],
            allow_delegation=False,
            max_iter=3
        )
        
        # General research agent for non-car topics
        researcher = Agent(
            role='Research Analyst',
            goal='Find and analyze key information with proper source attribution',
            backstory=(
                'Expert at extracting information from multiple sources. '
                'You always cite where information comes from and provide context '
                'for verification.'
            ),
            llm=self.llm,
            verbose=self.verbose
        )

        writer = Agent(
            role='Content Summarizer with Source Attribution',
            goal='Create clear, well-cited summaries from research that include all sources and verification details',
            backstory=(
                'Skilled at transforming complex information into digestible summaries. '
                'You always preserve source citations, timestamps, and verification metadata '
                'in your summaries so readers can trace and verify the information. '
                'You structure output clearly with sections for data, sources, and metadata.'
            ),
            llm=self.llm,
            verbose=self.verbose,
            max_iter=3
        )

        self.logger.info("Created research and writer agents with car research capabilities")

        crew = Crew(
            agents=[car_researcher, researcher, writer],
            tasks=[
                Task(
                    description=(
                        'Research the following topic: {text}. '
                        'Use your car research tools to find detailed information about any vehicles mentioned. '
                        'If this is about cars, use CarAPI tools to find specifications, trims, makes, and models. '
                        'If not about cars, conduct general research. '
                        'IMPORTANT: When using tools, preserve all source citations, timestamps, and API metadata in your output.'
                    ),
                    expected_output=(
                        'Comprehensive research findings with detailed vehicle information when applicable. '
                        'MUST include: 1) The data/findings, 2) Source citations with full API endpoint details, '
                        '3) Timestamps of queries, 4) Result counts, 5) Query parameters used. '
                        'Structure your findings clearly so they can be verified.'
                    ),
                    agent=car_researcher
                ),
                Task(
                    description=(
                        'Review and supplement the research with additional information if needed. '
                        'Ensure any additional data includes source attribution.'
                    ),
                    expected_output=(
                        'Additional context and analysis to support the findings. '
                        'If adding new information, include source citations.'
                    ),
                    agent=researcher
                ),
                Task(
                    description=(
                        'Write a clear and comprehensive summary of all research findings. '
                        'CRITICAL: Preserve ALL source citations, timestamps, API endpoints, '
                        'and verification metadata from the research phase. '
                        'Structure your output as: '
                        '1) Executive Summary (key findings), '
                        '2) Detailed Findings (all data with context), '
                        '3) Sources & Verification (complete source citations with API endpoints and timestamps).'
                    ),
                    expected_output=(
                        'A well-structured summary that includes: '
                        '1) Executive summary of key findings, '
                        '2) Detailed findings with full context, '
                        '3) Complete source citations with API endpoints, timestamps, and query parameters. '
                        'Output must be verifiable and traceable to original sources.'
                    ),
                    agent=writer
                )
            ]
        )
        self.logger.info("Crew setup completed")
        return crew