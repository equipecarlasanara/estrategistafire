import os
import re

search_terms = [
    "hotmart", "activecampaign", "webhook", "integration", "kiwify", "eduzz", 
    "monetizze", "vindi", "stripe", "member", "access", "drive", "calendar", "google"
]

project_dir = "c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main"

print("Searching codebase for integration terms...")
found_matches = []

for root, dirs, files in os.walk(project_dir):
    # Skip build/node_modules/git directories
    if any(p in root for p in [".git", "node_modules", ".wrangler", "__pycache__"]):
        continue
    for file in files:
        if file.endswith((".py", ".js", ".json", ".sql", ".md", ".toml", ".html")):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8", errors="ignore") as f:
                    content = f.read()
                
                # Check for terms
                for term in search_terms:
                    pattern = re.compile(rf"\b{term}\b", re.IGNORECASE)
                    matches = list(pattern.finditer(content))
                    if matches:
                        found_matches.append((file_path, term, len(matches)))
            except Exception as e:
                pass

# Sort and print results
for file_path, term, count in sorted(found_matches, key=lambda x: x[0]):
    rel_path = os.path.relpath(file_path, project_dir)
    print(f"File: {rel_path} | Term: '{term}' | Occurrences: {count}")
