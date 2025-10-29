"""
CarAPI Client for authentication and API interactions
Handles JWT token management and makes authenticated requests to CarAPI
"""
import os
import httpx
import time
from typing import Optional, Dict, Any
from logging_config import get_logger

logger = get_logger(__name__)


class CarAPIClient:
    """Client for interacting with CarAPI with JWT token management"""
    
    BASE_URL = "https://carapi.app"
    
    def __init__(self):
        self.api_token = os.getenv("CAR_API_TOKEN")
        self.api_secret = os.getenv("CAR_API_SECRET")
        self.jwt_token: Optional[str] = None
        self.token_expires_at: Optional[int] = None
        self.logger = logger
        
        if not self.api_token or not self.api_secret:
            self.logger.warning("CarAPI credentials not found in environment")
    
    async def get_jwt_token(self) -> str:
        """Get a valid JWT token, using cached token if available and not expired"""
        # Check if we have a valid token
        if self.jwt_token and self.token_expires_at:
            # Add 60 second buffer to account for clock drift
            if time.time() < (self.token_expires_at - 60):
                self.logger.debug("Using cached JWT token")
                return self.jwt_token
        
        # Request a new token
        self.logger.info("Requesting new JWT token from CarAPI")
        
        if not self.api_token or not self.api_secret:
            raise ValueError("CarAPI credentials not configured")
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    f"{self.BASE_URL}/api/auth/login",
                    headers={"accept": "application/json", "Content-Type": "application/json"},
                    json={
                        "api_token": self.api_token,
                        "api_secret": self.api_secret
                    },
                    timeout=10.0
                )
                response.raise_for_status()
                
                # Check if response is JSON or plain text token
                if response.headers.get("content-type", "").startswith("application/json"):
                    token_data = response.json()
                    self.jwt_token = token_data.get("token")
                    if not self.jwt_token:
                        raise ValueError("No token in response")
                else:
                    # Response is the token itself (plain text or JWT string)
                    self.jwt_token = response.text.strip().strip('"')
                    if not self.jwt_token:
                        raise ValueError("No token in response")
                
                # Decode JWT to get expiration (we only decode the payload)
                # The token is base64 encoded JSON in format: header.payload.signature
                import base64
                payload = self.jwt_token.split(".")[1]
                decoded = base64.urlsafe_b64decode(payload + "==")  # Add padding
                decoded_str = decoded.decode('utf-8')
                import json
                payload_data = json.loads(decoded_str)
                
                self.token_expires_at = payload_data.get("exp")
                self.logger.info(f"Successfully obtained JWT token, expires at {self.token_expires_at}")
                
                return self.jwt_token
                
            except Exception as e:
                self.logger.error(f"Failed to get JWT token: {str(e)}")
                raise
    
    async def request(self, method: str, endpoint: str, params: Optional[Dict] = None, **kwargs) -> Dict[str, Any]:
        """
        Make an authenticated request to CarAPI
        
        Args:
            method: HTTP method (GET, POST, etc.)
            endpoint: API endpoint (e.g., '/api/models')
            params: Query parameters
            **kwargs: Additional arguments to pass to httpx
            
        Returns:
            Dict containing the API response
        """
        # Get a valid JWT token
        token = await self.get_jwt_token()
        
        # Prepare headers
        headers = kwargs.pop("headers", {})
        headers.update({
            "accept": "application/json",
            "Authorization": f"Bearer {token}"
        })
        
        # Make the request
        url = f"{self.BASE_URL}{endpoint}"
        async with httpx.AsyncClient() as client:
            try:
                response = await client.request(
                    method,
                    url,
                    headers=headers,
                    params=params,
                    timeout=30.0,
                    **kwargs
                )
                response.raise_for_status()
                
                # Check if response has content before parsing JSON
                if response.content:
                    return response.json()
                else:
                    self.logger.warning(f"Empty response from CarAPI endpoint: {url}")
                    return {"data": [], "collection": {"total": 0}}
            except httpx.HTTPError as e:
                self.logger.error(f"HTTP error in CarAPI request: {str(e)}")
                raise
            except Exception as e:
                self.logger.error(f"Error parsing CarAPI response: {str(e)}")
                # Return empty structure instead of raising to prevent agent loops
                return {"data": [], "collection": {"total": 0}}
    
    async def search_models(self, make: Optional[str] = None, year: Optional[int] = None, 
                           limit: int = 100, page: int = 1) -> Dict[str, Any]:
        """Search for car models"""
        params = {"page": page, "limit": limit}
        if make:
            params["make"] = make
        if year:
            params["year"] = year
        
        return await self.request("GET", "/api/models", params=params)
    
    async def search_makes(self, limit: int = 100) -> Dict[str, Any]:
        """Get all car makes"""
        return await self.request("GET", "/api/makes", params={"limit": limit})
    
    async def search_trims(self, make: Optional[str] = None, model: Optional[str] = None,
                          year: Optional[int] = None, limit: int = 100) -> Dict[str, Any]:
        """Search for specific car trims"""
        params = {"limit": limit}
        if make:
            params["make"] = make
        if model:
            params["model"] = model
        if year:
            params["year"] = year
        
        return await self.request("GET", "/api/trims", params=params)
    
    async def get_engines(self, make: Optional[str] = None, model: Optional[str] = None) -> Dict[str, Any]:
        """Get engine information"""
        params = {}
        if make:
            params["make"] = make
        if model:
            params["model"] = model
        
        return await self.request("GET", "/api/engines", params=params)


# Global client instance
_client_instance: Optional[CarAPIClient] = None


def get_carapi_client() -> CarAPIClient:
    """Get or create the global CarAPI client instance"""
    global _client_instance
    if _client_instance is None:
        _client_instance = CarAPIClient()
    return _client_instance

