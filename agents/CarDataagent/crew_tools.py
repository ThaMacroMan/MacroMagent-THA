"""
CrewAI Tools for CarAPI Integration
These tools enable CrewAI agents to query vehicle data with source citations
"""
from crewai.tools import tool
from carapi_client import get_carapi_client
from logging_config import get_logger
import asyncio
import json
from datetime import datetime
from typing import Dict, Any

logger = get_logger(__name__)


@tool("Search Car Makes")
def search_car_makes(limit: int = 50) -> str:
    """
    Search for car makes (brands). Returns a list of all available car manufacturers.
    Use this when you need to find what car brands are available.
    
    Args:
        limit: Maximum number of makes to return (default: 50)
    
    Returns:
        A formatted string listing car makes with source citation
    """
    import asyncio
    timestamp = datetime.now().isoformat()
    source = "CarAPI - https://carapi.app"
    
    try:
        client = get_carapi_client()
        result = asyncio.run(client.search_makes(limit=limit))
        
        makes = result.get("data", [])
        if not makes:
            return f"No car makes found.\n\nSource: {source}\nQuery Time: {timestamp}"
        
        # Format the results with citation
        makes_list = [f"- {make.get('name', 'Unknown')}" for make in makes[:20]]
        total = result.get("collection", {}).get("total", len(makes_list))
        
        result_str = f"Found {total} car makes. First {len(makes_list)}:\n" + "\n".join(makes_list)
        if len(makes) < total:
            result_str += f"\n... and {total - len(makes)} more."
        
        # Add source citation and metadata
        result_str += f"\n\n---SOURCE CITATION---\n"
        result_str += f"Source: {source}\n"
        result_str += f"API Endpoint: GET /api/makes\n"
        result_str += f"Query Time: {timestamp}\n"
        result_str += f"Results Returned: {len(makes)} of {total}"
        
        return result_str
        
    except Exception as e:
        logger.error(f"Error in search_car_makes: {str(e)}")
        return f"Error searching for car makes: {str(e)}\n\nSource: {source}\nTimestamp: {timestamp}"


@tool("Search Car Models")
def search_car_models(make: str = None, year: int = None, limit: int = 50) -> str:
    """
    Search for car models. You can filter by make and/or year.
    Use this to find specific car models or browse all available models.
    
    Args:
        make: Filter by car make (e.g., 'Ford', 'Toyota')
        year: Filter by model year (e.g., 2020)
        limit: Maximum number of models to return (default: 50)
    
    Returns:
        A formatted string listing car models with source citation
    """
    timestamp = datetime.now().isoformat()
    source = "CarAPI - https://carapi.app"
    
    try:
        client = get_carapi_client()
        result = asyncio.run(client.search_models(make=make, year=year, limit=limit))
        
        models = result.get("data", [])
        if not models:
            return f"No car models found.\n\nSource: {source}\nQuery Time: {timestamp}"
        
        # Format the results with more detail
        results_list = []
        for model in models[:30]:
            name = model.get('name', 'Unknown')
            make_name = model.get('make', {}).get('name', 'Unknown')
            year_val = model.get('year', 'Unknown')
            results_list.append(f"- {year_val} {make_name} {name}")
        
        total = result.get("collection", {}).get("total", len(models))
        result_str = f"Found {total} models. First {len(results_list)}:\n" + "\n".join(results_list)
        
        if len(models) < total:
            result_str += f"\n... and {total - len(models)} more."
        
        # Add source citation and metadata
        result_str += f"\n\n---SOURCE CITATION---\n"
        result_str += f"Source: {source}\n"
        result_str += f"API Endpoint: GET /api/models\n"
        result_str += f"Query Parameters: make={make or 'all'}, year={year or 'all'}\n"
        result_str += f"Query Time: {timestamp}\n"
        result_str += f"Results Returned: {len(models)} of {total}"
        
        return result_str
        
    except Exception as e:
        logger.error(f"Error in search_car_models: {str(e)}")
        return f"Error searching for car models: {str(e)}\n\nSource: {source}\nTimestamp: {timestamp}"


