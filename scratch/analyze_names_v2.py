import json
import subprocess
import sys
import unicodedata

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

STOPWORDS = {"de", "da", "do", "dos", "das", "e", "o", "a"}

def normalize_str(s):
    if not s:
        return ""
    nfkd_form = unicodedata.normalize('NFKD', s)
    only_ascii = "".join([c for c in nfkd_form if not unicodedata.combining(c)])
    return only_ascii.lower().strip()

def get_significant_words(name):
    norm = normalize_str(name)
    words = [w for w in norm.split() if w not in STOPWORDS and len(w) > 1]
    return words

# Fetch database users
cmd = ["cmd", "/c", "npx", "wrangler", "d1", "execute", "andressamallinsk_ia_db", "--remote", "--json", '--command="SELECT id, email, name FROM users;"']
res = subprocess.run(cmd, capture_output=True, cwd="c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/worker")

if res.returncode != 0:
    print("Error executing wrangler command:")
    print(res.stderr.decode("utf-8", errors="ignore"))
    sys.exit(1)

data = json.loads(res.stdout.decode("utf-8", errors="ignore"))
db_users = data[0]["results"]

matched_ids = set()
matched_pairs = []

# First match exact emails
db_by_email = {normalize_str(u["email"]): u for u in db_users}
unmatched_raw = []

for name, email in raw_users:
    norm_email = normalize_str(email)
    emails_to_check = [norm_email]
    if "oulook.com" in norm_email:
        emails_to_check.append(norm_email.replace("oulook.com", "outlook.com"))
        
    found = False
    for em in emails_to_check:
        if em in db_by_email:
            u = db_by_email[em]
            matched_ids.add(u["id"])
            matched_pairs.append({
                "match_type": "email",
                "list_name": name,
                "list_email": email,
                "db_name": u["name"],
                "db_email": u["email"],
                "db_id": u["id"]
            })
            found = True
            break
    if not found:
        unmatched_raw.append((name, email))

# Now match unmatched names using token intersection
print(f"Checking {len(unmatched_raw)} unmatched users for name-based matches in DB...")

for name, email in unmatched_raw:
    list_words = get_significant_words(name)
    if not list_words:
        continue
        
    for u in db_users:
        if u["id"] in matched_ids:
            continue
            
        db_words = get_significant_words(u["name"])
        # Check intersection
        intersection = set(list_words) & set(db_words)
        
        # If they share at least 2 significant words, or if one name is a subset of the other of size >= 2
        is_match = False
        reason = ""
        
        # Exact name match (normalized)
        if normalize_str(name) == normalize_str(u["name"]):
            is_match = True
            reason = "Exact name match"
        # First + Last name matches and at least 2 common words
        elif len(list_words) >= 2 and list_words[0] == db_words[0] and list_words[-1] == db_words[-1]:
            is_match = True
            reason = "First & Last name match"
        # Subset match for shorter names, e.g. "Amanda Bordin" in "Amanda Bordin Guerin"
        elif len(list_words) >= 2 and len(db_words) >= 2:
            # check if list name is a subset of db name, or db name is a subset of list name
            set_list = set(list_words)
            set_db = set(db_words)
            if set_list.issubset(set_db) or set_db.issubset(set_list):
                is_match = True
                reason = "Name subset match"
            elif len(intersection) >= 2:
                # If they share at least 2 words and the first word (first name) is the same
                if list_words[0] == db_words[0]:
                    is_match = True
                    reason = f"Shares {len(intersection)} words and same first name"
                    
        if is_match:
            print(f"FOUND MATCH [{reason}]:\n  List: '{name}' ({email})\n  DB  : '{u['name']}' ({u['email']}) [ID={u['id']}]")
            matched_ids.add(u["id"])
            matched_pairs.append({
                "match_type": f"name ({reason})",
                "list_name": name,
                "list_email": email,
                "db_name": u["name"],
                "db_email": u["email"],
                "db_id": u["id"]
            })

# Save the final consolidated list
with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/final_matched_pairs.json", "w", encoding="utf-8") as f:
    json.dump(matched_pairs, f, indent=2, ensure_ascii=False)

print(f"\nTotal matches found: {len(matched_pairs)}")
