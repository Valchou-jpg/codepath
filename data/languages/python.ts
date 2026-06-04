import { LanguageCurriculum } from '@/lib/types';

export const pythonCurriculum: LanguageCurriculum = {
  language: {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    description: 'Langage polyvalent, lisible et puissant. Idéal pour débuter, la data science, l\'IA et le web.',
    usedFor: ['Data Science', 'IA / ML', 'Web', 'Automation', 'Scripts'],
  },
  chapters: [
    {
      id: 'basics',
      title: 'Les bases',
      description: 'Variables, types, opérateurs et affichage',
      lessons: [
        {
          id: 'py-print',
          title: 'Afficher du texte',
          description: 'La fonction print() est la porte d\'entrée de Python. Elle affiche du texte ou des valeurs dans la console.',
          content: `## La fonction print()

\`print()\` est la fonction la plus utilisée pour débugger et afficher des résultats.

**Syntaxe de base :**
\`\`\`python
print("Bonjour le monde !")
print(42)
print(3.14)
\`\`\`

**Afficher plusieurs valeurs :**
\`\`\`python
print("Mon âge est", 20, "ans")
# Séparateur personnalisé
print("a", "b", "c", sep="-")  # a-b-c
# Fin de ligne personnalisée
print("Suite...", end=" ")
print("sur la même ligne")
\`\`\`

**f-strings (recommandé) :**
\`\`\`python
nom = "Alice"
age = 25
print(f"Je m'appelle {nom} et j'ai {age} ans.")
\`\`\``,
          code: `# Affiche ton prénom et ton âge
nom = "Valentin"
age = 20
print(f"Je m'appelle {nom} et j'ai {age} ans.")`,
          expectedOutput: `Je m'appelle Valentin et j'ai 20 ans.`,
          hint: 'Utilise une f-string pour afficher ton prénom et ton âge.',
          xp: 10,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'py-variables',
          title: 'Variables et types',
          description: 'Les variables permettent de stocker des données. Python reconnaît automatiquement leur type.',
          content: `## Variables et types de données

Python est dynamiquement typé : le type est inféré automatiquement.

**Les types de base :**
| Type | Exemple | Description |
|------|---------|-------------|
| int | 42 | Entier |
| float | 3.14 | Décimal |
| str | "bonjour" | Texte |
| bool | True/False | Booléen |
| None | None | Valeur nulle |

**Vérifier le type :**
\`\`\`python
x = 42
print(type(x))  # <class 'int'>
\`\`\`

**Conversions :**
\`\`\`python
x = int("42")      # str → int
y = float("3.14")  # str → float
z = str(42)        # int → str
\`\`\``,
          code: `# Déclare des variables de différents types
age = 20
taille = 1.75
nom = "Valentin"
est_etudiant = True

print(type(age))
print(type(taille))
print(f"{nom} mesure {taille}m et a {age} ans.")`,
          expectedOutput: `<class 'int'>\n<class 'float'>\nValentin mesure 1.75m et a 20 ans.`,
          hint: 'Déclare 4 variables de types différents et affiche leur type avec type().',
          xp: 10,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'py-operators',
          title: 'Opérateurs',
          description: 'Python supporte tous les opérateurs arithmétiques, de comparaison et logiques.',
          content: `## Opérateurs en Python

**Arithmétiques :**
\`\`\`python
print(10 + 3)   # 13
print(10 - 3)   # 7
print(10 * 3)   # 30
print(10 / 3)   # 3.333...
print(10 // 3)  # 3  (division entière)
print(10 % 3)   # 1  (modulo)
print(2 ** 8)   # 256 (puissance)
\`\`\`

**Comparaison :**
\`\`\`python
print(5 == 5)   # True
print(5 != 3)   # True
print(5 > 3)    # True
print(5 >= 5)   # True
\`\`\`

**Logiques :**
\`\`\`python
print(True and False)  # False
print(True or False)   # True
print(not True)        # False
\`\`\``,
          code: `# Calcule et affiche
a, b = 17, 5
print(f"{a} + {b} = {a + b}")
print(f"{a} // {b} = {a // b}")
print(f"{a} % {b} = {a % b}")
print(f"{a} ** 2 = {a ** 2}")
print(f"{a} > {b} ? {a > b}")`,
          expectedOutput: `17 + 5 = 22\n17 // 5 = 3\n17 % 5 = 2\n17 ** 2 = 289\n17 > 5 ? True`,
          hint: 'Joue avec les opérateurs arithmétiques et de comparaison.',
          xp: 10,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'py-strings',
          title: 'Chaînes de caractères',
          description: 'Les strings sont des séquences de caractères avec des méthodes puissantes.',
          content: `## Manipulation des strings

**Méthodes essentielles :**
\`\`\`python
s = "Bonjour le Monde"
print(s.upper())        # BONJOUR LE MONDE
print(s.lower())        # bonjour le monde
print(s.strip())        # supprime espaces
print(s.replace("Monde", "World"))
print(s.split(" "))     # ['Bonjour', 'le', 'Monde']
print(len(s))           # 17
print(s[0])             # B (indexation)
print(s[-1])            # e (dernier caractère)
print(s[0:7])           # Bonjour (slicing)
\`\`\`

**Vérifications :**
\`\`\`python
print("Bon" in s)       # True
print(s.startswith("Bon"))  # True
print(s.endswith("nde"))    # True
\`\`\``,
          code: `phrase = "  Python est incroyable  "
# Nettoie, met en majuscules, compte les mots
propre = phrase.strip()
print(propre.title())
print(f"Longueur : {len(propre)} chars")
print(f"Mots : {len(propre.split())}")
print(propre.replace("incroyable", "fantastique"))`,
          expectedOutput: `Python Est Incroyable\nLongueur : 22 chars\nMots : 3\nPython est fantastique`,
          hint: 'Utilise .strip(), .title(), .replace() et .split() sur une chaîne.',
          xp: 15,
          difficulty: 'beginner',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'control',
      title: 'Structures de contrôle',
      description: 'Conditions, boucles et gestion du flux',
      lessons: [
        {
          id: 'py-if',
          title: 'Conditions if/elif/else',
          description: 'Les conditions permettent d\'exécuter du code selon des critères.',
          content: `## Conditions en Python

\`\`\`python
age = 20
if age < 13:
    print("Enfant")
elif age < 18:
    print("Adolescent")
elif age < 65:
    print("Adulte")
else:
    print("Senior")
\`\`\`

**Expression ternaire (1 ligne) :**
\`\`\`python
statut = "majeur" if age >= 18 else "mineur"
\`\`\`

**match/case (Python 3.10+) :**
\`\`\`python
jour = "lundi"
match jour:
    case "samedi" | "dimanche":
        print("Week-end !")
    case "lundi":
        print("Début de semaine")
    case _:
        print("Jour de semaine")
\`\`\``,
          code: `note = 75
if note >= 90:
    mention = "Très bien"
elif note >= 75:
    mention = "Bien"
elif note >= 60:
    mention = "Assez bien"
elif note >= 50:
    mention = "Passable"
else:
    mention = "Insuffisant"

print(f"Note {note}/100 → {mention}")`,
          expectedOutput: `Note 75/100 → Bien`,
          hint: 'Implémente un système de mentions selon la note (90+, 75+, 60+, 50+, sinon).',
          xp: 15,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'py-for',
          title: 'Boucle for',
          description: 'La boucle for itère sur des séquences : listes, ranges, chaînes...',
          content: `## Boucle for

**Avec range() :**
\`\`\`python
for i in range(5):       # 0,1,2,3,4
    print(i)
for i in range(1, 11):   # 1 à 10
    print(i)
for i in range(0, 20, 2): # pairs
    print(i)
\`\`\`

**Sur une liste :**
\`\`\`python
fruits = ["pomme", "banane", "cerise"]
for fruit in fruits:
    print(fruit)
\`\`\`

**Avec enumerate (index + valeur) :**
\`\`\`python
for i, fruit in enumerate(fruits):
    print(f"{i}: {fruit}")
\`\`\`

**List comprehension (avancé) :**
\`\`\`python
carrés = [x**2 for x in range(10)]
pairs = [x for x in range(20) if x % 2 == 0]
\`\`\``,
          code: `# Affiche la table de multiplication de 7
for i in range(1, 11):
    print(f"7 × {i:2d} = {7*i:3d}")

# Bonus : somme des 100 premiers entiers
total = sum(range(1, 101))
print(f"\\nSomme de 1 à 100 = {total}")`,
          expectedOutput: `7 ×  1 =   7\n7 ×  2 =  14\n7 ×  3 =  21\n7 ×  4 =  28\n7 ×  5 =  35\n7 ×  6 =  42\n7 ×  7 =  49\n7 ×  8 =  56\n7 ×  9 =  63\n7 × 10 =  70\n\nSomme de 1 à 100 = 5050`,
          hint: 'Affiche la table de 7 avec un range(1, 11).',
          xp: 15,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'py-while',
          title: 'Boucle while',
          description: 'La boucle while continue tant qu\'une condition est vraie.',
          content: `## Boucle while

\`\`\`python
compteur = 0
while compteur < 5:
    print(compteur)
    compteur += 1
\`\`\`

**break et continue :**
\`\`\`python
for i in range(10):
    if i == 3:
        continue  # saute i=3
    if i == 7:
        break     # arrête la boucle
    print(i)
\`\`\`

**Boucle infinie contrôlée :**
\`\`\`python
while True:
    réponse = input("Continuer ? (o/n) ")
    if réponse == 'n':
        break
\`\`\``,
          code: `# Algorithme d'Euclide : pgcd de deux nombres
a, b = 48, 18
print(f"PGCD({a}, {b}) :")
while b != 0:
    print(f"  {a} = {a//b} × {b} + {a%b}")
    a, b = b, a % b
print(f"PGCD = {a}")`,
          expectedOutput: `PGCD(48, 18) :\n  48 = 2 × 18 + 12\n  18 = 1 × 12 + 6\n  12 = 2 × 6 + 0\nPGCD = 6`,
          hint: 'Implémente l\'algorithme d\'Euclide pour trouver le PGCD de 48 et 18.',
          xp: 20,
          difficulty: 'beginner',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'functions',
      title: 'Fonctions',
      description: 'Définir et utiliser des fonctions réutilisables',
      lessons: [
        {
          id: 'py-functions-basic',
          title: 'Définir des fonctions',
          description: 'Les fonctions permettent de structurer et réutiliser du code.',
          content: `## Fonctions en Python

\`\`\`python
def saluer(nom, formel=False):
    if formel:
        return f"Bonjour, M./Mme {nom}."
    return f"Salut {nom} !"

print(saluer("Alice"))           # Salut Alice !
print(saluer("Dupont", True))    # Bonjour, M./Mme Dupont.
\`\`\`

**Arguments positionnels et nommés :**
\`\`\`python
def puissance(base, exposant=2):
    return base ** exposant

print(puissance(3))      # 9
print(puissance(2, 10))  # 1024
print(puissance(exposant=3, base=4))  # 64
\`\`\`

**Retourner plusieurs valeurs :**
\`\`\`python
def min_max(liste):
    return min(liste), max(liste)

mini, maxi = min_max([3, 1, 4, 1, 5, 9])
\`\`\``,
          code: `def est_premier(n):
    """Vérifie si n est un nombre premier."""
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

# Affiche tous les premiers < 50
premiers = [n for n in range(2, 50) if est_premier(n)]
print(f"Premiers < 50 : {premiers}")
print(f"Nombre de premiers : {len(premiers)}")`,
          expectedOutput: `Premiers < 50 : [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]\nNombre de premiers : 15`,
          hint: 'Crée une fonction est_premier(n) et liste tous les premiers < 50.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'py-lambda',
          title: 'Lambdas et fonctions d\'ordre supérieur',
          description: 'Les lambdas sont des fonctions anonymes d\'une ligne. map, filter, sorted...',
          content: `## Lambdas et higher-order functions

**Lambda :**
\`\`\`python
carré = lambda x: x ** 2
print(carré(5))  # 25
\`\`\`

**map() — applique à chaque élément :**
\`\`\`python
nombres = [1, 2, 3, 4, 5]
carrés = list(map(lambda x: x**2, nombres))
# [1, 4, 9, 16, 25]
\`\`\`

**filter() — garde si condition vraie :**
\`\`\`python
pairs = list(filter(lambda x: x % 2 == 0, nombres))
# [2, 4]
\`\`\`

**sorted() avec clé :**
\`\`\`python
mots = ["banane", "pomme", "kiwi"]
triés = sorted(mots, key=lambda x: len(x))
# ['kiwi', 'pomme', 'banane']
\`\`\``,
          code: `etudiants = [
    {"nom": "Alice", "note": 85},
    {"nom": "Bob", "note": 72},
    {"nom": "Charlie", "note": 91},
    {"nom": "Diana", "note": 68},
]

# Trie par note décroissante
classement = sorted(etudiants, key=lambda e: e["note"], reverse=True)
for i, e in enumerate(classement, 1):
    print(f"{i}. {e['nom']:10s} — {e['note']}/100")

# Reçus (note >= 70)
reçus = list(filter(lambda e: e["note"] >= 70, etudiants))
print(f"\\nReçus : {len(reçus)}/{len(etudiants)}")`,
          expectedOutput: `1. Charlie    — 91/100\n2. Alice      — 85/100\n3. Bob        — 72/100\n4. Diana      — 68/100\n\nReçus : 3/4`,
          hint: 'Utilise sorted() avec une lambda et filter() pour travailler sur une liste de dicts.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'datastructures',
      title: 'Structures de données',
      description: 'Listes, tuples, dictionnaires et ensembles',
      lessons: [
        {
          id: 'py-lists',
          title: 'Listes',
          description: 'Les listes sont des collections ordonnées et modifiables.',
          content: `## Listes en Python

\`\`\`python
fruits = ["pomme", "banane", "cerise"]
fruits.append("kiwi")         # ajoute à la fin
fruits.insert(1, "mangue")    # insère à l'index 1
fruits.remove("banane")       # supprime par valeur
popped = fruits.pop()         # supprime et retourne le dernier
fruits.sort()                 # trie en place
fruits.reverse()              # inverse
print(fruits.index("pomme"))  # position
print(len(fruits))            # longueur
\`\`\`

**Slicing :**
\`\`\`python
lst = [0, 1, 2, 3, 4, 5]
print(lst[1:4])    # [1, 2, 3]
print(lst[:3])     # [0, 1, 2]
print(lst[::2])    # [0, 2, 4]
print(lst[::-1])   # inversé
\`\`\``,
          code: `# Manipulation de liste : notes d'un élève
notes = [15, 12, 18, 9, 14, 17, 11, 16]
print(f"Notes : {notes}")
print(f"Moyenne : {sum(notes)/len(notes):.2f}")
print(f"Max : {max(notes)}, Min : {min(notes)}")

notes.sort(reverse=True)
print(f"Triées : {notes}")
print(f"Top 3 : {notes[:3]}")

# Garde les notes >= 10
reussies = [n for n in notes if n >= 10]
print(f"Réussies ({len(reussies)}/{len(notes)}) : {reussies}")`,
          expectedOutput: `Notes : [15, 12, 18, 9, 14, 17, 11, 16]\nMoyenne : 14.00\nMax : 18, Min : 9\nTriées : [18, 17, 16, 15, 14, 12, 11, 9]\nTop 3 : [18, 17, 16]\nRéussies (7/8) : [18, 17, 16, 15, 14, 12, 11]`,
          hint: 'Calcule des statistiques sur une liste de notes avec sort(), sum(), max(), min().',
          xp: 20,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'py-dicts',
          title: 'Dictionnaires',
          description: 'Les dictionnaires stockent des paires clé-valeur, très utiles pour structurer des données.',
          content: `## Dictionnaires

\`\`\`python
personne = {
    "nom": "Alice",
    "age": 25,
    "ville": "Paris"
}
print(personne["nom"])            # Alice
print(personne.get("email", "N/A"))  # N/A (valeur par défaut)
personne["email"] = "alice@ex.com"   # ajout
del personne["ville"]                # suppression
print("nom" in personne)             # True
\`\`\`

**Itération :**
\`\`\`python
for clé, valeur in personne.items():
    print(f"{clé}: {valeur}")
\`\`\`

**Dict comprehension :**
\`\`\`python
carrés = {x: x**2 for x in range(1, 6)}
# {1:1, 2:4, 3:9, 4:16, 5:25}
\`\`\``,
          code: `# Compteur de fréquence de lettres
texte = "hello world"
frequences = {}
for lettre in texte:
    if lettre != " ":
        frequences[lettre] = frequences.get(lettre, 0) + 1

# Trie par fréquence décroissante
for lettre, count in sorted(frequences.items(), key=lambda x: -x[1]):
    barre = "█" * count
    print(f"{lettre}: {barre} ({count})")`,
          expectedOutput: `l: ███ (3)\no: ██ (2)\nh: █ (1)\ne: █ (1)\nw: █ (1)\nr: █ (1)\nd: █ (1)`,
          hint: 'Crée un compteur de fréquences de lettres avec un dictionnaire.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'oop',
      title: 'Programmation orientée objet',
      description: 'Classes, objets, héritage et encapsulation',
      lessons: [
        {
          id: 'py-classes',
          title: 'Classes et objets',
          description: 'La POO organise le code autour d\'objets qui encapsulent données et comportements.',
          content: `## Classes en Python

\`\`\`python
class Animal:
    espèce = "Inconnu"  # attribut de classe
    
    def __init__(self, nom, age):
        self.nom = nom      # attribut d'instance
        self.age = age
    
    def __str__(self):
        return f"{self.nom} ({self.age} ans)"
    
    def parler(self):
        return "..."

class Chien(Animal):
    espèce = "Canis lupus"
    
    def parler(self):
        return "Woof !"

rex = Chien("Rex", 3)
print(rex)           # Rex (3 ans)
print(rex.parler())  # Woof !
print(isinstance(rex, Animal))  # True
\`\`\``,
          code: `class CompteBancaire:
    def __init__(self, titulaire, solde=0):
        self.titulaire = titulaire
        self._solde = solde  # _ = convention "privé"
    
    def déposer(self, montant):
        if montant > 0:
            self._solde += montant
            print(f"+ {montant}€ → Solde : {self._solde}€")
    
    def retirer(self, montant):
        if montant > self._solde:
            print("Fonds insuffisants !")
        else:
            self._solde -= montant
            print(f"- {montant}€ → Solde : {self._solde}€")
    
    @property
    def solde(self):
        return self._solde

compte = CompteBancaire("Alice", 1000)
compte.déposer(500)
compte.retirer(200)
compte.retirer(2000)
print(f"Solde final : {compte.solde}€")`,
          expectedOutput: `+ 500€ → Solde : 1500€\n- 200€ → Solde : 1300€\nFonds insuffisants !\nSolde final : 1300€`,
          hint: 'Implémente une classe CompteBancaire avec dépôt, retrait et propriété solde.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'advanced',
      title: 'Python avancé',
      description: 'Décorateurs, générateurs, gestion d\'erreurs',
      lessons: [
        {
          id: 'py-exceptions',
          title: 'Gestion des exceptions',
          description: 'try/except pour gérer les erreurs élégamment.',
          content: `## Exceptions

\`\`\`python
try:
    résultat = 10 / 0
except ZeroDivisionError:
    print("Division par zéro !")
except (TypeError, ValueError) as e:
    print(f"Erreur : {e}")
else:
    print("Succès !")  # si pas d'exception
finally:
    print("Toujours exécuté")
\`\`\`

**Lever une exception :**
\`\`\`python
def diviser(a, b):
    if b == 0:
        raise ValueError("Le diviseur ne peut pas être 0")
    return a / b
\`\`\`

**Exception personnalisée :**
\`\`\`python
class AgeInvalideError(Exception):
    pass

def vérifier_age(age):
    if age < 0 or age > 150:
        raise AgeInvalideError(f"Age invalide : {age}")
\`\`\``,
          code: `def calculatrice(a, opérateur, b):
    try:
        if opérateur == "+": return a + b
        elif opérateur == "-": return a - b
        elif opérateur == "*": return a * b
        elif opérateur == "/":
            if b == 0:
                raise ZeroDivisionError("Division par zéro")
            return a / b
        else:
            raise ValueError(f"Opérateur inconnu : {opérateur}")
    except ZeroDivisionError as e:
        return f"Erreur : {e}"
    except ValueError as e:
        return f"Erreur : {e}"

tests = [(10, "+", 5), (10, "/", 0), (10, "%", 3), (4, "*", 7)]
for a, op, b in tests:
    print(f"{a} {op} {b} = {calculatrice(a, op, b)}")`,
          expectedOutput: `10 + 5 = 15\n10 / 0 = Erreur : Division par zéro\n10 % 3 = Erreur : Opérateur inconnu : %\n4 * 7 = 28`,
          hint: 'Crée une calculatrice avec gestion des exceptions ZeroDivisionError et ValueError.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'py-generators',
          title: 'Générateurs et itérateurs',
          description: 'Les générateurs produisent des valeurs à la demande, très économes en mémoire.',
          content: `## Générateurs

**yield au lieu de return :**
\`\`\`python
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fibonacci()
for _ in range(10):
    print(next(gen), end=" ")
# 0 1 1 2 3 5 8 13 21 34
\`\`\`

**Generator expression :**
\`\`\`python
# Économique en mémoire vs list comprehension
grands_carrés = (x**2 for x in range(10**6) if x % 2 == 0)
print(next(grands_carrés))  # 0
print(next(grands_carrés))  # 4
\`\`\``,
          code: `def suite_collatz(n):
    """Génère la suite de Collatz depuis n."""
    yield n
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        yield n

# Affiche la suite pour n=27 et sa longueur
suite = list(suite_collatz(27))
print(f"Collatz(27) : {suite[:10]}...")
print(f"Longueur : {len(suite)} étapes")

# Trouve le n < 100 avec la plus longue suite
plus_long = max(range(1, 100), key=lambda n: len(list(suite_collatz(n))))
print(f"Plus longue suite < 100 : n={plus_long} ({len(list(suite_collatz(plus_long)))} étapes)")`,
          expectedOutput: `Collatz(27) : [27, 82, 41, 124, 62, 31, 94, 47, 142, 71]...\nLongueur : 112 étapes\nPlus longue suite < 100 : n=97 (119 étapes)`,
          hint: 'Implémente la suite de Collatz comme générateur et trouve la plus longue sous 100.',
          xp: 40,
          difficulty: 'advanced',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'py-course-intro',
      title: 'Introduction à Python',
      content: `# Python — Le guide complet

## Qu'est-ce que Python ?

Python est un langage de programmation **interprété**, **orienté objet** et **à typage dynamique** créé par Guido van Rossum en 1991. Sa philosophie repose sur la lisibilité du code et une syntaxe élégante.

## Pourquoi apprendre Python ?

- **Syntaxe lisible** : ressemble à de l'anglais naturel
- **Polyvalent** : web, data science, IA, automation, jeux...
- **Grande communauté** : millions de bibliothèques (pip)
- **Employabilité** : l'un des langages les plus demandés
- **Gratuit et open-source**

## Installation

\`\`\`bash
# Windows
winget install Python.Python.3

# macOS
brew install python3

# Linux
sudo apt install python3
\`\`\`

Vérifie : \`python --version\`

## Ton premier programme

\`\`\`python
print("Hello, World!")
\`\`\`

## L'interpréteur interactif

Lance \`python\` dans ton terminal pour entrer en mode interactif (REPL). Idéal pour tester rapidement.`,
    },
    {
      id: 'py-course-zen',
      title: 'Le Zen de Python',
      content: `# Le Zen de Python

Tape \`import this\` dans Python pour voir les 19 principes qui guident la philosophie du langage :

- **Beautiful is better than ugly** — Le code doit être agréable à lire
- **Explicit is better than implicit** — Rendre les intentions claires
- **Simple is better than complex** — Préférer la simplicité
- **Readability counts** — La lisibilité est une priorité

Ces principes font de Python l'un des langages les plus agréables à écrire et à maintenir.`,
    },
  ],
};
