import re

with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/backend/server.py", "r", encoding="utf-8") as f:
    content = f.read()

# Let's find routes related to authentication/login
login_matches = [m.start() for m in re.finditer(r"login|auth|validate", content, re.IGNORECASE)]
print(f"Found {len(login_matches)} matches for login/auth/validate in server.py")

# Print some surrounding lines for matches of login or auth endpoints
lines = content.split('\n')
for idx, line in enumerate(lines):
    if "def login" in line or "@app.post" in line or "/login" in line or "/auth" in line:
        print(f"Line {idx+1}: {line}")
        # Print next 10 lines
        for j in range(idx+1, min(idx+15, len(lines))):
            print(f"  {j+1}: {lines[j]}")
        print("-" * 50)
