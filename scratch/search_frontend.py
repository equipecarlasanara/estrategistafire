import os

frontend_src = "c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/frontend/src"

print("Searching frontend src directory...")
for root, dirs, files in os.walk(frontend_src):
    for file in files:
        if file.endswith((".js", ".jsx", ".ts", ".tsx", ".html")):
            file_path = os.path.join(root, file)
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                
                # Check for login, credential, mock, auth
                for kw in ["mock", "login", "password", "auth", "bypass", "localStorage"]:
                    if kw in content:
                        print(f"File: {os.path.relpath(file_path, frontend_src)} | contains '{kw}'")
            except Exception:
                pass
