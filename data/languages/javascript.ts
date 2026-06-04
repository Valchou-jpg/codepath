import { LanguageCurriculum } from '@/lib/types';

export const javascriptCurriculum: LanguageCurriculum = {
  language: {
    id: 'javascript',
    name: 'JavaScript',
    icon: '⚡',
    color: '#F59E0B',
    bgColor: '#FFFBEB',
    description: 'Le langage du web. Tourne dans tous les navigateurs et avec Node.js côté serveur.',
    usedFor: ['Web Frontend', 'Backend (Node)', 'Mobile (React Native)', 'APIs', 'Jeux'],
  },
  chapters: [
    {
      id: 'js-basics',
      title: 'Les bases',
      description: 'Variables, types, opérateurs',
      lessons: [
        {
          id: 'js-variables',
          title: 'Variables : var, let, const',
          description: 'JavaScript a 3 façons de déclarer des variables, avec des portées différentes.',
          content: `## var, let, const

**Règle moderne : utilise \`const\` par défaut, \`let\` si tu dois réassigner.**

\`\`\`javascript
const PI = 3.14159;       // constante
let compteur = 0;         // peut changer
compteur = 1;             // OK

// var (ancien, à éviter)
var vieux = "déprécié";
\`\`\`

**Portée (scope) :**
\`\`\`javascript
{
    let x = 10;   // portée de bloc
    var y = 20;   // portée de fonction
}
// console.log(x);  // ReferenceError
console.log(y);     // 20 (var "fuit" du bloc)
\`\`\`

**Types JavaScript :**
\`\`\`javascript
typeof 42        // "number"
typeof "bonjour" // "string"
typeof true      // "boolean"
typeof undefined // "undefined"
typeof null      // "object" (bug historique)
typeof {}        // "object"
typeof []        // "object"
typeof function(){} // "function"
\`\`\``,
          code: `const nom = "Valentin";
let age = 20;
const langages = ["Python", "JavaScript", "Java"];

console.log(\`Nom: \${nom}, Age: \${age}\`);
console.log(\`Types: \${typeof nom}, \${typeof age}\`);

age = 21; // OK avec let
console.log(\`Nouvel âge: \${age}\`);

// Destructuring
const [premier, deuxième] = langages;
console.log(\`Préféré: \${premier}, 2ème: \${deuxième}\`);`,
          expectedOutput: `Nom: Valentin, Age: 20\nTypes: string, number\nNouvel âge: 21\nPréféré: Python, 2ème: JavaScript`,
          hint: 'Utilise const, let, template literals et destructuring.',
          xp: 10,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'js-functions',
          title: 'Fonctions et arrow functions',
          description: 'Les fonctions classiques et la syntaxe moderne avec =>.',
          content: `## Fonctions en JavaScript

**Déclaration classique :**
\`\`\`javascript
function additionner(a, b) {
    return a + b;
}
\`\`\`

**Expression de fonction :**
\`\`\`javascript
const multiplier = function(a, b) {
    return a * b;
};
\`\`\`

**Arrow function (moderne, recommandé) :**
\`\`\`javascript
const diviser = (a, b) => a / b;
const carré = x => x ** 2;  // 1 param = sans parenthèses
const saluer = (nom) => {
    const msg = \`Bonjour, \${nom} !\`;
    return msg;
};
\`\`\`

**Paramètres par défaut et rest :**
\`\`\`javascript
const puissance = (base, exp = 2) => base ** exp;
const somme = (...nombres) => nombres.reduce((a, b) => a + b, 0);
console.log(somme(1, 2, 3, 4, 5)); // 15
\`\`\``,
          code: `// Fonctions utilitaires
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const range = (start, end) => Array.from({length: end - start}, (_, i) => start + i);
const unique = arr => [...new Set(arr)];

console.log(clamp(150, 0, 100));  // 100
console.log(range(1, 6));         // [1,2,3,4,5]
console.log(unique([1,2,2,3,3,4])); // [1,2,3,4]

// Fonction récursive
const factorielle = n => n <= 1 ? 1 : n * factorielle(n - 1);
console.log(\`10! = \${factorielle(10)}\`);`,
          expectedOutput: `100\n[1, 2, 3, 4, 5]\n[1, 2, 3, 4]\n10! = 3628800`,
          hint: 'Implémente clamp, range, unique et factorielle avec arrow functions.',
          xp: 15,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'js-arrays',
          title: 'Tableaux et méthodes',
          description: 'map, filter, reduce et les méthodes essentielles des arrays.',
          content: `## Tableaux JavaScript

**Méthodes fondamentales :**
\`\`\`javascript
const arr = [1, 2, 3, 4, 5];
arr.push(6);           // ajoute à la fin
arr.pop();             // retire le dernier
arr.unshift(0);        // ajoute au début
arr.shift();           // retire le premier
arr.splice(2, 1);      // retire 1 élément à l'index 2
const copie = [...arr]; // spread = copie superficielle
\`\`\`

**Les 3 incontournables :**
\`\`\`javascript
// map — transforme chaque élément
const doubles = arr.map(x => x * 2);

// filter — garde selon condition
const pairs = arr.filter(x => x % 2 === 0);

// reduce — accumule en une valeur
const somme = arr.reduce((acc, x) => acc + x, 0);
\`\`\`

**Autres utiles :**
\`\`\`javascript
arr.find(x => x > 3)        // 4
arr.findIndex(x => x > 3)   // 3
arr.some(x => x > 4)        // true
arr.every(x => x > 0)       // true
arr.flat()                   // aplatit
arr.includes(3)              // true
[...new Set(arr)]            // déduplique
\`\`\``,
          code: `const produits = [
    { nom: "Laptop", prix: 999, stock: 3 },
    { nom: "Souris", prix: 29, stock: 0 },
    { nom: "Clavier", prix: 79, stock: 12 },
    { nom: "Écran", prix: 349, stock: 5 },
    { nom: "Casque", prix: 149, stock: 0 },
];

// En stock, triés par prix
const disponibles = produits
    .filter(p => p.stock > 0)
    .sort((a, b) => a.prix - b.prix);

console.log("Produits disponibles :");
disponibles.forEach(p => console.log(\`  \${p.nom}: \${p.prix}€ (\${p.stock} en stock)\`));

const total = disponibles.reduce((sum, p) => sum + p.prix * p.stock, 0);
console.log(\`Valeur du stock disponible : \${total}€\`);`,
          expectedOutput: `Produits disponibles :\n  Clavier: 79€ (12 en stock)\n  Écran: 349€ (5 en stock)\n  Laptop: 999€ (3 en stock)\nValeur du stock disponible : 5690€`,
          hint: 'Utilise filter, sort, forEach et reduce sur un tableau de produits.',
          xp: 20,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'js-promises',
          title: 'Promises et async/await',
          description: 'La programmation asynchrone est centrale en JavaScript.',
          content: `## Asynchrone en JavaScript

**Promise :**
\`\`\`javascript
const p = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Données chargées !"), 1000);
});
p.then(data => console.log(data))
 .catch(err => console.error(err));
\`\`\`

**async/await (plus lisible) :**
\`\`\`javascript
async function fetchUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        const user = await response.json();
        return user;
    } catch (error) {
        console.error("Erreur:", error);
    }
}
\`\`\`

**Promise.all — parallèle :**
\`\`\`javascript
const [users, posts] = await Promise.all([
    fetch("/api/users").then(r => r.json()),
    fetch("/api/posts").then(r => r.json()),
]);
\`\`\``,
          code: `// Simulation d'appels API
const pause = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function simulerChargement(ressource) {
    console.log(\`Chargement de \${ressource}...\`);
    await pause(100); // simule réseau
    return { id: Math.floor(Math.random() * 100), ressource };
}

async function main() {
    // Séquentiel
    const user = await simulerChargement("user");
    console.log("User:", user);
    
    // Parallèle (plus rapide)
    const [posts, comments] = await Promise.all([
        simulerChargement("posts"),
        simulerChargement("comments"),
    ]);
    console.log("Posts:", posts);
    console.log("Comments:", comments);
    console.log("Tout chargé !");
}

main();`,
          hint: 'Utilise async/await et Promise.all pour charger des ressources en parallèle.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'js-objects',
      title: 'Objets et classes',
      description: 'Objets, destructuring, spread et classes ES6',
      lessons: [
        {
          id: 'js-objects-basics',
          title: 'Objets et destructuring',
          description: 'Crée des objets, utilise le destructuring et le spread operator.',
          content: `## Objets en JavaScript

\`\`\`javascript
const personne = { nom: "Alice", age: 25, ville: "Paris" };

// Destructuring
const { nom, age } = personne;
console.log(\`\${nom}, \${age} ans\`);

// Spread — copier et étendre
const employe = { ...personne, poste: "Dev" };

// Object methods
Object.keys(obj)    // tableau des clés
Object.values(obj)  // tableau des valeurs
Object.entries(obj) // tableau de [clé, valeur]
\`\`\``,
          code: `const personne = { nom: "Alice", age: 25, ville: "Paris" };
const { nom, age, ...reste } = personne;
console.log(\`\${nom}, \${age} ans\`);
console.log("Reste :", JSON.stringify(reste));

const employe = { ...personne, poste: "Dev", salaire: 4500 };
console.log(\`\${employe.nom} — \${employe.poste}\`);

const notes = { maths: 17, info: 19, anglais: 15 };
const moy = Object.values(notes).reduce((s, n) => s + n, 0) / Object.keys(notes).length;
console.log(\`Moyenne : \${moy.toFixed(1)}/20\`);
console.log(\`Matières : \${Object.keys(notes).join(', ')}\`);`,
          expectedOutput: `Alice, 25 ans\nReste : {"ville":"Paris"}\nAlice — Dev\nMoyenne : 17.0/20\nMatières : maths, info, anglais`,
          hint: 'Utilise le destructuring avec rest (...reste), le spread pour créer employe, et Object.keys/values pour les notes.',
          xp: 15,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'js-classes',
          title: 'Classes et héritage',
          description: 'Crée des classes avec constructeur, méthodes et héritage.',
          content: `## Classes en JavaScript

\`\`\`javascript
class Animal {
    constructor(nom, son) {
        this.nom = nom;
        this.son = son;
    }
    parler() { return \`\${this.nom} dit "\${this.son}"\`; }
}

class Chien extends Animal {
    constructor(nom) { super(nom, "Woof !"); }
    rapporter(objet) { return \`\${this.nom} rapporte le \${objet}\`; }
}

const rex = new Chien("Rex");
console.log(rex.parler());
console.log(rex instanceof Animal); // true
\`\`\``,
          code: `class Forme {
    constructor(couleur) { this.couleur = couleur; }
    aire() { return 0; }
    toString() { return \`\${this.constructor.name}(\${this.couleur})\`; }
}

class Cercle extends Forme {
    constructor(couleur, rayon) { super(couleur); this.rayon = rayon; }
    aire() { return Math.PI * this.rayon ** 2; }
}

class Rectangle extends Forme {
    constructor(couleur, l, h) { super(couleur); this.l = l; this.h = h; }
    aire() { return this.l * this.h; }
}

const formes = [new Cercle("rouge", 5), new Rectangle("bleu", 4, 6), new Cercle("vert", 3)];

formes.forEach(f => console.log(\`\${f} → aire = \${f.aire().toFixed(2)}\`));

const totalAire = formes.reduce((sum, f) => sum + f.aire(), 0);
console.log(\`Aire totale : \${totalAire.toFixed(2)}\`);`,
          expectedOutput: `Cercle(rouge) → aire = 78.54\nRectangle(bleu) → aire = 24.00\nCercle(vert) → aire = 28.27\nAire totale : 130.81`,
          hint: 'Crée une classe Forme avec aire(), puis Cercle et Rectangle qui l\'étendent.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'js-patterns',
      title: 'Patterns avancés',
      description: 'Closures, erreurs, Sets/Maps et expressions régulières',
      lessons: [
        {
          id: 'js-errors',
          title: 'Gestion des erreurs',
          description: 'Utilise try/catch et lance des erreurs personnalisées.',
          content: `## Gestion des erreurs

\`\`\`javascript
function diviser(a, b) {
    if (b === 0) throw new Error("Division par zéro");
    return a / b;
}

try {
    console.log(diviser(10, 2)); // 5
    console.log(diviser(5, 0));  // lance Error
} catch(e) {
    console.log("Erreur :", e.message);
} finally {
    console.log("Terminé");
}
\`\`\``,
          code: `function validerAge(age) {
    if (typeof age !== 'number') throw new TypeError("L'âge doit être un nombre");
    if (age < 0 || age > 150) throw new RangeError(\`Âge invalide : \${age}\`);
    return age >= 18 ? "majeur" : "mineur";
}

const tests = [25, -5, 200, "abc", 16];
tests.forEach(val => {
    try {
        console.log(\`\${val} → \${validerAge(val)}\`);
    } catch(e) {
        console.log(\`\${val} → Erreur (\${e.constructor.name}) : \${e.message}\`);
    }
});`,
          expectedOutput: `25 → majeur\n-5 → Erreur (RangeError) : Âge invalide : -5\n200 → Erreur (RangeError) : Âge invalide : 200\nabc → Erreur (TypeError) : L'âge doit être un nombre\n16 → mineur`,
          hint: 'Lance TypeError si ce n\'est pas un nombre, RangeError si hors de [0,150].',
          xp: 20,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'js-closures-adv',
          title: 'Closures et usines de fonctions',
          description: 'Utilise les closures pour créer des fonctions avec état privé.',
          content: `## Closures

Une closure est une fonction qui "capture" les variables de son scope parent.

\`\`\`javascript
function créerMultiplicateur(facteur) {
    return (n) => n * facteur; // facteur est capturé
}
const double = créerMultiplicateur(2);
const triple = créerMultiplicateur(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15
\`\`\``,
          code: `function créerCache(fn) {
    const memo = {};
    return function(n) {
        if (memo[n] !== undefined) {
            console.log(\`[cache] fib(\${n})\`);
            return memo[n];
        }
        memo[n] = fn(n);
        return memo[n];
    };
}

function fib(n) { return n <= 1 ? n : fibMemo(n-1) + fibMemo(n-2); }
const fibMemo = créerCache(fib);

for (let i = 0; i <= 7; i++) {
    console.log(\`fib(\${i}) = \${fibMemo(i)}\`);
}`,
          expectedOutput: `fib(0) = 0\nfib(1) = 1\nfib(2) = 1\nfib(3) = 2\nfib(4) = 3\nfib(5) = 5\nfib(6) = 8\nfib(7) = 13`,
          hint: 'Crée une fonction créerCache(fn) qui mémoïse les résultats dans un objet memo.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'js-sets-maps',
          title: 'Set et Map',
          description: 'Utilise Set pour des valeurs uniques et Map pour des associations clé-valeur.',
          content: `## Set et Map

\`\`\`javascript
// Set — valeurs uniques
const set = new Set([1, 2, 2, 3, 3]);
console.log([...set]); // [1, 2, 3]
set.has(2);   // true
set.size;     // 3

// Map — n'importe quelle clé
const map = new Map();
map.set("alice", 95);
map.get("alice"); // 95
for (const [clé, val] of map) { ... }
\`\`\``,
          code: `// Déduplique et compte les mots
const texte = "le chat mange le poisson le chat dort";
const mots = texte.split(" ");
const unique = new Set(mots);
console.log(\`Mots uniques : \${[...unique].join(', ')}\`);
console.log(\`\${unique.size} mots uniques sur \${mots.length}\`);

// Fréquence avec Map
const freq = new Map();
mots.forEach(m => freq.set(m, (freq.get(m) || 0) + 1));

const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1]);
sorted.forEach(([mot, n]) => console.log(\`"\${mot}" : \${n}x\`));`,
          expectedOutput: `Mots uniques : le, chat, mange, poisson, dort\n5 mots uniques sur 8\n"le" : 3x\n"chat" : 2x\n"mange" : 1x\n"poisson" : 1x\n"dort" : 1x`,
          hint: 'Utilise new Set(mots) pour les uniques, et une Map pour compter les fréquences.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'js-regex',
          title: 'Expressions régulières',
          description: 'Utilise les regex pour valider et extraire des données.',
          content: `## Expressions régulières

\`\`\`javascript
// Test
/^\\d+$/.test("123")   // true (que des chiffres)
/^\\d+$/.test("12a")   // false

// Match — extraire
"Prix: 29€".match(/\\d+/g) // ["29"]

// Replace
"bonjour".replace(/o/g, "0") // "b0nj0ur"

// Groupes
const m = "2024-01-15".match(/(\\d{4})-(\\d{2})-(\\d{2})/);
// m[1]="2024", m[2]="01", m[3]="15"
\`\`\``,
          code: `const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
const phoneRegex = /^(\\+33|0)[1-9](\\d{2}){4}$/;

const contacts = [
    { nom: "Alice", email: "alice@gmail.com", tel: "+33612345678" },
    { nom: "Bob",   email: "bob-invalid",     tel: "0987654321" },
    { nom: "Clara", email: "clara@test.fr",   tel: "123" },
];

contacts.forEach(c => {
    const emailOk = emailRegex.test(c.email) ? "✓" : "✗";
    const telOk = phoneRegex.test(c.tel) ? "✓" : "✗";
    console.log(\`\${c.nom}: email \${emailOk}, tél \${telOk}\`);
});

const log = "ERROR 2024-01-15: timeout | INFO 2024-01-16: ok | ERROR 2024-01-17: crash";
const erreurs = log.match(/ERROR \\d{4}-\\d{2}-\\d{2}: \\w+/g);
console.log(\`\${erreurs.length} erreurs : \${erreurs.map(e => e.split(": ")[1]).join(', ')}\`);`,
          expectedOutput: `Alice: email ✓, tél ✓\nBob: email ✗, tél ✓\nClara: email ✓, tél ✗\n2 erreurs : timeout, crash`,
          hint: 'Valide emails et téléphones avec des regex, puis extrais les erreurs du log.',
          xp: 30,
          difficulty: 'advanced',
          type: 'lesson',
        },
        {
          id: 'js-reduce-adv',
          title: 'Reduce avancé et transformation de données',
          description: 'Maîtrise reduce pour transformer et agréger des données complexes.',
          content: `## Reduce avancé

\`\`\`javascript
// Grouper par catégorie
const grouper = (arr, clé) => arr.reduce((acc, item) => {
    const k = item[clé];
    acc[k] = [...(acc[k] || []), item];
    return acc;
}, {});

// Pipeline de transformation
const résultat = données
    .filter(x => x.actif)
    .map(x => ({ ...x, score: x.points * 2 }))
    .reduce((sum, x) => sum + x.score, 0);
\`\`\``,
          code: `const ventes = [
    { produit: "Laptop", categorie: "Info", prix: 999, qte: 2 },
    { produit: "Souris", categorie: "Info", prix: 29,  qte: 10 },
    { produit: "Stylo",  categorie: "Bureau", prix: 3, qte: 50 },
    { produit: "Écran",  categorie: "Info", prix: 349, qte: 3 },
    { produit: "Agenda", categorie: "Bureau", prix: 12, qte: 20 },
];

// CA total
const caTotal = ventes.reduce((sum, v) => sum + v.prix * v.qte, 0);
console.log(\`CA total : \${caTotal}€\`);

// CA par catégorie
const parCat = ventes.reduce((acc, v) => {
    acc[v.categorie] = (acc[v.categorie] || 0) + v.prix * v.qte;
    return acc;
}, {});
Object.entries(parCat).sort((a, b) => b[1] - a[1]).forEach(([cat, ca]) => {
    console.log(\`\${cat} : \${ca}€\`);
});`,
          expectedOutput: `CA total : 3734€\nInfo : 3484€\nBureau : 390€`,
          hint: 'Utilise reduce pour calculer le CA total, puis pour regrouper par catégorie.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'js-generators',
          title: 'Générateurs et itérateurs',
          description: 'Crée des séquences infinies et des itérateurs personnalisés.',
          content: `## Générateurs

\`\`\`javascript
function* compter(début = 0) {
    let n = début;
    while (true) yield n++;
}

const gen = compter(1);
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// Itérable personnalisé
function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) yield i;
}
console.log([...range(0, 10, 2)]); // [0,2,4,6,8]
\`\`\``,
          code: `function* fibonacci() {
    let [a, b] = [0, 1];
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function prendre(gen, n) {
    const result = [];
    for (const val of gen) {
        result.push(val);
        if (result.length === n) break;
    }
    return result;
}

const fib = fibonacci();
const premiers10 = prendre(fib, 10);
console.log(\`Fibonacci : \${premiers10.join(', ')}\`);

function* range(start, end, step = 1) {
    for (let i = start; i < end; i += step) yield i;
}
const pairs = [...range(0, 20, 2)];
console.log(\`Pairs : \${pairs.join(', ')}\`);
console.log(\`Somme : \${pairs.reduce((s, n) => s + n, 0)}\`);`,
          expectedOutput: `Fibonacci : 0, 1, 1, 2, 3, 5, 8, 13, 21, 34\nPairs : 0, 2, 4, 6, 8, 10, 12, 14, 16, 18\nSomme : 90`,
          hint: 'Crée un générateur fibonacci() infini et une fonction prendre(gen, n) pour en extraire n valeurs.',
          xp: 35,
          difficulty: 'advanced',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'js-dom',
      title: 'DOM et événements',
      description: 'Manipuler les pages web avec JavaScript',
      lessons: [
        {
          id: 'js-dom-basics',
          title: 'Manipulation du DOM',
          description: 'Le DOM est l\'arbre de la page HTML. JS permet de le modifier dynamiquement.',
          content: `## DOM — Document Object Model

\`\`\`javascript
// Sélectionner des éléments
const h1 = document.querySelector("h1");
const boutons = document.querySelectorAll(".btn");
const el = document.getElementById("monId");

// Modifier le contenu
h1.textContent = "Nouveau titre";
h1.innerHTML = "<em>Titre</em> en italique";

// Modifier les styles
h1.style.color = "blue";
h1.classList.add("actif");
h1.classList.toggle("visible");

// Créer des éléments
const div = document.createElement("div");
div.textContent = "Nouveau contenu";
document.body.appendChild(div);

// Événements
h1.addEventListener("click", (e) => {
    console.log("Cliqué !", e.target);
});
\`\`\``,
          code: `// Exemple : compteur interactif (copie ce code dans une page HTML)
// Dans CodePath, on simule le comportement :

function créerCompteur() {
    let count = 0;
    
    const incrémenter = () => {
        count++;
        console.log(\`Compteur : \${count}\`);
    };
    
    const décrémenter = () => {
        count = Math.max(0, count - 1);
        console.log(\`Compteur : \${count}\`);
    };
    
    const réinitialiser = () => {
        count = 0;
        console.log("Réinitialisé");
    };
    
    return { incrémenter, décrémenter, réinitialiser };
}

const compteur = créerCompteur();
compteur.incrémenter();
compteur.incrémenter();
compteur.incrémenter();
compteur.décrémenter();
console.log("---");
compteur.réinitialiser();`,
          expectedOutput: `Compteur : 1\nCompteur : 2\nCompteur : 3\nCompteur : 2\n---\nRéinitialisé`,
          hint: 'Crée un compteur avec fermeture (closure) exposant incrémenter, décrémenter, réinitialiser.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'js-course-intro',
      title: 'Introduction à JavaScript',
      content: `# JavaScript — Le guide complet

## Qu'est-ce que JavaScript ?

JavaScript (JS) est le seul langage **natif dans les navigateurs web**. Créé en 1995 par Brendan Eich en seulement 10 jours, il est devenu l'un des langages les plus utilisés au monde.

## Côté client vs côté serveur

- **Navigateur** : rendre les pages interactives, réagir aux événements
- **Node.js** : serveurs, APIs, outils en ligne de commande

## Caractéristiques clés

- **Dynamiquement typé** : pas besoin de déclarer les types
- **Orienté prototype** : héritage par prototype
- **Événementiel** : basé sur un event loop
- **Multi-paradigme** : fonctionnel, OOP, procédural

## ECMAScript

JavaScript suit le standard ECMAScript. ES6 (2015) a apporté des améliorations majeures : \`let/const\`, arrow functions, classes, modules, promises...`,
    },
  ],
};
