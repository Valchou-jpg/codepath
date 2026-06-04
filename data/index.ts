import { pythonCurriculum } from './languages/python';
import { javascriptCurriculum } from './languages/javascript';
import { LanguageCurriculum } from '@/lib/types';

// C curriculum
const cCurriculum: LanguageCurriculum = {
  language: {
    id: 'c',
    name: 'C',
    icon: '⚙️',
    color: '#6366F1',
    bgColor: '#EEF2FF',
    description: 'Le langage bas niveau par excellence. Comprendre C, c\'est comprendre l\'ordinateur.',
    usedFor: ['Systèmes', 'Embarqué', 'OS', 'Compilateurs', 'Drivers'],
  },
  chapters: [
    {
      id: 'c-basics',
      title: 'Les bases du C',
      description: 'Structure d\'un programme, types, I/O',
      lessons: [
        {
          id: 'c-hello',
          title: 'Structure d\'un programme C',
          description: 'Tout programme C commence par des includes, une fonction main et se termine par return 0.',
          content: `## Programme C minimal

\`\`\`c
#include <stdio.h>  // bibliothèque standard d'I/O

int main() {
    printf("Hello, World!\\n");
    return 0;  // 0 = succès
}
\`\`\`

**Compilation et exécution :**
\`\`\`bash
gcc programme.c -o programme
./programme
\`\`\`

**printf — formatage :**
| Spécificateur | Type |
|---|---|
| %d | int |
| %f | float |
| %s | string (char*) |
| %c | char |
| %ld | long |
| %lf | double |

\`\`\`c
int age = 20;
float taille = 1.75;
char lettre = 'A';
printf("Age: %d, Taille: %.2f, Lettre: %c\\n", age, taille, lettre);
\`\`\``,
          code: `#include <stdio.h>

int main() {
    int age = 20;
    float pi = 3.14159f;
    char grade = 'A';
    
    printf("Age : %d ans\\n", age);
    printf("Pi = %.4f\\n", pi);
    printf("Grade : %c\\n", grade);
    printf("Pi * age = %.2f\\n", pi * age);
    
    return 0;
}`,
          expectedOutput: `Age : 20 ans\nPi = 3.1416\nGrade : A\nPi * age = 62.83`,
          hint: 'Affiche des variables de types int, float et char avec printf.',
          xp: 10,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'c-pointers',
          title: 'Pointeurs',
          description: 'Les pointeurs sont au cœur du C. Ils permettent de manipuler la mémoire directement.',
          content: `## Pointeurs en C

Un pointeur contient une **adresse mémoire**.

\`\`\`c
int x = 42;
int *p = &x;    // p pointe vers x

printf("%d\\n", x);   // 42 (valeur)
printf("%p\\n", p);   // 0x... (adresse)
printf("%d\\n", *p);  // 42 (déréférencement)

*p = 100;       // modifie x via le pointeur
printf("%d\\n", x);   // 100
\`\`\`

**Pointeur et tableau :**
\`\`\`c
int arr[] = {1, 2, 3, 4, 5};
int *ptr = arr;  // pointe sur le 1er élément

for (int i = 0; i < 5; i++) {
    printf("%d ", *(ptr + i));  // arithmétique de pointeur
}
\`\`\`

**Allocation dynamique :**
\`\`\`c
#include <stdlib.h>
int *tab = malloc(5 * sizeof(int));
// ... utilisation ...
free(tab);  // OBLIGATOIRE pour éviter les fuites mémoire
\`\`\``,
          code: `#include <stdio.h>

void échanger(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Avant : x=%d, y=%d\\n", x, y);
    échanger(&x, &y);
    printf("Après : x=%d, y=%d\\n", x, y);
    
    // Tableau et pointeur
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = 6;
    int *max_ptr = &arr[0];
    
    for (int i = 1; i < n; i++) {
        if (arr[i] > *max_ptr) max_ptr = &arr[i];
    }
    printf("Maximum : %d (adresse: %p)\\n", *max_ptr, (void*)max_ptr);
    
    return 0;
}`,
          expectedOutput: `Avant : x=10, y=20\nAprès : x=20, y=10\nMaximum : 9 (adresse: varie selon l'exécution)`,
          hint: 'Implémente une fonction échanger() utilisant des pointeurs, et trouve le max d\'un tableau.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'c-advanced',
      title: 'Tableaux et récursivité',
      description: 'Statistiques sur tableaux, fonctions récursives',
      lessons: [
        {
          id: 'c-arrays-stats',
          title: 'Statistiques sur un tableau',
          description: 'Calcule somme, minimum, maximum et moyenne d\'un tableau d\'entiers.',
          content: `## Tableaux en C

\`\`\`c
int arr[] = {5, 2, 8, 1, 9};
int n = 5;

// Parcours
for (int i = 0; i < n; i++) {
    printf("%d ", arr[i]);
}

// Taille d'un tableau déclaré localement
int taille = sizeof(arr) / sizeof(arr[0]); // 5
\`\`\`

**Fonctions utiles :**
\`\`\`c
int min = arr[0];
for (int i = 1; i < n; i++)
    if (arr[i] < min) min = arr[i];
\`\`\``,
          code: `#include <stdio.h>

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3, 7, 4, 6};
    int n = 9;
    int sum = 0, min = arr[0], max = arr[0];

    for (int i = 0; i < n; i++) {
        sum += arr[i];
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }

    printf("Somme : %d\\n", sum);
    printf("Min : %d, Max : %d\\n", min, max);
    printf("Moyenne : %.2f\\n", (float)sum / n);

    return 0;
}`,
          expectedOutput: `Somme : 45\nMin : 1, Max : 9\nMoyenne : 5.00`,
          hint: 'Parcoure le tableau pour calculer la somme, puis cherche le min et max dans la même boucle.',
          xp: 25,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'c-recursion',
          title: 'Fonctions récursives',
          description: 'Implémente factorielle et Fibonacci en récursif.',
          content: `## Récursivité en C

Une fonction récursive s'appelle elle-même avec un cas de base pour arrêter.

\`\`\`c
int factorielle(int n) {
    if (n <= 1) return 1;           // cas de base
    return n * factorielle(n - 1); // appel récursif
}
// factorielle(5) = 5 * 4 * 3 * 2 * 1 = 120
\`\`\`

**Fibonacci :**
\`\`\`c
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}
// 0 1 1 2 3 5 8 13 21...
\`\`\``,
          code: `#include <stdio.h>

int factorielle(int n) {
    if (n <= 1) return 1;
    return n * factorielle(n - 1);
}

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    for (int i = 0; i <= 7; i++) {
        printf("fact(%d) = %d\\n", i, factorielle(i));
    }
    printf("\\nFibonacci : ");
    for (int i = 0; i < 8; i++) {
        printf("%d ", fibonacci(i));
    }
    printf("\\n");
    return 0;
}`,
          expectedOutput: `fact(0) = 1\nfact(1) = 1\nfact(2) = 2\nfact(3) = 6\nfact(4) = 24\nfact(5) = 120\nfact(6) = 720\nfact(7) = 5040\n\nFibonacci : 0 1 1 2 3 5 8 13 `,
          hint: 'Écris deux fonctions récursives : factorielle(n) et fibonacci(n) avec leurs cas de base.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'c-course-intro',
      title: 'Introduction au C',
      content: `# Le langage C — Guide complet

## Histoire

Créé par Dennis Ritchie aux Bell Labs entre 1969 et 1973, C est le langage sur lequel Unix a été réécrit. La plupart des langages modernes (C++, Java, Python, JavaScript) ont hérité de sa syntaxe.

## Pourquoi apprendre C ?

- **Comprendre la machine** : gestion manuelle de la mémoire
- **Performances** : aucune couche d'abstraction
- **Ubiquité** : systèmes embarqués, OS, compilateurs
- **Base solide** : facilite l'apprentissage des autres langages

## Compilation

C est un langage **compilé** : le code source est transformé en code machine avant exécution.

\`\`\`
Source (.c) → Préprocesseur → Compilateur → Assembleur → Linker → Exécutable
\`\`\``,
    },
  ],
};

// Java curriculum
const javaCurriculum: LanguageCurriculum = {
  language: {
    id: 'java',
    name: 'Java',
    icon: '☕',
    color: '#EF4444',
    bgColor: '#FEF2F2',
    description: 'Langage orienté objet robuste et portable. "Write once, run anywhere."',
    usedFor: ['Android', 'Enterprise', 'Backend', 'Big Data', 'Spring'],
  },
  chapters: [
    {
      id: 'java-basics',
      title: 'Fondamentaux Java',
      description: 'Classes, types statiques, OOP',
      lessons: [
        {
          id: 'java-hello',
          title: 'Structure d\'un programme Java',
          description: 'En Java, tout est dans des classes. La méthode main est le point d\'entrée.',
          content: `## Programme Java

\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

**Règles :**
- Une classe publique par fichier
- Le fichier = NomDeLaClasse.java
- \`main\` est toujours \`public static void main(String[] args)\`

**Types primitifs :**
| Type | Taille | Exemple |
|------|--------|---------|
| int | 32 bits | 42 |
| long | 64 bits | 42L |
| double | 64 bits | 3.14 |
| boolean | 1 bit | true |
| char | 16 bits | 'A' |

\`\`\`java
int age = 20;
double pi = 3.14159;
String nom = "Alice";  // String est une classe, pas un primitif
boolean actif = true;
\`\`\``,
          code: `public class Main {
    public static void main(String[] args) {
        // Types primitifs
        int age = 20;
        double taille = 1.75;
        char initial = 'V';
        boolean estEtudiant = true;
        
        // String (objet)
        String nom = "Valentin";
        
        System.out.printf("Nom : %s%n", nom);
        System.out.printf("Age : %d ans%n", age);
        System.out.printf("Taille : %.2f m%n", taille);
        System.out.printf("Initiale : %c%n", initial);
        System.out.printf("Étudiant : %b%n", estEtudiant);
        
        // String methods
        System.out.println(nom.toUpperCase());
        System.out.println(nom.length());
        System.out.println(nom.contains("ent"));
    }
}`,
          expectedOutput: `Nom : Valentin\nAge : 20 ans\nTaille : 1.75 m\nInitiale : V\nÉtudiant : true\nVALENTIN\n8\ntrue`,
          hint: 'Déclare et affiche des variables de différents types avec printf.',
          xp: 10,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'java-oop',
          title: 'Classes et héritage',
          description: 'Java est fondamentalement orienté objet. Classes, interfaces, héritage.',
          content: `## OOP en Java

\`\`\`java
// Classe abstraite
abstract class Forme {
    protected String couleur;
    
    public Forme(String couleur) {
        this.couleur = couleur;
    }
    
    public abstract double aire();
    
    @Override
    public String toString() {
        return getClass().getSimpleName() + " " + couleur;
    }
}

// Héritage
class Cercle extends Forme {
    private double rayon;
    
    public Cercle(String couleur, double rayon) {
        super(couleur);
        this.rayon = rayon;
    }
    
    @Override
    public double aire() {
        return Math.PI * rayon * rayon;
    }
}

// Interface
interface Dessinable {
    void dessiner();
}
\`\`\``,
          code: `abstract class Vehicule {
    protected String marque;
    protected int vitesseMax;
    
    public Vehicule(String marque, int vitesseMax) {
        this.marque = marque;
        this.vitesseMax = vitesseMax;
    }
    
    public abstract String typeCarburant();
    
    public void afficher() {
        System.out.printf("%s | %d km/h | %s%n", 
            marque, vitesseMax, typeCarburant());
    }
}

class Voiture extends Vehicule {
    public Voiture(String marque, int vitesseMax) {
        super(marque, vitesseMax);
    }
    
    @Override
    public String typeCarburant() { return "Essence/Diesel"; }
}

class VoitureElectrique extends Vehicule {
    private int autonomie;
    
    public VoitureElectrique(String marque, int vitesseMax, int autonomie) {
        super(marque, vitesseMax);
        this.autonomie = autonomie;
    }
    
    @Override
    public String typeCarburant() { return "Électrique (" + autonomie + "km)"; }
}

public class Main {
    public static void main(String[] args) {
        Vehicule[] parc = {
            new Voiture("Toyota", 180),
            new VoitureElectrique("Tesla", 250, 500),
            new VoitureElectrique("Renault", 150, 300),
        };
        
        for (Vehicule v : parc) {
            v.afficher();
        }
    }
}`,
          expectedOutput: `Toyota | 180 km/h | Essence/Diesel\nTesla | 250 km/h | Électrique (500km)\nRenault | 150 km/h | Électrique (300km)`,
          hint: 'Crée une hiérarchie Vehicule → Voiture et VoitureElectrique avec polymorphisme.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'java-collections',
      title: 'Collections et interfaces',
      description: 'ArrayList, HashMap et interfaces en Java',
      lessons: [
        {
          id: 'java-collections-basic',
          title: 'ArrayList et HashMap',
          description: 'Utilise les collections Java pour stocker et manipuler des données.',
          content: `## Collections Java

**ArrayList — liste dynamique :**
\`\`\`java
import java.util.*;

ArrayList<String> liste = new ArrayList<>();
liste.add("Python");
liste.add("Java");
Collections.sort(liste);
System.out.println(liste);
\`\`\`

**HashMap — paires clé/valeur :**
\`\`\`java
HashMap<String, Integer> scores = new HashMap<>();
scores.put("Alice", 95);
scores.put("Bob", 72);
System.out.println(scores.get("Alice")); // 95
for (Map.Entry<String, Integer> e : scores.entrySet()) {
    System.out.println(e.getKey() + ": " + e.getValue());
}
\`\`\``,
          code: `import java.util.*;

public class Main {
    public static void main(String[] args) {
        ArrayList<String> langages = new ArrayList<>();
        langages.add("Python");
        langages.add("Java");
        langages.add("JavaScript");
        langages.add("C");
        Collections.sort(langages);
        System.out.println("Langages : " + langages);

        HashMap<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 72);
        scores.put("Charlie", 88);

        String meilleur = Collections.max(scores.entrySet(),
            Map.Entry.comparingByValue()).getKey();
        System.out.println("Meilleur : " + meilleur + " (" + scores.get(meilleur) + "/100)");

        for (Map.Entry<String, Integer> e : new TreeMap<>(scores).entrySet()) {
            System.out.printf("%s : %d/100%n", e.getKey(), e.getValue());
        }
    }
}`,
          expectedOutput: `Langages : [C, Java, JavaScript, Python]\nMeilleur : Alice (95/100)\nAlice : 95/100\nBob : 72/100\nCharlie : 88/100`,
          hint: 'Crée une ArrayList de langages triée et une HashMap de scores, puis trouve le meilleur score.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'java-interfaces',
          title: 'Interfaces Java',
          description: 'Crée et implémente une interface avec plusieurs classes.',
          content: `## Interfaces en Java

Une interface définit un contrat que les classes doivent respecter.

\`\`\`java
interface Animal {
    String cri();
    default String description() {
        return "Je suis un animal qui crie : " + cri();
    }
}

class Chien implements Animal {
    public String cri() { return "Woof !"; }
}

class Chat implements Animal {
    public String cri() { return "Miaou !"; }
}
\`\`\``,
          code: `interface Forme {
    double aire();
    double perimetre();
    default String description() {
        return String.format("Aire=%.2f, Périmètre=%.2f", aire(), perimetre());
    }
}

class Cercle implements Forme {
    private double r;
    Cercle(double r) { this.r = r; }
    public double aire() { return Math.PI * r * r; }
    public double perimetre() { return 2 * Math.PI * r; }
    public String toString() { return "Cercle(r=" + r + ")"; }
}

class Rectangle implements Forme {
    private double l, h;
    Rectangle(double l, double h) { this.l = l; this.h = h; }
    public double aire() { return l * h; }
    public double perimetre() { return 2 * (l + h); }
    public String toString() { return "Rectangle(" + l + "x" + h + ")"; }
}

public class Main {
    public static void main(String[] args) {
        Forme[] formes = { new Cercle(5), new Rectangle(4, 6) };
        for (Forme f : formes) {
            System.out.println(f + " → " + f.description());
        }
    }
}`,
          expectedOutput: `Cercle(r=5.0) → Aire=78.54, Périmètre=31.42\nRectangle(4.0x6.0) → Aire=24.00, Périmètre=20.00`,
          hint: 'Crée une interface Forme avec aire() et perimetre(), puis implémente Cercle et Rectangle.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'java-course-intro',
      title: 'Introduction à Java',
      content: `# Java — Le guide complet

## Histoire

Créé par James Gosling chez Sun Microsystems en 1995. Racheté par Oracle en 2010. Toujours l'un des langages les plus utilisés en entreprise.

## Philosophie : "Write Once, Run Anywhere"

La JVM (Java Virtual Machine) permet à un programme compilé de s'exécuter sur n'importe quel OS sans recompilation.

\`\`\`
Code Java → Compilateur (javac) → Bytecode (.class) → JVM → Exécution
\`\`\`

## Points forts

- **Typage statique fort** : erreurs détectées à la compilation
- **Gestion automatique de la mémoire** : Garbage Collector
- **Écosystème riche** : Maven, Spring, Hibernate...
- **Android** : Java/Kotlin sont les langages officiels`,
    },
  ],
};

// SQL curriculum
const sqlCurriculum: LanguageCurriculum = {
  language: {
    id: 'sql',
    name: 'SQL',
    icon: '🗄️',
    color: '#10B981',
    bgColor: '#ECFDF5',
    description: 'Le langage des bases de données relationnelles. Indispensable pour tout développeur.',
    usedFor: ['Bases de données', 'Analyse', 'Backend', 'Data Engineering', 'BI'],
  },
  chapters: [
    {
      id: 'sql-basics',
      title: 'SQL fondamental',
      description: 'SELECT, WHERE, ORDER BY, GROUP BY',
      lessons: [
        {
          id: 'sql-select',
          title: 'SELECT — lire des données',
          description: 'SELECT est la commande la plus utilisée en SQL. Elle lit des données depuis une table.',
          content: `## SELECT

\`\`\`sql
-- Tout sélectionner
SELECT * FROM employes;

-- Colonnes spécifiques
SELECT nom, prenom, salaire FROM employes;

-- Alias
SELECT nom AS "Nom", salaire * 12 AS "Salaire annuel"
FROM employes;

-- Distinct
SELECT DISTINCT departement FROM employes;

-- Limiter les résultats
SELECT * FROM employes LIMIT 10;
\`\`\`

**WHERE — filtrer :**
\`\`\`sql
SELECT * FROM employes
WHERE salaire > 50000
  AND departement = 'Informatique'
  AND NOT anciennete < 2;
\`\`\`

**LIKE — recherche dans texte :**
\`\`\`sql
SELECT * FROM employes WHERE nom LIKE 'Mar%';  -- commence par Mar
SELECT * FROM employes WHERE email LIKE '%@gmail.com';
\`\`\``,
          code: `-- Supposons cette table :
-- employes(id, nom, prenom, salaire, departement, annee_embauche)

-- 1. Tous les employés du département IT triés par salaire
SELECT nom, prenom, salaire
FROM employes
WHERE departement = 'Informatique'
ORDER BY salaire DESC;

-- 2. Employés embauchés après 2020
SELECT nom, prenom, annee_embauche
FROM employes
WHERE annee_embauche > 2020
ORDER BY annee_embauche;

-- 3. Recherche par nom
SELECT * FROM employes
WHERE nom LIKE 'D%'
LIMIT 5;`,
          expectedOutput: `Marchand|Félix|6000.0\nDurand|Clara|5200.0\nMartin|Alice|4500.0\n---\nDupont|Bob|2021\nBernard|David|2022\n---\nDurand|Clara\nDupont|Bob`,
          hint: 'Écris des requêtes SELECT avec WHERE, ORDER BY et LIKE.',
          xp: 15,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'sql-joins',
          title: 'JOINs — relier des tables',
          description: 'Les JOINs permettent de combiner des données de plusieurs tables.',
          content: `## Types de JOIN

\`\`\`sql
-- INNER JOIN : lignes avec correspondance dans les 2 tables
SELECT e.nom, d.nom AS département
FROM employes e
INNER JOIN departements d ON e.dept_id = d.id;

-- LEFT JOIN : toutes les lignes de gauche + correspondances
SELECT e.nom, p.titre AS projet
FROM employes e
LEFT JOIN projets p ON e.id = p.employe_id;

-- RIGHT JOIN : toutes les lignes de droite
-- FULL OUTER JOIN : toutes les lignes des 2 tables

-- Jointure multiple
SELECT e.nom, d.nom, p.titre
FROM employes e
JOIN departements d ON e.dept_id = d.id
JOIN projets p ON e.id = p.employe_id
WHERE p.statut = 'actif';
\`\`\``,
          code: `-- Exercice de JOIN complexe
-- Tables: commandes(id, client_id, date, total)
--         clients(id, nom, ville)
--         produits_commandes(commande_id, produit_id, quantite)
--         produits(id, nom, prix)

-- Top 5 clients par CA total
SELECT 
    c.nom,
    c.ville,
    COUNT(co.id) AS nb_commandes,
    SUM(co.total) AS ca_total
FROM clients c
LEFT JOIN commandes co ON c.id = co.client_id
GROUP BY c.id, c.nom, c.ville
ORDER BY ca_total DESC
LIMIT 5;`,
          expectedOutput: `Durand SA|Paris|2|4700.0\nMartin Inc|Lyon|1|800.0\nPetit SARL|Bordeaux|0|`,
          hint: 'Écris une requête avec JOIN, GROUP BY, COUNT et SUM.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'sql-aggregation',
          title: 'GROUP BY et agrégations',
          description: 'Regroupe les données par département et calcule des statistiques.',
          content: `## GROUP BY et fonctions d'agrégation

\`\`\`sql
SELECT departement,
    COUNT(*) AS nb,
    AVG(salaire) AS moy,
    MAX(salaire) AS max
FROM employes
GROUP BY departement
HAVING COUNT(*) > 1  -- filtre après regroupement
ORDER BY moy DESC;
\`\`\`

**Fonctions d'agrégation :**
| Fonction | Résultat |
|----------|---------|
| COUNT(*) | Nombre de lignes |
| SUM(col) | Somme |
| AVG(col) | Moyenne |
| MAX/MIN  | Maximum/Minimum |`,
          code: `-- Statistiques par département
SELECT
    departement,
    COUNT(*) AS nb_employes,
    ROUND(AVG(salaire), 0) AS salaire_moyen,
    MAX(salaire) AS salaire_max,
    MIN(annee_embauche) AS premiere_embauche
FROM employes
GROUP BY departement
ORDER BY salaire_moyen DESC;`,
          expectedOutput: `Informatique|3|5233.0|6000.0|2017\nRH|2|3950.0|4100.0|2020\nMarketing|2|3350.0|3500.0|2021`,
          hint: 'Utilise GROUP BY departement avec COUNT, AVG arrondi, MAX et MIN.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'sql-course-intro',
      title: 'Introduction à SQL',
      content: `# SQL — Le guide complet

## Qu'est-ce que SQL ?

SQL (Structured Query Language) est le langage standard pour interagir avec les bases de données relationnelles. Créé dans les années 70 par IBM, il est toujours incontournable.

## Systèmes de bases de données populaires

| SGBD | Usage |
|------|-------|
| PostgreSQL | Open-source, avancé |
| MySQL/MariaDB | Web, LAMP |
| SQLite | Mobile, embarqué |
| SQL Server | Enterprise Microsoft |
| Oracle | Enterprise |

## Les 4 opérations CRUD

- **C**reate → INSERT
- **R**ead → SELECT
- **U**pdate → UPDATE
- **D**elete → DELETE`,
    },
  ],
};

// TypeScript curriculum
const typescriptCurriculum: LanguageCurriculum = {
  language: {
    id: 'typescript',
    name: 'TypeScript',
    icon: '🔷',
    color: '#3B82F6',
    bgColor: '#EFF6FF',
    description: 'JavaScript avec des types statiques. Rend le code plus sûr et plus maintenable.',
    usedFor: ['Web Frontend', 'Backend', 'React', 'Node.js', 'APIs'],
  },
  chapters: [
    {
      id: 'ts-basics',
      title: 'Types et interfaces',
      description: 'Le système de types TypeScript',
      lessons: [
        {
          id: 'ts-types',
          title: 'Types de base',
          description: 'TypeScript ajoute un système de types statiques à JavaScript.',
          content: `## Types en TypeScript

\`\`\`typescript
// Types primitifs
let age: number = 25;
let nom: string = "Alice";
let actif: boolean = true;

// Tableaux
let notes: number[] = [15, 18, 12];
let noms: Array<string> = ["Alice", "Bob"];

// Tuple
let coordonnées: [number, number] = [48.8566, 2.3522];

// Union
let id: number | string = "abc123";

// Literal types
type Direction = "nord" | "sud" | "est" | "ouest";

// any, unknown, never
let inconnu: unknown = getData();
if (typeof inconnu === "string") {
    console.log(inconnu.toUpperCase()); // TS sait que c'est string
}
\`\`\``,
          code: `// Système de types avancé

type Utilisateur = {
    id: number;
    nom: string;
    email: string;
    role: "admin" | "user" | "moderateur";
    creeLe: Date;
};

type UtilisateurPartiel = Partial<Utilisateur>;
type UtilisateurLecture = Readonly<Utilisateur>;

function creerUtilisateur(
    nom: string,
    email: string,
    role: Utilisateur["role"] = "user"
): Utilisateur {
    return {
        id: Math.floor(Math.random() * 1000),
        nom,
        email,
        role,
        creeLe: new Date(),
    };
}

const alice = creerUtilisateur("Alice", "alice@example.com", "admin");
console.log(alice);

// Générique
function premier<T>(tableau: T[]): T | undefined {
    return tableau[0];
}

console.log(premier([1, 2, 3]));       // number
console.log(premier(["a", "b", "c"])); // string`,
          hint: 'Crée un type Utilisateur, une fonction typée et un générique.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'ts-advanced',
      title: 'Génériques et utilitaires',
      description: 'Fonctions génériques et types utilitaires TypeScript',
      lessons: [
        {
          id: 'ts-generics',
          title: 'Fonctions génériques',
          description: 'Écris des fonctions qui fonctionnent avec n\'importe quel type.',
          content: `## Génériques TypeScript

\`\`\`typescript
// Sans générique → perd le type
function premier(arr: any[]): any { return arr[0]; }

// Avec générique → type préservé
function premier<T>(arr: T[]): T | undefined { return arr[0]; }

const n = premier([1, 2, 3]);     // number
const s = premier(["a", "b"]);    // string
\`\`\`

**Contraintes :**
\`\`\`typescript
function plus_long<T extends { length: number }>(a: T, b: T): T {
    return a.length >= b.length ? a : b;
}
console.log(plus_long("chat", "chien")); // "chien"
console.log(plus_long([1,2], [1,2,3])); // [1,2,3]
\`\`\``,
          code: `function filtrer<T>(arr: T[], pred: (x: T) => boolean): T[] {
    return arr.filter(pred);
}

function transformer<T, U>(arr: T[], fn: (x: T) => U): U[] {
    return arr.map(fn);
}

function grouper<T>(arr: T[], cle: (x: T) => string): Record<string, T[]> {
    return arr.reduce((acc, item) => {
        const k = cle(item);
        acc[k] = [...(acc[k] || []), item];
        return acc;
    }, {} as Record<string, T[]>);
}

const nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const pairs = filtrer(nombres, n => n % 2 === 0);
const carrés = transformer(pairs, n => n * n);
console.log("Pairs :", pairs);
console.log("Carrés des pairs :", carrés);

interface Produit { nom: string; categorie: string; prix: number; }
const produits: Produit[] = [
    { nom: "Laptop", categorie: "Informatique", prix: 999 },
    { nom: "Souris", categorie: "Informatique", prix: 29 },
    { nom: "Stylo", categorie: "Bureau", prix: 3 },
];
const parCategorie = grouper(produits, p => p.categorie);
console.log("Catégories :", Object.keys(parCategorie));`,
          expectedOutput: `Pairs : [ 2, 4, 6, 8, 10 ]\nCarrés des pairs : [ 4, 16, 36, 64, 100 ]\nCatégories : [ 'Informatique', 'Bureau' ]`,
          hint: 'Crée 3 fonctions génériques : filtrer<T>, transformer<T,U> et grouper<T>.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'ts-utility-types',
          title: 'Types utilitaires',
          description: 'Utilise Partial, Required, Pick, Omit et Record.',
          content: `## Types utilitaires TypeScript

\`\`\`typescript
interface User { id: number; nom: string; email: string; age: number; }

Partial<User>     // tous les champs optionnels
Required<User>    // tous les champs requis
Pick<User, 'id' | 'nom'>   // garde seulement id et nom
Omit<User, 'age'>          // retire age
Record<string, number>     // objet clé→valeur

// Exemple
function mettreAJour(user: User, maj: Partial<User>): User {
    return { ...user, ...maj };
}
\`\`\``,
          code: `interface Employe {
    id: number;
    nom: string;
    email: string;
    salaire: number;
    departement: string;
}

type EmployePublic = Omit<Employe, 'salaire'>;
type EmployeResume = Pick<Employe, 'nom' | 'departement'>;
type MiseAJour = Partial<Omit<Employe, 'id'>>;

function mettreAJour(emp: Employe, maj: MiseAJour): Employe {
    return { ...emp, ...maj };
}

const alice: Employe = { id: 1, nom: "Alice", email: "alice@ex.com", salaire: 4500, departement: "IT" };
const alicePublic: EmployePublic = { id: alice.id, nom: alice.nom, email: alice.email, departement: alice.departement };
const aliceResume: EmployeResume = { nom: alice.nom, departement: alice.departement };

console.log("Public :", alicePublic);
console.log("Résumé :", aliceResume);

const aliceMaj = mettreAJour(alice, { salaire: 5000, departement: "Lead" });
console.log("Après MAJ :", aliceMaj.nom, "—", aliceMaj.salaire, "€,", aliceMaj.departement);`,
          hint: 'Crée les types EmployePublic (Omit salaire), EmployeResume (Pick nom+departement) et MiseAJour (Partial sans id).',
          xp: 40,
          difficulty: 'advanced',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'ts-course-intro',
      title: 'Introduction à TypeScript',
      content: `# TypeScript — Le guide complet

## Qu'est-ce que TypeScript ?

TypeScript est un **superset de JavaScript** développé par Microsoft (2012). Il ajoute le typage statique optionnel et d'autres fonctionnalités à JS. Tout code JS valide est du TS valide.

## Avantages

- **Détection d'erreurs à la compilation** avant l'exécution
- **Autocomplétion** et refactoring plus sûr dans les IDEs
- **Documentation intégrée** via les types
- **Scalabilité** pour les grands projets

## Compilation

\`\`\`bash
npm install -g typescript
tsc fichier.ts  # compile en fichier.js
tsc --watch     # recompile automatiquement
\`\`\``,
    },
  ],
};

// Rust curriculum
const rustCurriculum: LanguageCurriculum = {
  language: {
    id: 'rust',
    name: 'Rust',
    icon: '🦀',
    color: '#F97316',
    bgColor: '#FFF7ED',
    description: 'Performances de C avec la sécurité mémoire. Le futur des systèmes.',
    usedFor: ['Systèmes', 'WebAssembly', 'Embarqué', 'CLI', 'Blockchain'],
  },
  chapters: [
    {
      id: 'rust-basics',
      title: 'Fondamentaux Rust',
      description: 'Ownership, borrowing, types',
      lessons: [
        {
          id: 'rust-ownership',
          title: 'Ownership — le concept clé',
          description: 'L\'ownership est ce qui rend Rust unique : sécurité mémoire sans garbage collector.',
          content: `## Ownership en Rust

**3 règles fondamentales :**
1. Chaque valeur a **un seul owner**
2. Quand l'owner sort du scope → la valeur est libérée
3. Il ne peut y avoir qu'**un owner à la fois**

\`\`\`rust
fn main() {
    let s1 = String::from("hello");
    let s2 = s1;  // s1 est "moved" dans s2
    // println!("{}", s1);  // ERREUR : s1 n'est plus valide !
    println!("{}", s2);  // OK
    
    // Clone pour copier
    let s3 = s2.clone();
    println!("{} {}", s2, s3);  // Les deux valides
}
\`\`\`

**Borrowing — emprunter sans prendre :**
\`\`\`rust
fn calculer_longueur(s: &String) -> usize {
    s.len()  // s est empruntée, pas déplacée
}

let s = String::from("hello");
let len = calculer_longueur(&s);  // & = référence
println!("{} a {} caractères", s, len);  // s toujours valide
\`\`\``,
          code: `fn plus_longue<'a>(s1: &'a str, s2: &'a str) -> &'a str {
    if s1.len() > s2.len() { s1 } else { s2 }
}

fn inverser(s: String) -> String {
    s.chars().rev().collect()
}

fn main() {
    let s1 = String::from("bonjour");
    let résultat;
    {
        let s2 = String::from("monde !");
        résultat = plus_longue(&s1, &s2);
        println!("Plus longue : {}", résultat);
    }
    
    let inversé = inverser(s1); // s1 moved ici
    println!("Inversé : {}", inversé);
    
    // Pas de null en Rust — Option<T>
    let nombre: Option<i32> = Some(42);
    if let Some(n) = nombre {
        println!("Nombre : {}", n);
    }
}`,
          expectedOutput: `Plus longue : monde !\nInversé : ruojnob\nNombre : 42`,
          hint: 'Utilise les références, lifetimes et Option<T> en Rust.',
          xp: 40,
          difficulty: 'advanced',
          type: 'lesson',
        },
      ],
    },
    {
      id: 'rust-practical',
      title: 'Enums, Vec et itérateurs',
      description: 'Enums avec match, Vec et méthodes fonctionnelles',
      lessons: [
        {
          id: 'rust-enums',
          title: 'Enums et pattern matching',
          description: 'Utilise les enums Rust avec match pour gérer différents cas.',
          content: `## Enums en Rust

\`\`\`rust
#[derive(Debug)]
enum Direction { Nord, Sud, Est, Ouest }

fn avancer(d: &Direction) -> &str {
    match d {
        Direction::Nord => "↑",
        Direction::Sud => "↓",
        Direction::Est => "→",
        Direction::Ouest => "←",
    }
}
\`\`\`

**Option<T> — valeur optionnelle :**
\`\`\`rust
fn diviser(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 { None } else { Some(a / b) }
}
match diviser(10.0, 2.0) {
    Some(r) => println!("Résultat : {}", r),
    None    => println!("Division par zéro !"),
}
\`\`\``,
          code: `#[derive(Debug)]
enum Saison { Printemps, Ete, Automne, Hiver }

fn temperature(s: &Saison) -> f32 {
    match s {
        Saison::Printemps => 15.0,
        Saison::Ete => 28.0,
        Saison::Automne => 12.0,
        Saison::Hiver => 3.0,
    }
}

fn diviser(a: f64, b: f64) -> Option<f64> {
    if b == 0.0 { None } else { Some(a / b) }
}

fn main() {
    let saisons = [Saison::Printemps, Saison::Ete, Saison::Automne, Saison::Hiver];
    for s in &saisons {
        println!("{:?} : {:.1}°C", s, temperature(s));
    }

    for (a, b) in [(10.0, 2.0), (7.0, 0.0)] {
        match diviser(a, b) {
            Some(r) => println!("{} / {} = {}", a, b, r),
            None => println!("{} / {} = erreur !", a, b),
        }
    }
}`,
          expectedOutput: `Printemps : 15.0°C\nEte : 28.0°C\nAutomne : 12.0°C\nHiver : 3.0°C\n10 / 2 = 5\n7 / 0 = erreur !`,
          hint: 'Crée un enum Saison, une fonction temperature() avec match, et une fonction diviser() qui retourne Option<f64>.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'rust-iterators',
          title: 'Vec et itérateurs',
          description: 'Manipule des vecteurs avec les méthodes fonctionnelles de Rust.',
          content: `## Itérateurs Rust

\`\`\`rust
let v: Vec<i32> = (1..=5).collect();
// [1, 2, 3, 4, 5]

// filter — garde si condition
let pairs: Vec<i32> = v.iter()
    .filter(|&&x| x % 2 == 0)
    .cloned().collect();

// map — transforme
let carrés: Vec<i32> = v.iter()
    .map(|&x| x * x)
    .collect();

// fold — accumule
let somme: i32 = v.iter().sum();
\`\`\``,
          code: `fn main() {
    let nombres: Vec<i32> = (1..=10).collect();

    let pairs: Vec<i32> = nombres.iter()
        .filter(|&&x| x % 2 == 0)
        .cloned().collect();

    let carrés: Vec<i32> = nombres.iter()
        .map(|&x| x * x)
        .collect();

    let somme: i32 = nombres.iter().sum();
    let max = nombres.iter().max().unwrap();

    println!("Nombres : {:?}", nombres);
    println!("Pairs : {:?}", pairs);
    println!("Carrés : {:?}", carrés);
    println!("Somme : {}, Max : {}", somme, max);
}`,
          expectedOutput: `Nombres : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]\nPairs : [2, 4, 6, 8, 10]\nCarrés : [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\nSomme : 55, Max : 10`,
          hint: 'Utilise .filter(), .map() et .sum() sur un vecteur d\'entiers 1 à 10.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
      ],
    },
  ],
  courseContent: [
    {
      id: 'rust-course-intro',
      title: 'Introduction à Rust',
      content: `# Rust — Le guide complet

## Pourquoi Rust ?

Rust combine les **performances du C/C++** avec la **sécurité mémoire** sans garbage collector. Élu "langage le plus apprécié" sur Stack Overflow 8 années consécutives.

## Le problème que Rust résout

En C/C++, les erreurs mémoire (dangling pointers, buffer overflows, data races) causent des bugs critiques et des failles de sécurité. Rust les rend **impossibles à la compilation**.

## Installation

\`\`\`bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
rustc --version
cargo --version  # gestionnaire de paquets
\`\`\``,
    },
  ],
};

export const allCurriculums: LanguageCurriculum[] = [
  pythonCurriculum,
  javascriptCurriculum,
  typescriptCurriculum,
  javaCurriculum,
  cCurriculum,
  sqlCurriculum,
  rustCurriculum,
];

export const getCurriculum = (langId: string) =>
  allCurriculums.find(c => c.language.id === langId);

export const getAllLanguages = () => allCurriculums.map(c => c.language);
