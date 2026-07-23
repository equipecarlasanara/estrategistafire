import json
import subprocess
import sys

# List of emails to revoke access from
emails_to_revoke = [
    "adrioriginalle@hotmail.com",
    "alerechdesigner@icloud.com",
    "amandabordin15@gmail.com",
    "amandascherer.comex@gmail.com",
    "amandadias.psicopp@gmail.com",
    "flaviapereiramv@gmail.com",
    "anabortolon@hotmail.com",
    "anamorschbachers@gmail.com",
    "anandamirailh@gmail.com",
    "dekagmonteiro@gmail.com",
    "andressaedener@gmail.com",
    "andressa.mhenne@gmail.com",
    "lotus.mk@hotmail.com",
    "andrezamadeiratrindade@gmail.com",
    "angel.raquel13@gmail.com",
    "ariely.lamb@hotmail.com",
    "babiteixeirak@gmail.com",
    "biaaudicamara@gmail.com",
    "Brunadaniela.sf@gmail.com",
    "carinterapeuta@gmail.com",
    "carinaflores5@yahoo.com.br",
    "carlarobertaimoveis@gmail.com",
    "maepragmatica@gmail.com",
    "cilene.augusta@icloud.com",
    "cristianeoliveirasoares@hotmail.com",
    "crys.seja@gmail.com",
    "dra_daiana@outlook.com",
    "daianemagic.1g@gmail.com",
    "danielemarques82@gmail.com",
    "danielevicente.09@outlook.com",
    "mariaalicekanitz@outlook.com",
    "assafraodebora@gmail.com",
    "deborasipe@gmail.com",
    "deglianebernardes00@gmail.com",
    "moraes.melo.deise@gmail.com",
    "deise_wd@hotmail.com",
    "deisetdutra@gmail.com",
    "dhiully.amaral@hotmail.com",
    "studiodieniffersas1@gmail.com",
    "dudda.dsgn@gmail.com",
    "biancabmuller@gmail.com",
    "eliana.iohann@icloud.com",
    "eleriag@gmail.com",
    "pessel.fs@gmail.com",
    "flaviasouzaunip@gmail.com",
    "gabfonseca132@gmail.com",
    "gabrielalazzaretti361@gmail.com",
    "gabriellepereirasantos5@gmail.com",
    "gio.rizzon@gmail.com",
    "grazielebaatista@yahoo.com.br",
    "greicy.ink@gmail.com",
    "helen_rafaela2012@hotmail.com",
    "Inairacecilia@gmail.com",
    "isabelcsfreitas@gmail.com",
    "isabelle.justo@eaportal.org",
    "jmnpinheiro34@gmail.com",
    "janinebrasilaor@gmail.com",
    "jenienadia@hotmail.com",
    "fisio.jecantini@gmail.com",
    "jobidoces@gmail.com",
    "joicedutra0@gmail.com",
    "josy.maria.silva@hotmail.com",
    "juci@agelsci.com.br",
    "Jhully-ana@oulook.com",
    "jucabreira7@gmail.com",
    "Karinakhigino79@yahoo.com.br",
    "karine.caroline.sol@icloud.com",
    "kemberli.lopes@gmail.com",
    "laianabrito2020@gmail.com",
    "larissadefavery2@hotmail.com",
    "laridias.s@gmail.com",
    "larissatonheca@hotmail.com",
    "pratesleyla@gmail.com",
    "lithy_dgv@hotmail.com",
    "anaaluh22@gmail.com",
    "luciana.formazini@gmail.com",
    "luciane.carine@gmail.com",
    "marianaoliveiradossantos149@gmail.com",
    "mentora.martin.moreira@gmail.com",
    "bolzemelyna@gmail.com",
    "andesmichele27@gmail.com",
    "michellihermes@gmail.com",
    "mikaelakoechefotografa2@gmail.com",
    "oliveirapimentelmirian@gmail.com",
    "naiaradarolt@yahoo.com",
    "nataliacassino@gmail.com",
    "contadora.natasha@gmail.com",
    "nathakiaspereira91@gmail.com",
    "marketingexpressacessoria@gmail.com",
    "nicole.hohgtaefe@gmail.com",
    "divinapolly@gmail.com",
    "barbosarapha.98@gmail.com",
    "rawanyemanuelli@yahoo.com.br",
    "lengruberheart@gmail.com",
    "rerafaellischuerne@gmail.com",
    "renata_karam@hotmail.com",
    "richele_ag@hotmail.com",
    "rbrthermes92@gmail.com",
    "contato@tuafesta.com.br",
    "sezinandamorais@gmail.com",
    "shanafrainer@gmail.com",
    "silvanaweyh31@gmail.com",
    "silvanapel@hotmail.com",
    "ste.bravos@gmail.com",
    "tainahaack@gmail.com",
    "taiseseben@yahoo.com.br",
    "tamimont.freitas@gmail.com",
    "paty_cris18@hotmail.com",
    "karenthayrine@gmail.com",
    "copattemoveis0309@gmail.com",
    "splashsaoleopoldo@sphashpiscinas.com.br",
    "diamondgoldcursos@gmail.com",
    "marcia.0602@hotmail.com",
    "iveteibecker@hotmail.com",
    "Leticiabittencourtsouza@gmail.com",
    "julianeinascimento@gmail.com",
    "lauracollaradv@gmail.com",
    "neiafabri@hotmail.com",
    "lilianeweinheimer@gmail.com",
    "adonildacc@gmail.com"
]

