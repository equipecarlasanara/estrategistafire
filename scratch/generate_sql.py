import json
import subprocess
import sys
import unicodedata

# List of users requested by the user
raw_users = [
    ("Adriana Marques Quintano", "adrioriginalle@hotmail.com"),
    ("Alessandra Ribeiro Lopes Moreira Rech", "alerechdesigner@icloud.com"),
    ("Amanda Bordin Guerin", "amandabordin15@gmail.com"),
    ("Amanda Oliveira Scherer", "amandascherer.comex@gmail.com"),
    ("Amanda Tayne dias de almeida", "amandadias.psicopp@gmail.com"),
    ("Ana Flávia Pereira Miranda", "flaviapereiramv@gmail.com"),
    ("Ana Paula Bortolon dos Santos Galbarino", "anabortolon@hotmail.com"),
    ("Ana vitoria morschbacher scalço", "anamorschbachers@gmail.com"),
    ("Ananda Rodrigues", "anandamirailh@gmail.com"),
    ("Andreia Gomes Monteiro", "dekagmonteiro@gmail.com"),
    ("Andressa Freitas da Silva", "andressaedener@gmail.com"),
    ("Andressa Hennemann de Macedo", "andressa.mhenne@gmail.com"),
    ("Andressa Valéria Rigotti Prestes", "lotus.mk@hotmail.com"),
    ("Andreza Madeira trindade", "andrezamadeiratrindade@gmail.com"),
    ("Angelita dos santos farias", "angel.raquel13@gmail.com"),
    ("Ariely lamb Cardoso", "ariely.lamb@hotmail.com"),
    ("Barbara teixeira da silva", "babiteixeirak@gmail.com"),
    ("Beatriz audi camara", "biaaudicamara@gmail.com"),
    ("Bruna Daniela Saraiva freitas", "Brunadaniela.sf@gmail.com"),
    ("Carin Jaqueline Kruth Muller", "carinterapeuta@gmail.com"),
    ("Carina Regina Flores Paiva Neves", "carinaflores5@yahoo.com.br"),
    ("Carla Roberta Carvalho", "carlarobertaimoveis@gmail.com"),
    ("Carla Sanara dos Santos Pereira Monteiro", "maepragmatica@gmail.com"),
    ("Cilene Augusta da silva", "cilene.augusta@icloud.com"),
    ("Cristiane oliveira soares", "cristianeoliveirasoares@hotmail.com"),
    ("Cryslayne barbosa rocha", "crys.seja@gmail.com"),
    ("Daiana Sueli mafra couto", "dra_daiana@outlook.com"),
    ("Daiane Fernanda Mattei Magalhães", "daianemagic.1g@gmail.com"),
    ("Daniele oliveira marques", "danielemarques82@gmail.com"),
    ("Daniele da Conceição Vicente", "danielevicente.09@outlook.com"),
    ("Maria Alice Kanitz", "mariaalicekanitz@outlook.com"),
    ("Débora Cristina Assafrão Rodrigues", "assafraodebora@gmail.com"),
    ("Débora da Silva Peres", "deborasipe@gmail.com"),
    ("Degliane Bernardes", "deglianebernardes00@gmail.com"),
    ("Deise de melo moraes", "moraes.melo.deise@gmail.com"),
    ("Deise Ramos Py Ramos", "deise_wd@hotmail.com"),
    ("Deise tamara dutra", "deisetdutra@gmail.com"),
    ("Dhiuliane Aparecida Amaral Felipe", "dhiully.amaral@hotmail.com"),
    ("dieniffer s anchete da silva", "studiodieniffersas1@gmail.com"),
    ("Eduarda Alves Chagas", "dudda.dsgn@gmail.com"),
    ("Eduardo leonir mendes da Silva ", "biancabmuller@gmail.com"),
    ("Eliana Iohann de Siqueira", "eliana.iohann@icloud.com"),
    ("ELIRIA ANGELITA GREINER", "eleriag@gmail.com"),
    ("Fernanda Silveira Pessel", "pessel.fs@gmail.com"),
    ("Flavia batista de souza", "flaviasouzaunip@gmail.com"),
    ("Gabriela Fonseca ", "gabfonseca132@gmail.com"),
    ("Gabriela Lazzaretti", "gabrielalazzaretti361@gmail.com"),
    ("Gabrielle Pereira dos santos", "gabriellepereirasantos5@gmail.com"),
    ("Giordana Rizzon de Sousa de Oliveira", "gio.rizzon@gmail.com"),
    ("Graziele da Silva batista", "grazielebaatista@yahoo.com.br"),
    ("Greicy Natieli dos Santos da Rosa", "greicy.ink@gmail.com"),
    ("Helen Rafaela De Pruença Fernandes", "helen_rafaela2012@hotmail.com"),
    ("Inaira Cecília Ribeiro Veiga", "Inairacecilia@gmail.com"),
    ("ISABEL CRISTINA SARAIVA FREITAS ", "isabelcsfreitas@gmail.com"),
    ("Isabelle Justo", "isabelle.justo@eaportal.org"),
    ("Jane Marcelle Nascimento Pinheiro", "jmnpinheiro34@gmail.com"),
    ("Janine dos santos brasil conceicao", "janinebrasilaor@gmail.com"),
    ("Jêniffer cristina Freitas Costa", "jenienadia@hotmail.com"),
    ("Jéssica Cantini", "fisio.jecantini@gmail.com"),
    ("Jobiane Martins da S. oliveira", "jobidoces@gmail.com"),
    ("Joice Dutra", "joicedutra0@gmail.com"),
    ("Josiane Maria Silva", "josy.maria.silva@hotmail.com"),
    ("Jucieli Lacardelli", "juci@agelsci.com.br"),
    ("Juliana lopes almeida", "Jhully-ana@oulook.com"),
    ("Junior Cabreira", "jucabreira7@gmail.com"),
    ("Karina Kelly Higino", "Karinakhigino79@yahoo.com.br"),
    ("Karine Silva", "karine.caroline.sol@icloud.com"),
    ("Kemberli Alves Lopes", "kemberli.lopes@gmail.com"),
    ("Laiana Brito da Silveira", "laianabrito2020@gmail.com"),
    ("Larissa Cristina Lucas de Favery", "larissadefavery2@hotmail.com"),
    ("Larissa dias da silva", "laridias.s@gmail.com"),
    ("Larissa Tonheca", "larissatonheca@hotmail.com"),
    ("Leyla Prates", "pratesleyla@gmail.com"),
    ("Lithiele da Silva velasques", "lithy_dgv@hotmail.com"),
    ("LUANA DOS SANTOS GARCIA", "anaaluh22@gmail.com"),
    ("Luciana Formasini", "luciana.formazini@gmail.com"),
    ("Luciane Carine Kirschke Meleu", "luciane.carine@gmail.com"),
    ("Mariana oliveira dos Santos", "marianaoliveiradossantos149@gmail.com"),
    ("Martilenisi M. O. moreira", "mentora.martin.moreira@gmail.com"),
    ("Melyna Bolze", "bolzemelyna@gmail.com"),
    ("Michele fernandes de andrade", "andesmichele27@gmail.com"),
    ("Michelli Hermes Altini", "michellihermes@gmail.com"),
    ("Mikaela Koeche", "mikaelakoechefotografa2@gmail.com"),
    ("Mirian Cricielly de Oliveira Pimentel", "oliveirapimentelmirian@gmail.com"),
    ("Naiara Alves Darolt", "naiaradarolt@yahoo.com"),
    ("Natalia de souza Cássimo ", "nataliacassino@gmail.com"),
    ("Natasha M rodrigues", "contadora.natasha@gmail.com"),
    ("Nathalia cristina da silva pereira", "nathakiaspereira91@gmail.com"),
    ("Nickely brenda dos anjos", "marketingexpressacessoria@gmail.com"),
    ("Nicole Hohgraefe", "nicole.hohgtaefe@gmail.com"),
    ("Polianna Lazzarini", "divinapolly@gmail.com"),
    ("Raphaella Willer", "barbosarapha.98@gmail.com"),
    ("Rawany Emanuelli Santos de Oliveira", "rawanyemanuelli@yahoo.com.br"),
    ("Rayara Lengruber da silva tavares", "lengruberheart@gmail.com"),
    ("Regina Schuerne", "rerafaellischuerne@gmail.com"),
    ("Renata Cunha Karam", "renata_karam@hotmail.com"),
    ("Richele Silva da Silva", "richele_ag@hotmail.com"),
    ("Roberta dos Santos hermes", "rbrthermes92@gmail.com"),
    ("Sabrina Pereira da Costa", "contato@tuafesta.com.br"),
    ("Sezinanda Aline de Morais", "sezinandamorais@gmail.com"),
    ("Shana da Costa Frainer", "shanafrainer@gmail.com"),
    ("Silvana fatima weyh", "silvanaweyh31@gmail.com"),
    ("Silvana tuchtenhagen", "silvanapel@hotmail.com"),
    ("Stephany Naves Bravos", "ste.bravos@gmail.com"),
    ("tainá natalia haack", "tainahaack@gmail.com"),
    ("Taíse Seben", "taiseseben@yahoo.com.br"),
    ("Tamires Monteiro Freitas e Marlon Peres", "tamimont.freitas@gmail.com"),
    ("Thaís Patricia Hammes", "paty_cris18@hotmail.com"),
    ("Thayrine Keren Lima Teixeira", "karenthayrine@gmail.com"),
    ("Vanessa Copatti de Souza", "copattemoveis0309@gmail.com"),
    ("Wanderléia dos santos", "splashsaoleopoldo@sphashpiscinas.com.br"),
    ("Werinton Martins", "diamondgoldcursos@gmail.com"),
    ("Márcia Adriana", "marcia.0602@hotmail.com"),
    ("Ivete Becker", "iveteibecker@hotmail.com"),
    ("Letícia Souza Dutra", "Leticiabittencourtsouza@gmail.com"),
    ("Juliane Nascimento", "julianeinascimento@gmail.com"),
    ("Laura Collar Rodrigues", "lauracollaradv@gmail.com"),
    ("Edineia Fablice Vicente", "neiafabri@hotmail.com"),
    ("Liliane Tavares Weinheimer ", "lilianeweinheimer@gmail.com"),
    ("Adonilda Chagas da Costa", "adonildacc@gmail.com")
]