@tool("Search Car Trims")
def search_car_trims(make: str = None, model: str = None, year: int = None, limit: int = 50) -> str:
    """
    Search for car trims (specific configurations of a model).
    Use this to find detailed information about specific car configurations including
    engine size, trim levels, drive types, etc. You can filter by make, model, and year.
    
    Args:
        make: Filter by car make
        model: Filter by car model
        year: Filter by year
        limit: Maximum number of trims to return (default: 50)
    
    Returns:
        A formatted string listing car trims with specifications and source citation
    """
    timestamp = datetime.now().isoformat()
    source = "CarAPI - https://carapi.app"
    
    try:
        client = get_carapi_client()
        result = asyncio.run(client.search_trims(make=make, model=model, year=year, limit=limit))
        
        trims = result.get("data", [])
        if not trims:
            return f"No car trims found.\n\nSource: {source}\nQuery Time: {timestamp}"
        
        # Format detailed results
        results_list = []
        for trim in trims[:20]:
            description = trim.get('description', 'N/A')
            year_val = trim.get('year', 'Unknown')
            make_name = trim.get('make', {}).get('name', 'Unknown')
            model_name = trim.get('model', {}).get('name', 'Unknown')
            
            # Get key specs if available
            engine = trim.get('engine', {})
            engine_size = engine.get('size', 'N/A') if engine else 'N/A'
            cylinders = engine.get('cylinders', 'N/A') if engine else 'N/A'
            
            results_list.append(
                f"- {year_val} {make_name} {model_name} {description} "
                f"(Engine: {engine_size}L, {cylinders} cyl)"
            )
        
        total = result.get("collection", {}).get("total", len(trims))
        result_str = f"Found {total} trims. First {len(results_list)}:\n" + "\n".join(results_list)
        
        if len(trims) < total:
            result_str += f"\n... and {total - len(trims)} more."
        
        # Add source citation and metadata
        result_str += f"\n\n---SOURCE CITATION---\n"
        result_str += f"Source: {source}\n"
        result_str += f"API Endpoint: GET /api/trims\n"
        result_str += f"Query Parameters: make={make or 'all'}, model={model or 'all'}, year={year or 'all'}\n"
        result_str += f"Query Time: {timestamp}\n"
        result_str += f"Results Returned: {len(trims)} of {total}"
        
        return result_str
        
    except Exception as e:
        logger.error(f"Error in search_car_trims: {str(e)}")
        return f"Error searching for car trims: {str(e)}\n\nSource: {source}\nTimestamp: {timestamp}"


@tool("Search Car Engines")
def search_car_engines(make: str = None, model: str = None) -> str:
    """
    Search for engine specifications.
    Use this to find detailed engine information including engine size, cylinders,
    fuel type, horsepower, etc. You can filter by make and model.
    
    Args:
        make: Filter by car make
        model: Filter by car model
    
    Returns:
        A formatted string listing engine specifications with source citation
    """
    timestamp = datetime.now().isoformat()
    source = "CarAPI - https://carapi.app"
    
    try:
        client = get_carapi_client()
        result = asyncio.run(client.get_engines(make=make, model=model))
        
        engines = result.get("data", [])
        if not engines:
            return f"No engine information found.\n\nSource: {source}\nQuery Time: {timestamp}"
        
        # Format detailed engine specs
        results_list = []
        for engine in engines[:30]:
            size = engine.get('size', 'N/A')
            cylinders = engine.get('cylinders', 'N/A')
            fuel_type = engine.get('fuel_type', 'N/A')
            hp = engine.get('horsepower_hp', 'N/A')
            rpm = engine.get('horsepower_rpm', 'N/A')
            
            results_list.append(
                f"- {size}L, {cylinders} cyl, {fuel_type}, "
                f"{hp}hp @ {rpm}rpm"
            )
        
        result_str = "Engine specifications:\n" + "\n".join(results_list)
        
        # Add source citation and metadata
        result_str += f"\n\n---SOURCE CITATION---\n"
        result_str += f"Source: {source}\n"
        result_str += f"API Endpoint: GET /api/engines\n"
        result_str += f"Query Parameters: make={make or 'all'}, model={model or 'all'}\n"
        result_str += f"Query Time: {timestamp}\n"
        result_str += f"Results Returned: {len(engines)}"
        
        return result_str
        
    except Exception as e:
        logger.error(f"Error in search_car_engines: {str(e)}")
        return f"Error searching for engines: {str(e)}\n\nSource: {source}\nTimestamp: {timestamp}"
