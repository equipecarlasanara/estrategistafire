import json
import subprocess
import sys
import unicodedata

# Load matched pairs from JSON
with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/final_matched_pairs.json", "r", encoding="utf-8") as f:
    matched_pairs = json.load(f)

matched_ids = {m["db_id"]: m for m in matched_pairs}

# Fetch database users again to get all info
cmd = ["cmd", "/c", "npx", "wrangler", "d1", "execute", "andressamallinsk_ia_db", "--remote", "--json", '--command="SELECT id, email, name, is_admin, created_at FROM users;"']
res = subprocess.run(cmd, capture_output=True, cwd="c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/worker")

if res.returncode != 0:
    print("Error executing wrangler command:")
    print(res.stderr.decode("utf-8", errors="ignore"))
    sys.exit(1)

data = json.loads(res.stdout.decode("utf-8", errors="ignore"))
db_users = data[0]["results"]

print(f"Total users in DB: {len(db_users)}")

with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/db_users_classification.txt", "w", encoding="utf-8") as f:
    f.write("=== USERS TO BE DELETED (MATCHED) ===\n")
    deleted_count = 0
    for u in db_users:
        if u["id"] in matched_ids:
            m = matched_ids[u["id"]]
            f.write(f"DELETE: DB_Name='{u['name']}' (Email='{u['email']}', ID='{u['id']}')\n")
            f.write(f"        Matched with List: Name='{m['list_name']}' (Email='{m['list_email']}') via {m['match_type']}\n\n")
            deleted_count += 1
            
    f.write(f"\nTotal to delete: {deleted_count}\n\n")
    
    f.write("=== USERS TO KEEP (NO MATCH FOUND) ===\n")
    keep_count = 0
    for u in db_users:
        if u["id"] not in matched_ids:
            f.write(f"KEEP: Name='{u['name']}' (Email='{u['email']}', ID='{u['id']}', Admin={u.get('is_admin')}, Created={u.get('created_at')})\n")
            keep_count += 1
            
    f.write(f"\nTotal to keep: {keep_count}\n")

print(f"Saved classification to scratch/db_users_classification.txt")
print(f"To delete: {deleted_count}, To keep: {keep_count}")
