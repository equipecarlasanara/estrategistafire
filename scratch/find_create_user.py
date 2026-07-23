import re

with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/backend/server.py", "r", encoding="utf-8") as f:
    content = f.read()

# Let's search for users insertions
lines = content.split('\n')
for idx, line in enumerate(lines):
    if "db.users" in line:
        print(f"Line {idx+1}: {line.strip()}")
        # print next 3 lines
        for j in range(idx+1, min(idx+5, len(lines))):
            print(f"  {j+1}: {lines[j].strip()}")
        print("-" * 50)
