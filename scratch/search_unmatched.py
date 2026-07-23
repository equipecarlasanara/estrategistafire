import json
import subprocess
import sys

unmatched_names = [
    ("Adonilda", "Adonilda Chagas da Costa"),
    ("Amanda Bordin", "Amanda Bordin Guerin"),
    ("Luana dos Santos", "LUANA DOS SANTOS GARCIA"),
    ("Michele", "Michele fernandes de andrade"),
    ("Barbara", "Barbara teixeira da silva"),
    ("Carin", "Carin Jaqueline Kruth Muller"),
    ("Carla Roberta", "Carla Roberta Carvalho"),
    ("Vanessa Copatti", "Vanessa Copatti de Souza"),
    ("Cristiane", "Cristiane oliveira soares"),
    ("Cryslayne", "Cryslayne barbosa rocha"),
    ("Daniele oliveira", "Daniele oliveira marques"),
    ("Andreia", "Andreia Gomes Monteiro"),
    ("Dhiuliane", "Dhiuliane Aparecida Amaral Felipe"),
    ("Eliria", "ELIRIA ANGELITA GREINER"),
    ("Gabriela Lazzaretti", "Gabriela Lazzaretti"),
    ("Graziele", "Graziele da Silva batista"),
    ("Greicy", "Greicy Natieli dos Santos da Rosa"),
    ("Helen", "Helen Rafaela De Pruença Fernandes"),
    ("Inaira", "Inaira Cecília Ribeiro Veiga"),
    ("Ivete", "Ivete Becker"),
    ("Janine", "Janine dos santos brasil conceicao"),
    ("Jobiane", "Jobiane Martins da S. oliveira"),
    ("Karina Kelly", "Karina Kelly Higino"),
    ("Karine", "Karine Silva"),
    ("Kemberli", "Kemberli Alves Lopes"),
    ("Laiana", "Laiana Brito da Silveira"),
    ("Larissa", "Larissa"),
    ("Luciana", "Luciana Formasini"),
    ("Mariana", "Mariana oliveira dos Santos"),
    ("Nickely", "Nickely brenda dos anjos"),
    ("Mikaela", "Mikaela Koeche"),
    ("Mirian", "Mirian Cricielly de Oliveira Pimentel"),
    ("Natalia de souza", "Natalia de souza Cássimo"),
    ("Rawany", "Rawany Emanuelli Santos de Oliveira"),
    ("Roberta dos Santos", "Roberta dos Santos hermes"),
    ("Regina", "Regina Schuerne"),
    ("Wanderléia", "Wanderléia dos santos"),
    ("dieniffer", "dieniffer s anchete da silva"),
    ("Tamires", "Tamires Monteiro Freitas e Marlon Peres")
]

# Fetch users from Cloudflare D1
print("Fetching users list from Cloudflare D1...")
cmd = ["cmd", "/c", "npx", "wrangler", "d1", "execute", "andressamallinsk_ia_db", "--remote", "--json", '--command="SELECT id, email, name FROM users;"']
res = subprocess.run(cmd, capture_output=True, cwd="c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/worker")

if res.returncode != 0:
    print("Error executing wrangler command:")
    print(res.stderr.decode("utf-8", errors="ignore"))
    sys.exit(1)

try:
    data = json.loads(res.stdout.decode("utf-8", errors="ignore"))
    db_users = data[0]["results"]
except Exception as e:
    print(f"Failed to parse json: {e}")
    sys.exit(1)

print("\nScanning for possible name/alias matches for unmatched users:")
for short_name, full_name in unmatched_names:
    found_any = False
    for db_user in db_users:
        db_name = db_user["name"].lower()
        db_email = db_user["email"].lower()
        
        # Check if parts of the name match
        words = short_name.lower().split()
        if all(w in db_name for w in words):
            print(f"Possible Match for '{full_name}': DB Name='{db_user['name']}', DB Email='{db_user['email']}', DB ID='{db_user['id']}'")
            found_any = True
    if not found_any:
        # Check if last name or first name exists in any form
        first_word = short_name.split()[0].lower()
        matches_first = [u for u in db_users if first_word in u["name"].lower()]
        if matches_first:
            names_str = ", ".join([f"'{u['name']}' ({u['email']})" for u in matches_first[:3]])
            print(f"No direct match for '{full_name}'. DB has first-name matches: {names_str}")
        else:
            print(f"No match at all for '{full_name}'")