def normalize_str(s):
    if not s:
        return ""
    nfkd_form = unicodedata.normalize('NFKD', s)
    only_ascii = "".join([c for c in nfkd_form if not unicodedata.combining(c)])
    return only_ascii.lower().strip()

# Fetch DB users
cmd = ["cmd", "/c", "npx", "wrangler", "d1", "execute", "andressamallinsk_ia_db", "--remote", "--json", '--command="SELECT id, email, name FROM users;"']
res = subprocess.run(cmd, capture_output=True, cwd="c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/worker")

if res.returncode != 0:
    print("Error executing wrangler command:")
    print(res.stderr.decode("utf-8", errors="ignore"))
    sys.exit(1)

data = json.loads(res.stdout.decode("utf-8", errors="ignore"))
db_users = data[0]["results"]

matched_users_info = []
matched_ids = set()
unmatched_list_emails = set()

# Normalize list of target emails
target_emails_normalized = {}
for name, email in raw_users:
    norm_email = normalize_str(email)
    target_emails_normalized[norm_email] = (name, email)
    if "oulook.com" in norm_email:
        target_emails_normalized[norm_email.replace("oulook.com", "outlook.com")] = (name, email)

# 1. Match by Email (case-insensitive) - finds multiple if same email has different casings/spaces in DB
for u in db_users:
    u_email_norm = normalize_str(u["email"])
    if u_email_norm in target_emails_normalized:
        orig_name, orig_email = target_emails_normalized[u_email_norm]
        matched_users_info.append((u["id"], u["name"], u["email"], f"Exact email match with '{orig_email}'"))
        matched_ids.add(u["id"])

