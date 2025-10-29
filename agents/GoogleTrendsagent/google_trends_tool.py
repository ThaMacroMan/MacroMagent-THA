from pytrends.request import TrendReq
from crewai.tools import tool
import time
from logging_config import get_logger

logger = get_logger(__name__)

@tool("Google Trends Data Fetcher")
def fetch_google_trends(keywords: str, timeframe: str = "today 3-m", geo: str = "") -> str:
    """
    Fetches real-time Google Trends data for specified keywords.
    Provides interest over time, interest by region, related queries, and related topics.
    
    Args:
        keywords: Comma-separated keywords (e.g., "AI, Machine Learning"). Max 5 keywords.
        timeframe: Time period (e.g., "today 3-m", "today 12-m", "all"). Default: "today 3-m"
        geo: Geographic location (e.g., "US", "GB", "" for worldwide). Default: ""
    
    Returns:
        Formatted string with comprehensive trends data
    """
    try:
        logger.info(f"Fetching Google Trends data for keywords: {keywords}")
        
        # Parse keywords
        kw_list = [kw.strip() for kw in keywords.split(',')][:5]  # Max 5 keywords
        
        # Initialize pytrends
        pytrends = TrendReq(hl='en-US', tz=360, timeout=(10, 25))
        
        # Build payload
        pytrends.build_payload(kw_list, cat=0, timeframe=timeframe, geo=geo, gprop='')
        
        result_parts = []
        result_parts.append(f"=== GOOGLE TRENDS DATA ===")
        result_parts.append(f"Keywords: {', '.join(kw_list)} | Timeframe: {timeframe} | Geo: {geo if geo else 'Worldwide'}")
        
        # Generate verification links
        geo_param = f"&geo={geo}" if geo else ""
        keywords_param = "+".join(kw_list)
        verification_url = f"https://trends.google.com/trends/explore?q={keywords_param}{geo_param}"
        result_parts.append(f"Verify: {verification_url}")
        result_parts.append("")
        
        # 1. Interest Over Time
        try:
            interest_df = pytrends.interest_over_time()
            if not interest_df.empty:
                result_parts.append("=== INTEREST OVER TIME ===")
                result_parts.append(f"Source: {verification_url}")
                result_parts.append(f"Data points: {len(interest_df)}")
                # Get comprehensive statistics
                for keyword in kw_list:
                    if keyword in interest_df.columns:
                        series = interest_df[keyword]
                        mean_val = series.mean()
                        median_val = series.median()
                        min_val = series.min()
                        max_val = series.max()
                        std_val = series.std()
                        recent_val = series.iloc[-1]
                        recent_7d_avg = series.iloc[-7:].mean()
                        trend = "↑" if recent_val > recent_7d_avg else "↓" if recent_val < recent_7d_avg else "→"
                        
                        result_parts.append(f"\n{keyword} (n={len(series)}):")
                        result_parts.append(f"  Current: {recent_val:.0f} {trend}")
                        result_parts.append(f"  Mean: {mean_val:.0f} | Median: {median_val:.0f} | StdDev: {std_val:.1f}")
                        result_parts.append(f"  Range: {min_val:.0f} - {max_val:.0f}")
                        result_parts.append(f"  7-day avg: {recent_7d_avg:.0f}")
                result_parts.append("")
        except Exception as e:
            logger.warning(f"Error fetching interest over time: {e}")
            result_parts.append(f"Interest over time data unavailable: {str(e)}")
        
        time.sleep(1)  # Rate limiting
        
        # 2. Interest by Region
        try:
            region_df = pytrends.interest_by_region(resolution='COUNTRY', inc_low_vol=False)
            if not region_df.empty:
                result_parts.append("=== TOP REGIONS BY INTEREST ===")
                result_parts.append(f"Source: {verification_url}")
                for keyword in kw_list:
                    if keyword in region_df.columns:
                        top_regions = region_df[keyword].nlargest(10)
                        if not top_regions.empty:
                            result_parts.append(f"\n{keyword} - Top 10:")
                            for i, (region, value) in enumerate(top_regions.items(), 1):
                                if value > 0:
                                    result_parts.append(f"  {i}. {region}: {value}")
                result_parts.append("")
        except Exception as e:
            logger.warning(f"Error fetching interest by region: {e}")
            result_parts.append(f"Regional data unavailable: {str(e)}")
        
        time.sleep(1)  # Rate limiting
        
        # 3. Related Queries
        try:
            related_queries = pytrends.related_queries()
            if related_queries:
                result_parts.append("=== RELATED QUERIES ===")
                result_parts.append(f"Source: {verification_url}")
                for keyword in kw_list:
                    if keyword in related_queries:
                        result_parts.append(f"\n{keyword}:")
                        
                        # Top queries
                        top_df = related_queries[keyword]['top']
                        if top_df is not None and not top_df.empty:
                            result_parts.append(f"  Top (n={len(top_df)}):")
                            for i, (_, row) in enumerate(top_df.head(10).iterrows(), 1):
                                result_parts.append(f"    {i}. {row['query']}: {row['value']}")
                        
                        # Rising queries
                        rising_df = related_queries[keyword]['rising']
                        if rising_df is not None and not rising_df.empty:
                            result_parts.append(f"  Rising (n={len(rising_df)}):")
                            for i, (_, row) in enumerate(rising_df.head(10).iterrows(), 1):
                                result_parts.append(f"    {i}. {row['query']}: +{row['value']}")
                result_parts.append("")
        except Exception as e:
            logger.warning(f"Error fetching related queries: {e}")
            result_parts.append(f"Related queries unavailable: {str(e)}")
        
        time.sleep(1)  # Rate limiting
        
        # 4. Trending Searches (if no geo specified)
        if not geo or geo == "US":
            try:
                trending_df = pytrends.trending_searches(pn='united_states')
                if not trending_df.empty:
                    result_parts.append("=== CURRENT TRENDING SEARCHES (US) ===")
                    for i, term in enumerate(trending_df[0].head(10), 1):
                        result_parts.append(f"  {i}. {term}")
                    result_parts.append("")
            except Exception as e:
                logger.warning(f"Error fetching trending searches: {e}")
        
        logger.info("Successfully fetched Google Trends data")
        return "\n".join(result_parts)
        
    except Exception as e:
        error_msg = f"Error fetching Google Trends data: {str(e)}"
        logger.error(error_msg, exc_info=True)
        return error_msg
