### Filtering url


This is a simple api server that filters urls based on the following criteria:
- The url must be a reachable
- The url must be match priority

The return url must be sorted by priority with 1 as highest.

Sample:
```json
{
    "urls": [
        {
            "url": "https://www.google.com",
            "priority": 1
        },
        {
            "url": "https://www.facebook.com",
            "priority": 2
        }
    ]
}
```