# 2. Add confirmed name-based matches
# - Carla Roberta Carvalho
# - Mirian Cricielly de Oliveira Pimentel
# - Amanda Bordin Guerin
# - Thayrine Keren Lima Teixeira
confirmed_name_matches = [
    ("Carla Roberta Carvalho", "carlarobertamoveis@gmail.com"),
    ("Mirian Cricielly de Oliveira Pimentel", "Polensemijoias@gmail.com"),
    ("Amanda Bordin", "uselionessstore@gmail.com"),
    ("Amanda Bordin Leoa2026*", "Uselionessstore@gmail.com"),
    ("Thayrine keren lima Teixeira ", "kerenthayrine@gmail.com")
]

db_users_by_email = {normalize_str(u["email"]): u for u in db_users}
for name_check, email_check in confirmed_name_matches:
    em_norm = normalize_str(email_check)
    if em_norm in db_users_by_email:
        u = db_users_by_email[em_norm]
        if u["id"] not in matched_ids:
            matched_users_info.append((u["id"], u["name"], u["email"], f"Confirmed name match '{name_check}'"))
            matched_ids.add(u["id"])

# Sort matched list for clean presentation
matched_users_info.sort(key=lambda x: x[1].lower())

# Identify unmatched emails from the requested list
for name, email in raw_users:
    norm_email = normalize_str(email)
    # Check if this email is in our matched list
    matched = False
    for mid, mname, memail, mreason in matched_users_info:
        if normalize_str(memail) == norm_email or (normalize_str(memail) == norm_email.replace("oulook.com", "outlook.com")):
            matched = True
            break
    # Check special confirmed cases
    if normalize_str(email) == normalize_str("carlarobertaimoveis@gmail.com") and any("carlarobertamoveis" in m[2].lower() for m in matched_users_info):
        matched = True
    if normalize_str(email) == normalize_str("oliveirapimentelmirian@gmail.com") and any("polensemijoias" in m[2].lower() for m in matched_users_info):
        matched = True
    if normalize_str(email) == normalize_str("amandabordin15@gmail.com") and any("uselionessstore" in m[2].lower() for m in matched_users_info):
        matched = True

    if not matched:
        unmatched_list_emails.add((name, email))

