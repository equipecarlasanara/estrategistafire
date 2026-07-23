import asyncio
import os
import sys
from pathlib import Path

# Add backend directory to path
sys.path.append(str(Path(__file__).parent.parent / "backend"))

from dotenv import load_dotenv
load_dotenv(Path(__file__).parent.parent / "backend" / ".env")

from d1_client import D1Client

async def main():
    client = D1Client()
    print("Connecting to D1 database and listing users...")
    try:
        users = await client.find_many("users", limit=1000)
        print(f"Total users found in DB: {len(users)}")
        for idx, u in enumerate(users):
            print(f"{idx+1:03d}: ID={u.get('id')}, Email={u.get('email')}, Name={u.get('name')}")
    except Exception as e:
        print(f"Error querying users: {e}")

if __name__ == "__main__":
    asyncio.run(main())
