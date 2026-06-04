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