# Generate SQL script
sql_lines = []
sql_lines.append("-- SQL script to revoke access (delete users and all references)")
sql_lines.append("PRAGMA foreign_keys = ON;")
sql_lines.append("")

for uid, uname, uemail, reason in matched_users_info:
    sql_lines.append(f"-- User: {uname} ({uemail}) - {reason}")
    sql_lines.append(f"DELETE FROM goals WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM weekly_actions WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM leads WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM content_items WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM chat_history WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM action_plans WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM usage_tracking WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM image_history WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM objection_history WHERE user_id = '{uid}';")
    sql_lines.append(f"DELETE FROM users WHERE id = '{uid}';")
    sql_lines.append("")

with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/delete_users.sql", "w", encoding="utf-8") as f:
    f.write("\n".join(sql_lines))

print(f"Generated SQL script at scratch/delete_users.sql with {len(matched_users_info)} users.")
print(f"Total matched users to delete: {len(matched_users_info)}")
print(f"Total unmatched users (not in DB): {len(unmatched_list_emails)}")

# Write unmatched users report
with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/unmatched_report.txt", "w", encoding="utf-8") as f:
    f.write("=== REQUESTED USERS NOT FOUND IN DATABASE ===\n")
    for name, email in sorted(unmatched_list_emails, key=lambda x: x[0].lower()):
        f.write(f"NAME: '{name}' | EMAIL: '{email}'\n")

print("Saved unmatched report to scratch/unmatched_report.txt")
