import urllib.request
import re
from urllib.parse import urljoin, urlparse

visited = set()
to_visit = {'http://localhost:3000/'}
results = {}

while to_visit:
    url = to_visit.pop()
    visited.add(url)
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, timeout=5)
        code = res.getcode()
        results[url] = code
        html = res.read().decode('utf-8', errors='ignore')
        hrefs = re.findall(r'href=["\']([^"\'#]+)["\']', html)
        for h in hrefs:
            joined = urljoin(url, h)
            p = urlparse(joined)
            if p.netloc in ('localhost:3000', '127.0.0.1:3000') and joined not in visited and joined not in to_visit:
                if not p.path.startswith('/admin'):
                    to_visit.add(joined)
    except urllib.error.HTTPError as e:
        results[url] = e.code
    except Exception as e:
        results[url] = str(e)

print(f"Crawl completed: {len(results)} pages")
for u, c in sorted(results.items()):
    print(f"{c} : {u}")

