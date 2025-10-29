"""
Standalone test script for the Research Crew with CarAPI integration
Run this to test the agent without the payment system

Usage:
    # Run with default test query (Ford F-150):
    python test_agent.py
    
    # Run with a custom car query:
    python test_agent.py "Find all 2020 Tesla models"
    
    # Run with a general research query:
    python test_agent.py "The impact of AI on automotive industry"

Example Queries:
    - Car-specific (uses CarAPI):
      * "Find all 2020 Ford F-150 trims"
      * "Compare Toyota Camry vs Honda Accord for 2023"
      * "What engines are available for 2020 Porsche 911?"
      * "Show me all Tesla models"
    
    - General research:
      * "The history of electric vehicles"
      * "Latest trends in autonomous driving"

Note: Make sure your .env file has OPENAI_API_KEY configured
"""
import sys
import os
from dotenv import load_dotenv
from crew_definition import ResearchCrew
from logging_config import setup_logging

# Configure logging
logger = setup_logging()

# Load environment variables
load_dotenv(override=True)

def test_agent(query: str = None):
    """Test the Research Crew with a given query"""
    
    # Default test queries - uncomment to test different scenarios
    if query is None:
        test_queries = [
            # Car-related query (will use CarAPI tools)
            "Find all 2020 Ford F-150 trims and their engine specifications",
            
            # Alternative test queries (uncomment to try):
            # "Compare the Toyota Camry and Honda Accord for 2023",
            # "What are all the available Ford models for 2020?",
            # "Find all electric vehicles from Tesla",
            # "Show me engine specs for 2020 Porsche models",
        ]
        query = test_queries[0]
    
    print("=" * 80)
    print("CREWAI AGENT TEST - CarAPI Integration")
    print("=" * 80)
    print(f"\n📝 Query: {query}")
    print("\n🤖 Initializing Research Crew...")
    
    try:
        # Initialize the crew
        crew = ResearchCrew(verbose=True, logger=logger)
        
        # Run the crew with the test query
        print("\n🚀 Starting crew execution...")
        result = crew.crew.kickoff({"text": query})
        
        print("\n" + "=" * 80)
        print("RESULT")
        print("=" * 80)
        
        # Display the result
        if hasattr(result, 'raw'):
            print(result.raw)
        else:
            print(str(result))
        
        print("\n" + "=" * 80)
        print("✅ Test completed successfully!")
        print("=" * 80)
        
    except Exception as e:
        print(f"\n❌ Error during execution: {str(e)}")
        logger.error(f"Error in test: {str(e)}", exc_info=True)
        raise


def main():
    """Main entry point"""
    
    # Check for command line argument
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        print(f"Using custom query from command line: {query}\n")
        test_agent(query)
    else:
        # Run with default test query
        test_agent()


if __name__ == "__main__":
    main()

