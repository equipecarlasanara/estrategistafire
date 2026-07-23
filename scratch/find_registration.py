with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/backend/server.py", "r", encoding="utf-8") as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if "def create_user" in line or "register" in line or "@api_router.post" in line or "insert_one" in line:
        print(f"Line {idx+1}: {line.strip()}")
        # print next 5 lines
        for j in range(idx+1, min(idx+6, len(lines))):
            print(f"  {j+1}: {lines[j].strip()}")
        print("-" * 50)
