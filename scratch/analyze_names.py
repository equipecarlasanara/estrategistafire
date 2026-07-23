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
    # Remove accents and convert to lowercase
    nfkd_form = unicodedata.normalize('NFKD', s)
    only_ascii = "".join([c for c in nfkd_form if not unicodedata.combining(c)])
    return " ".join(only_ascii.lower().strip().split())

# Fetch database users
cmd = ["cmd", "/c", "npx", "wrangler", "d1", "execute", "andressamallinsk_ia_db", "--remote", "--json", '--command="SELECT id, email, name FROM users;"']
res = subprocess.run(cmd, capture_output=True, cwd="c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/worker")

if res.returncode != 0:
    print("Error executing wrangler command:")
    print(res.stderr.decode("utf-8", errors="ignore"))
    sys.exit(1)

data = json.loads(res.stdout.decode("utf-8", errors="ignore"))
db_users = data[0]["results"]

matched_by_email = []
matched_by_name = []
unmatched_raw = []

db_by_email = {normalize_str(u["email"]): u for u in db_users}
db_by_name = {}
for u in db_users:
    norm_name = normalize_str(u["name"])
    if norm_name:
        db_by_name.setdefault(norm_name, []).append(u)

# Find matches
matched_ids = set()

print("\n--- MATCHING BY EMAIL ---")
for name, email in raw_users:
    norm_email = normalize_str(email)
    
    # Handle the oulook.com typo
    emails_to_check = [norm_email]
    if "oulook.com" in norm_email:
        emails_to_check.append(norm_email.replace("oulook.com", "outlook.com"))
        
    found = False
    for em in emails_to_check:
        if em in db_by_email:
            u = db_by_email[em]
            matched_by_email.append((name, email, u))
            matched_ids.add(u["id"])
            found = True
            break
            
    if not found:
        unmatched_raw.append((name, email))

print(f"Matched by email: {len(matched_by_email)}")

print("\n--- ANALYZING UNMATCHED FOR NAME SIMILARITY IN DB ---")
extra_matches = []
for name, email in unmatched_raw:
    norm_name = normalize_str(name)
    
    # 1. Exact name match (normalized)
    if norm_name in db_by_name:
        for u in db_by_name[norm_name]:
            if u["id"] not in matched_ids:
                print(f"EXACT NAME MATCH: List name='{name}' (email={email}) matches DB name='{u['name']}' (email={u['email']})")
                extra_matches.append((name, email, u))
                matched_ids.add(u["id"])
        continue
        
    # 2. Check if the database has a user whose name is a subset or contains first & last words
    words = norm_name.split()
    if len(words) >= 2:
        first_last = words[0] + " " + words[-1]
        matched_sub = False
        for db_norm_name, db_list in db_by_name.items():
            db_words = db_norm_name.split()
            # If the database name contains the first and last name of the list
            if words[0] in db_words and words[-1] in db_words:
                for u in db_list:
                    if u["id"] not in matched_ids:
                        # Avoid bad matches like "Mariana Machado..." vs "Mariana oliveira..." by checking length/subset ratio
                        common_words = set(words) & set(db_words)
                        if len(common_words) >= 2:
                            print(f"FLEXIBLE NAME MATCH: List name='{name}' (email={email}) matches DB name='{u['name']}' (email={u['email']})")
                            extra_matches.append((name, email, u))
                            matched_ids.add(u["id"])
                            matched_sub = True
                if matched_sub:
                    break

print(f"Extra matches by name: {len(extra_matches)}")

# Save final list of all matched users to delete
all_to_delete = [u for name, email, u in matched_by_email] + [u for name, email, u in extra_matches]
with open("c:/Users/carla/Downloads/IA estrategista/estrategista-extracted/estrategista-AndressaMallinsk-main/scratch/all_to_delete.json", "w", encoding="utf-8") as f:
    json.dump(all_to_delete, f, indent=2, ensure_ascii=False)

print(f"\nTotal users mapped for deletion: {len(all_to_delete)}")