# Let's add variations (e.g. Jhully-ana@outlook.com if the user typoed as oulook.com)
normalized_set = set()
for email in emails_to_revoke:
    email_clean = email.strip().lower()
    normalized_set.add(email_clean)
    if "oulook.com" in email_clean:
        normalized_set.add(email_clean.replace("oulook.com", "outlook.com"))

print(f"Total target emails loaded: {len(emails_to_revoke)} (Normalized: {len(normalized_set)})")

# Fetch users from Cloudflare D1
print("Fetching users list from Cloudflare D1...")
cmd = ["cmd", "/c", "npx", "wrangler", "d1", "execute", "andressamallinsk_ia_db", "--remote", "--json", '--command="SELECT id, email, name FROM users;"']
res = subprocess.run(cmd, capture_output=True, cwd="c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/worker")

stdout_str = res.stdout.decode("utf-8", errors="ignore")
stderr_str = res.stderr.decode("utf-8", errors="ignore")

if res.returncode != 0:
    print("Error executing wrangler command:")
    print(stderr_str)
    sys.exit(1)

# Parse output
try:
    data = json.loads(stdout_str)
    # The output is a JSON array of query results. Usually [{ "results": [...] }]
    db_users = data[0]["results"]
except Exception as e:
    print(f"Failed to parse json: {e}")
    print("Stdout:", stdout_str)
    sys.exit(1)

print(f"Total users in DB: {len(db_users)}")

matched_users = []
unmatched_emails = list(normalized_set)

for db_user in db_users:
    db_email = db_user["email"].strip().lower()
    if db_email in normalized_set:
        matched_users.append(db_user)
        if db_email in unmatched_emails:
            unmatched_emails.remove(db_email)
        # Also remove alternative spelling if present
        alt_email = db_email.replace("outlook.com", "oulook.com")
        if alt_email in unmatched_emails:
            unmatched_emails.remove(alt_email)
        alt_email2 = db_email.replace("oulook.com", "outlook.com")
        if alt_email2 in unmatched_emails:
            unmatched_emails.remove(alt_email2)

print("\n--- MATCHED USERS IN DATABASE (TO BE REVOKED) ---")
for idx, mu in enumerate(matched_users):
    print(f"{idx+1:02d}: ID={mu['id']} | Name={mu['name']} | Email={mu['email']}")

print(f"\nMatched users count: {len(matched_users)}")

print("\n--- EMAILS NOT FOUND IN DATABASE ---")
for idx, ue in enumerate(sorted(unmatched_emails)):
    print(f"{idx+1:02d}: {ue}")

print(f"\nUnmatched count: {len(unmatched_emails)}")

# Save matched users to a JSON file to use in deletion
with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/matched_users.json", "w", encoding="utf-8") as f:
    json.dump(matched_users, f, indent=2, ensure_ascii=False)
print("\nMatched users saved to scratch/matched_users.json")
