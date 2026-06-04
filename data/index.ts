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
    {
      id: 'c-strings-structs',
      title: 'Chaînes et structures',
      description: 'Manipulation de chaînes et définition de structs',
      lessons: [
        {
          id: 'c-strings',
          title: 'Chaînes de caractères',
          description: 'Manipule les chaînes en C avec string.h.',
          content: `## Chaînes en C

En C, une chaîne est un tableau de \`char\` terminé par \`'\\0'\`.

\`\`\`c
#include <string.h>
char s[] = "Bonjour";
printf("%d\\n", strlen(s));     // 7
strcpy(dest, src);             // copie
strcat(dest, src);             // concatène
strcmp(s1, s2);                // compare (0 = égaux)
// Recherche
char *p = strchr(s, 'o');      // pointeur vers 'o'
\`\`\``,
          code: `#include <stdio.h>
#include <string.h>
#include <ctype.h>

void majuscules(char *s) {
    for (int i = 0; s[i]; i++) s[i] = toupper(s[i]);
}

int compter_voyelles(const char *s) {
    int n = 0;
    for (int i = 0; s[i]; i++)
        if (strchr("aeiouAEIOU", s[i])) n++;
    return n;
}

int main() {
    char phrase[] = "Bonjour le Monde";
    printf("Longueur : %d\\n", (int)strlen(phrase));
    printf("Voyelles : %d\\n", compter_voyelles(phrase));

    char copie[50];
    strcpy(copie, phrase);
    majuscules(copie);
    printf("Majuscules : %s\\n", copie);

    char s1[] = "abc", s2[] = "abd";
    printf("Comparaison : %d\\n", strcmp(s1, s2) < 0 ? -1 : 1);
    return 0;
}`,
          expectedOutput: `Longueur : 16\nVoyelles : 6\nMajuscules : BONJOUR LE MONDE\nComparaison : -1`,
          hint: 'Utilise strlen, strcpy, toupper et strchr pour manipuler les chaînes.',
          xp: 25,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'c-structs',
          title: 'Structures (struct)',
          description: 'Crée des types personnalisés avec struct en C.',
          content: `## Structures en C

\`\`\`c
typedef struct {
    char nom[50];
    int age;
    float salaire;
} Employe;

Employe e = {"Alice", 25, 3500.0};
printf("%s, %d ans\\n", e.nom, e.age);

// Tableau de structs
Employe equipe[3] = {
    {"Alice", 25, 3500}, {"Bob", 30, 4200}
};
\`\`\``,
          code: `#include <stdio.h>
#include <string.h>

typedef struct {
    char nom[30];
    int age;
    float note;
} Etudiant;

void afficher(Etudiant e) {
    printf("%-15s %d ans  %.1f/20\\n", e.nom, e.age, e.note);
}

float moyenne(Etudiant *etudiants, int n) {
    float total = 0;
    for (int i = 0; i < n; i++) total += etudiants[i].note;
    return total / n;
}

int main() {
    Etudiant classe[] = {
        {"Alice", 20, 16.5f},
        {"Bob", 21, 12.0f},
        {"Charlie", 19, 18.5f},
        {"Diana", 22, 14.0f},
    };
    int n = 4;

    printf("Classe :\\n");
    for (int i = 0; i < n; i++) afficher(classe[i]);
    printf("Moyenne : %.2f/20\\n", moyenne(classe, n));

    // Trouve le meilleur
    Etudiant meilleur = classe[0];
    for (int i = 1; i < n; i++)
        if (classe[i].note > meilleur.note) meilleur = classe[i];
    printf("Meilleur : %s (%.1f)\\n", meilleur.nom, meilleur.note);
    return 0;
}`,
          expectedOutput: `Classe :\nAlice           20 ans  16.5/20\nBob             21 ans  12.0/20\nCharlie         19 ans  18.5/20\nDiana           22 ans  14.0/20\nMoyenne : 15.25/20\nMeilleur : Charlie (18.5)`,
          hint: 'Définis une struct Etudiant, affiche le tableau, calcule la moyenne et trouve le meilleur.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'c-sorting',
          title: 'Algorithmes de tri',
          description: 'Implémente le tri à bulles et le tri rapide en C.',
          content: `## Tri en C

**Tri à bulles :**
\`\`\`c
void bulles(int arr[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1]) {
                int tmp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tmp;
            }
}
\`\`\`

**qsort (bibliothèque standard) :**
\`\`\`c
#include <stdlib.h>
int comparer(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}
qsort(arr, n, sizeof(int), comparer);
\`\`\``,
          code: `#include <stdio.h>
#include <stdlib.h>

void afficher(int arr[], int n) {
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\\n");
}

void tri_bulles(int arr[], int n) {
    for (int i = 0; i < n-1; i++)
        for (int j = 0; j < n-i-1; j++)
            if (arr[j] > arr[j+1]) {
                int tmp = arr[j]; arr[j] = arr[j+1]; arr[j+1] = tmp;
            }
}

int comparer(const void *a, const void *b) { return (*(int*)a - *(int*)b); }

int main() {
    int arr1[] = {64, 25, 12, 22, 11};
    int arr2[] = {64, 25, 12, 22, 11};
    int n = 5;

    printf("Avant : "); afficher(arr1, n);
    tri_bulles(arr1, n);
    printf("Bulles : "); afficher(arr1, n);

    qsort(arr2, n, sizeof(int), comparer);
    printf("qsort  : "); afficher(arr2, n);
    return 0;
}`,
          expectedOutput: `Avant : 64 25 12 22 11 \nBulles : 11 12 22 25 64 \nqsort  : 11 12 22 25 64 `,
          hint: 'Implémente tri_bulles() avec deux boucles imbriquées, puis utilise qsort de stdlib.h.',
          xp: 35,
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
    {
      id: 'java-advanced',
      title: 'Java avancé',
      description: 'Streams, lambdas, exceptions, Optional et String',
      lessons: [
        {
          id: 'java-strings',
          title: 'Manipulation de chaînes',
          description: 'Utilise les méthodes de String et StringBuilder.',
          content: `## Strings en Java

\`\`\`java
String s = "Bonjour le Monde";
s.length()          // 17
s.toUpperCase()     // BONJOUR LE MONDE
s.contains("le")    // true
s.replace("le", "THE")
s.split(" ")        // tableau ["Bonjour","le","Monde"]
s.trim()            // supprime espaces
String.format("%s a %d ans", "Alice", 25)

// StringBuilder pour concaténer
StringBuilder sb = new StringBuilder();
sb.append("Hello").append(", ").append("World");
\`\`\``,
          code: `public class Main {
    public static void main(String[] args) {
        String phrase = "  Bonjour le Monde !  ";
        System.out.println(phrase.trim());
        System.out.println(phrase.trim().toUpperCase());
        System.out.printf("Longueur : %d%n", phrase.trim().length());

        String[] mots = phrase.trim().split("\\\\s+");
        System.out.printf("Mots : %d%n", mots.length);

        // Vérifications
        System.out.println(phrase.trim().startsWith("Bonjour"));
        System.out.println(phrase.trim().contains("Monde"));

        // StringBuilder
        StringBuilder sb = new StringBuilder();
        for (String mot : mots) {
            sb.append(mot.charAt(0));
        }
        System.out.println("Initiales : " + sb);

        // Inverser
        String inv = new StringBuilder(phrase.trim()).reverse().toString();
        System.out.println("Inversé : " + inv);
    }
}`,
          expectedOutput: `Bonjour le Monde !\nBONJOUR LE MONDE !\nLongueur : 18\nMots : 4\ntrue\ntrue\nInitiales : BlM!\nInversé : ! ednoM el ruojnoB`,
          hint: 'Utilise trim, toUpperCase, split, startsWith, StringBuilder et reverse.',
          xp: 20,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'java-exceptions',
          title: 'Gestion des exceptions',
          description: 'Crée et gère des exceptions personnalisées en Java.',
          content: `## Exceptions en Java

\`\`\`java
// Exception personnalisée
class MonException extends Exception {
    public MonException(String msg) { super(msg); }
}

// try-catch-finally
try {
    if (x < 0) throw new MonException("Valeur négative");
    // ...
} catch (MonException e) {
    System.out.println("Erreur : " + e.getMessage());
} catch (Exception e) {
    System.out.println("Erreur générale : " + e.getMessage());
} finally {
    System.out.println("Toujours exécuté");
}
\`\`\``,
          code: `class SoldeInsuffisantException extends Exception {
    private double solde;
    public SoldeInsuffisantException(double solde, double montant) {
        super(String.format("Solde %.0f€ insuffisant pour retirer %.0f€", solde, montant));
        this.solde = solde;
    }
    public double getSolde() { return solde; }
}

class Compte {
    private String nom;
    private double solde;

    Compte(String nom, double solde) { this.nom = nom; this.solde = solde; }

    void retirer(double montant) throws SoldeInsuffisantException {
        if (montant > solde) throw new SoldeInsuffisantException(solde, montant);
        solde -= montant;
        System.out.printf("%s : retrait %.0f€ → solde %.0f€%n", nom, montant, solde);
    }
}

public class Main {
    public static void main(String[] args) {
        Compte c = new Compte("Alice", 1000);
        double[] retraits = {200, 500, 400};
        for (double montant : retraits) {
            try {
                c.retirer(montant);
            } catch (SoldeInsuffisantException e) {
                System.out.println("Refus : " + e.getMessage());
            }
        }
    }
}`,
          expectedOutput: `Alice : retrait 200€ → solde 800€\nAlice : retrait 500€ → solde 300€\nRefus : Solde 300€ insuffisant pour retirer 400€`,
          hint: 'Crée SoldeInsuffisantException, lance-la dans retirer() et capture-la dans main.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'java-streams',
          title: 'Streams et lambdas',
          description: 'Utilise l\'API Stream de Java 8+ pour traiter des collections.',
          content: `## Streams Java

\`\`\`java
import java.util.*;
import java.util.stream.*;

List<Integer> nums = List.of(1,2,3,4,5,6,7,8,9,10);

// filter + map + collect
List<Integer> pairs = nums.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .collect(Collectors.toList());

// reduce
int somme = nums.stream().reduce(0, Integer::sum);

// sorted + distinct + limit
nums.stream().sorted().distinct().limit(5).forEach(System.out::println);
\`\`\``,
          code: `import java.util.*;
import java.util.stream.*;

public class Main {
    public static void main(String[] args) {
        List<String> noms = List.of("Alice","Bob","Charlie","Diana","Eve","Frank");

        // Filtrer et transformer
        List<String> longs = noms.stream()
            .filter(n -> n.length() > 4)
            .map(String::toUpperCase)
            .sorted()
            .collect(Collectors.toList());
        System.out.println("Longs : " + longs);

        // Statistiques
        IntSummaryStatistics stats = noms.stream()
            .mapToInt(String::length)
            .summaryStatistics();
        System.out.printf("Min: %d, Max: %d, Moy: %.1f%n",
            stats.getMin(), stats.getMax(), stats.getAverage());

        // Grouper
        Map<Integer, List<String>> parLongueur = noms.stream()
            .collect(Collectors.groupingBy(String::length));
        new TreeMap<>(parLongueur).forEach((len, liste) ->
            System.out.println(len + " lettres : " + liste));
    }
}`,
          expectedOutput: `Longs : [ALICE, CHARLIE, DIANA, FRANK]\nMin: 3, Max: 7, Moy: 4.7\n3 lettres : [Bob, Eve]\n5 lettres : [Alice, Diana, Frank]\n7 lettres : [Charlie]`,
          hint: 'Utilise stream().filter().map().collect(), mapToInt().summaryStatistics() et groupingBy().',
          xp: 40,
          difficulty: 'advanced',
          type: 'lesson',
        },
        {
          id: 'java-optional',
          title: 'Optional et null-safety',
          description: 'Utilise Optional pour éviter les NullPointerException.',
          content: `## Optional en Java

\`\`\`java
Optional<String> opt = Optional.of("Bonjour");
Optional<String> vide = Optional.empty();

opt.isPresent()           // true
opt.get()                 // "Bonjour"
opt.orElse("défaut")      // "Bonjour"
vide.orElse("défaut")     // "défaut"
opt.map(String::toUpperCase)  // Optional("BONJOUR")
opt.filter(s -> s.length() > 5) // Optional.empty (longueur=7 > 5, garde)
\`\`\``,
          code: `import java.util.*;

public class Main {
    static Optional<String> chercherEmail(String nom, Map<String, String> annuaire) {
        return Optional.ofNullable(annuaire.get(nom));
    }

    static String domaine(String email) {
        return email.substring(email.indexOf('@') + 1);
    }

    public static void main(String[] args) {
        Map<String, String> annuaire = Map.of(
            "Alice", "alice@gmail.com",
            "Bob", "bob@company.fr"
        );

        String[] cherches = {"Alice", "Charlie", "Bob", "Diana"};

        for (String nom : cherches) {
            String résultat = chercherEmail(nom, annuaire)
                .map(email -> nom + " → " + email + " (" + domaine(email) + ")")
                .orElse(nom + " → introuvable");
            System.out.println(résultat);
        }

        // Chaînage
        Optional<String> premierGmail = annuaire.values().stream()
            .filter(e -> e.endsWith("@gmail.com"))
            .findFirst();
        premierGmail.ifPresent(e -> System.out.println("Premier Gmail : " + e));
    }
}`,
          expectedOutput: `Alice → alice@gmail.com (gmail.com)\nCharlie → introuvable\nBob → bob@company.fr (company.fr)\nDiana → introuvable\nPremier Gmail : alice@gmail.com`,
          hint: 'Retourne Optional.ofNullable() depuis chercherEmail, puis utilise .map().orElse() pour formater.',
          xp: 35,
          difficulty: 'advanced',
          type: 'lesson',
        },
        {
          id: 'java-generics',
          title: 'Génériques Java',
          description: 'Crée des classes et méthodes génériques en Java.',
          content: `## Génériques en Java

\`\`\`java
// Classe générique
class Paire<A, B> {
    private A premier;
    private B second;
    Paire(A a, B b) { premier = a; second = b; }
    A getPremier() { return premier; }
    B getSecond() { return second; }
}

// Méthode générique
static <T extends Comparable<T>> T max(T a, T b) {
    return a.compareTo(b) >= 0 ? a : b;
}
\`\`\``,
          code: `import java.util.*;

class Pile<T> {
    private List<T> elements = new ArrayList<>();

    void empiler(T element) { elements.add(element); }

    T dépiler() {
        if (vide()) throw new NoSuchElementException("Pile vide");
        return elements.remove(elements.size() - 1);
    }

    T sommet() {
        if (vide()) throw new NoSuchElementException("Pile vide");
        return elements.get(elements.size() - 1);
    }

    boolean vide() { return elements.isEmpty(); }
    int taille() { return elements.size(); }
    public String toString() { return elements.toString(); }
}

public class Main {
    static <T extends Comparable<T>> T maximum(List<T> liste) {
        return liste.stream().max(Comparator.naturalOrder()).orElseThrow();
    }

    public static void main(String[] args) {
        Pile<Integer> pile = new Pile<>();
        for (int n : new int[]{5, 2, 8, 1, 9}) pile.empiler(n);
        System.out.println("Pile : " + pile);
        System.out.println("Dépile : " + pile.dépiler());
        System.out.println("Sommet : " + pile.sommet());

        System.out.println("Max entiers : " + maximum(List.of(3, 1, 7, 2, 9)));
        System.out.println("Max strings : " + maximum(List.of("banane","pomme","kiwi")));
    }
}`,
          expectedOutput: `Pile : [5, 2, 8, 1, 9]\nDépile : 9\nSommet : 1\nMax entiers : 9\nMax strings : pomme`,
          hint: 'Crée une classe générique Pile<T> avec empiler/dépiler, et une méthode générique maximum<T extends Comparable<T>>.',
          xp: 40,
          difficulty: 'advanced',
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
    {
      id: 'sql-advanced',
      title: 'SQL avancé',
      description: 'INSERT/UPDATE/DELETE, sous-requêtes et fonctions de fenêtre',
      lessons: [
        {
          id: 'sql-crud',
          title: 'INSERT, UPDATE, DELETE',
          description: 'Modifie les données avec les commandes SQL de base.',
          content: `## Modifier les données

\`\`\`sql
-- INSERT
INSERT INTO employes (id, nom, prenom, salaire, departement, annee_embauche, email, dept_id)
VALUES (8, 'Nouveau', 'Hugo', 3000, 'IT', 2024, 'hugo@co.com', 1);

-- UPDATE
UPDATE employes SET salaire = salaire * 1.1 WHERE departement = 'Informatique';

-- DELETE
DELETE FROM employes WHERE annee_embauche > 2021;

-- Vérifier après
SELECT COUNT(*) FROM employes;
\`\`\``,
          code: `-- Insère un nouvel employé
INSERT INTO employes VALUES (8, 'Nouveau', 'Hugo', 3000, 'Informatique', 2024, 'hugo@codepath.fr', 1);

-- Augmentation de 10% pour l'Informatique
UPDATE employes SET salaire = salaire * 1.1 WHERE departement = 'Informatique';

-- Vérifie les salaires mis à jour
SELECT nom, prenom, ROUND(salaire, 0) AS salaire FROM employes WHERE departement = 'Informatique' ORDER BY salaire DESC;`,
          expectedOutput: `Marchand|Félix|6600.0\nDurand|Clara|5720.0\nMartin|Alice|4950.0\nNouveau|Hugo|3300.0`,
          hint: 'Insère Hugo avec INSERT, applique +10% avec UPDATE WHERE, puis SELECT pour vérifier.',
          xp: 25,
          difficulty: 'beginner',
          type: 'lesson',
        },
        {
          id: 'sql-subqueries',
          title: 'Sous-requêtes',
          description: 'Utilise des sous-requêtes pour des filtres avancés.',
          content: `## Sous-requêtes

\`\`\`sql
-- Dans WHERE
SELECT nom FROM employes
WHERE salaire > (SELECT AVG(salaire) FROM employes);

-- Dans FROM (table dérivée)
SELECT dept, moy FROM (
    SELECT departement AS dept, AVG(salaire) AS moy
    FROM employes GROUP BY departement
) WHERE moy > 4000;

-- EXISTS
SELECT nom FROM employes e
WHERE EXISTS (
    SELECT 1 FROM projets p WHERE p.employe_id = e.id
);
\`\`\``,
          code: `-- Employés avec un salaire supérieur à la moyenne
SELECT nom, prenom, salaire
FROM employes
WHERE salaire > (SELECT AVG(salaire) FROM employes)
ORDER BY salaire DESC;`,
          expectedOutput: `Marchand|Félix|6000.0\nDurand|Clara|5200.0\nMartin|Alice|4500.0`,
          hint: 'Utilise (SELECT AVG(salaire) FROM employes) dans le WHERE pour comparer à la moyenne.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'sql-window',
          title: 'Fonctions de fenêtre',
          description: 'Utilise ROW_NUMBER, RANK et les fonctions de fenêtre.',
          content: `## Fonctions de fenêtre (Window functions)

\`\`\`sql
SELECT nom, salaire,
    RANK() OVER (ORDER BY salaire DESC) AS rang,
    ROUND(AVG(salaire) OVER (), 0) AS moy_globale,
    salaire - AVG(salaire) OVER () AS ecart_moy
FROM employes;
\`\`\`

Contrairement à GROUP BY, les fonctions de fenêtre gardent **toutes les lignes**.`,
          code: `SELECT
    nom,
    departement,
    salaire,
    RANK() OVER (ORDER BY salaire DESC) AS rang_global,
    RANK() OVER (PARTITION BY departement ORDER BY salaire DESC) AS rang_dept,
    ROUND(AVG(salaire) OVER (PARTITION BY departement), 0) AS moy_dept
FROM employes
ORDER BY departement, salaire DESC;`,
          expectedOutput: `Marchand|Informatique|6000.0|1|1|5233.0\nDurand|Informatique|5200.0|3|2|5233.0\nMartin|Informatique|4500.0|5|3|5233.0\nPetit|RH|4100.0|6|1|3950.0\nDupont|RH|3800.0|7|2|3950.0\nMorel|Marketing|3500.0|4|1|3350.0\nBernard|Marketing|3200.0|2|2|3350.0`,
          hint: 'Utilise RANK() OVER (ORDER BY salaire DESC) et RANK() OVER (PARTITION BY departement ORDER BY salaire DESC).',
          xp: 40,
          difficulty: 'advanced',
          type: 'lesson',
        },
        {
          id: 'sql-views',
          title: 'Vues et requêtes complexes',
          description: 'Crée des vues et combine plusieurs opérations SQL.',
          content: `## Vues SQL

Une vue est une requête sauvegardée réutilisable.

\`\`\`sql
CREATE VIEW employes_info AS
SELECT e.nom, e.prenom, e.salaire, d.nom AS dept
FROM employes e
JOIN departements d ON e.dept_id = d.id;

-- Utiliser la vue
SELECT * FROM employes_info WHERE salaire > 4000;

-- Supprimer
DROP VIEW IF EXISTS employes_info;
\`\`\``,
          code: `-- Rapport complet : employés avec leur département et leurs projets
SELECT
    e.nom || ' ' || e.prenom AS employe,
    e.salaire,
    d.nom AS departement,
    COALESCE(p.nom, 'Aucun projet') AS projet
FROM employes e
JOIN departements d ON e.dept_id = d.id
LEFT JOIN projets p ON e.id = p.employe_id
ORDER BY e.salaire DESC
LIMIT 5;`,
          expectedOutput: `Marchand Félix|6000.0|Informatique|CRM\nDurand Clara|5200.0|Informatique|Appli Mobile\nMartin Alice|4500.0|Informatique|Site Web\nPetit Emma|4100.0|RH|Aucun projet\nMorel Grace|3500.0|Marketing|Aucun projet`,
          hint: 'Utilise JOIN pour les départements, LEFT JOIN pour les projets, et COALESCE pour "Aucun projet".',
          xp: 35,
          difficulty: 'advanced',
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
          id: 'ts-classes',
          title: 'Classes TypeScript',
          description: 'Utilise les modificateurs d\'accès, les getters/setters et l\'héritage.',
          content: `## Classes en TypeScript

\`\`\`typescript
class Compte {
    private _solde: number;
    readonly id: string;

    constructor(id: string, solde: number = 0) {
        this.id = id;
        this._solde = solde;
    }

    get solde(): number { return this._solde; }

    deposer(montant: number): void {
        if (montant <= 0) throw new Error("Montant invalide");
        this._solde += montant;
    }
}
\`\`\``,
          code: `abstract class Vehicule {
    protected readonly marque: string;
    protected vitesse: number = 0;

    constructor(marque: string) { this.marque = marque; }

    accelerer(km: number): void { this.vitesse += km; }
    freiner(km: number): void { this.vitesse = Math.max(0, this.vitesse - km); }

    abstract typeMoteur(): string;

    statut(): string {
        return \`\${this.marque} [\${this.typeMoteur()}] — \${this.vitesse} km/h\`;
    }
}

class Voiture extends Vehicule {
    typeMoteur() { return "Essence"; }
}

class Electrique extends Vehicule {
    private autonomie: number;
    constructor(marque: string, autonomie: number) {
        super(marque);
        this.autonomie = autonomie;
    }
    typeMoteur() { return \`Électrique (\${this.autonomie}km)\`; }
}

const v1 = new Voiture("Toyota");
const v2 = new Electrique("Tesla", 500);

v1.accelerer(80); v1.freiner(20);
v2.accelerer(120);

console.log(v1.statut());
console.log(v2.statut());
console.log(v2 instanceof Vehicule);`,
          expectedOutput: `Toyota [Essence] — 60 km/h\nTesla [Électrique (500km)] — 120 km/h\ntrue`,
          hint: 'Crée une classe abstraite Vehicule avec accelerer/freiner, étendue par Voiture et Electrique.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'ts-unions',
          title: 'Unions discriminées',
          description: 'Utilise les unions discriminées pour typer des données hétérogènes.',
          content: `## Unions discriminées

\`\`\`typescript
type Résultat =
    | { statut: "succès"; données: string }
    | { statut: "erreur"; message: string; code: number };

function traiter(r: Résultat): string {
    switch (r.statut) {
        case "succès": return \`OK: \${r.données}\`;
        case "erreur": return \`Erreur \${r.code}: \${r.message}\`;
    }
}
\`\`\``,
          code: `type Forme =
    | { type: "cercle"; rayon: number }
    | { type: "rectangle"; largeur: number; hauteur: number }
    | { type: "triangle"; base: number; hauteur: number };

function aire(f: Forme): number {
    switch (f.type) {
        case "cercle":    return Math.PI * f.rayon ** 2;
        case "rectangle": return f.largeur * f.hauteur;
        case "triangle":  return (f.base * f.hauteur) / 2;
    }
}

function décrire(f: Forme): string {
    switch (f.type) {
        case "cercle":    return \`Cercle r=\${f.rayon}\`;
        case "rectangle": return \`Rectangle \${f.largeur}×\${f.hauteur}\`;
        case "triangle":  return \`Triangle b=\${f.base} h=\${f.hauteur}\`;
    }
}

const formes: Forme[] = [
    { type: "cercle", rayon: 5 },
    { type: "rectangle", largeur: 4, hauteur: 6 },
    { type: "triangle", base: 8, hauteur: 3 },
];

formes.forEach(f => console.log(\`\${décrire(f)} → aire = \${aire(f).toFixed(2)}\`));
const total = formes.reduce((s, f) => s + aire(f), 0);
console.log(\`Aire totale : \${total.toFixed(2)}\`);`,
          expectedOutput: `Cercle r=5 → aire = 78.54\nRectangle 4×6 → aire = 24.00\nTriangle b=8 h=3 → aire = 12.00\nAire totale : 114.54`,
          hint: 'Crée un type union Forme avec 3 variants, puis les fonctions aire() et décrire() avec switch.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'ts-type-guards',
          title: 'Type guards et narrowing',
          description: 'Utilise les type guards pour affiner les types au runtime.',
          content: `## Type guards

\`\`\`typescript
// Type guard avec is
function estString(val: unknown): val is string {
    return typeof val === "string";
}

// Type guard avec instanceof
function estDate(val: unknown): val is Date {
    return val instanceof Date;
}

// Narrowing automatique
function afficher(val: string | number) {
    if (typeof val === "string") {
        console.log(val.toUpperCase()); // TS sait que c'est string
    } else {
        console.log(val.toFixed(2));    // TS sait que c'est number
    }
}
\`\`\``,
          code: `type Primitive = string | number | boolean | null;

function typeOf(val: Primitive): string {
    if (val === null) return "null";
    if (typeof val === "string") return \`string("\${val}")\`;
    if (typeof val === "number") return \`number(\${val})\`;
    if (typeof val === "boolean") return \`boolean(\${val})\`;
    return "inconnu";
}

function somme(valeurs: (string | number)[]): number {
    return valeurs.reduce<number>((acc, v) => {
        if (typeof v === "number") return acc + v;
        const n = parseFloat(v);
        return isNaN(n) ? acc : acc + n;
    }, 0);
}

const vals: Primitive[] = ["bonjour", 42, true, null, 3.14, false];
vals.forEach(v => console.log(typeOf(v)));

const mix: (string | number)[] = [1, "2.5", 3, "abc", "10"];
console.log(\`Somme : \${somme(mix)}\`);`,
          expectedOutput: `string("bonjour")\nnumber(42)\nboolean(true)\nnull\nnumber(3.14)\nboolean(false)\nSomme : 16.5`,
          hint: 'Crée typeOf() avec des type guards, et somme() qui filtre les valeurs convertibles en nombre.',
          xp: 30,
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
    {
      id: 'rust-advanced',
      title: 'Structs, traits et gestion d\'erreurs',
      description: 'Structs avec impl, traits, Result et HashMap',
      lessons: [
        {
          id: 'rust-structs',
          title: 'Structs et impl',
          description: 'Crée des structs avec des méthodes via impl.',
          content: `## Structs en Rust

\`\`\`rust
struct Rectangle {
    largeur: f64,
    hauteur: f64,
}

impl Rectangle {
    // Constructeur
    fn nouveau(l: f64, h: f64) -> Self {
        Rectangle { largeur: l, hauteur: h }
    }
    // Méthode
    fn aire(&self) -> f64 { self.largeur * self.hauteur }
    // Méthode qui modifie
    fn agrandir(&mut self, facteur: f64) {
        self.largeur *= facteur;
        self.hauteur *= facteur;
    }
}
\`\`\``,
          code: `#[derive(Debug)]
struct Etudiant {
    nom: String,
    notes: Vec<f64>,
}

impl Etudiant {
    fn nouveau(nom: &str) -> Self {
        Etudiant { nom: nom.to_string(), notes: Vec::new() }
    }

    fn ajouter_note(&mut self, note: f64) {
        self.notes.push(note);
    }

    fn moyenne(&self) -> f64 {
        if self.notes.is_empty() { return 0.0; }
        self.notes.iter().sum::<f64>() / self.notes.len() as f64
    }

    fn mention(&self) -> &str {
        match self.moyenne() as u32 {
            16..=20 => "Très bien",
            14..=15 => "Bien",
            12..=13 => "Assez bien",
            10..=11 => "Passable",
            _ => "Insuffisant",
        }
    }
}

fn main() {
    let mut alice = Etudiant::nouveau("Alice");
    for note in [16.5, 14.0, 18.0, 15.5] { alice.ajouter_note(note); }
    println!("{} : moy={:.2}, {}", alice.nom, alice.moyenne(), alice.mention());

    let mut bob = Etudiant::nouveau("Bob");
    for note in [9.0, 11.0, 8.5, 10.0] { bob.ajouter_note(note); }
    println!("{} : moy={:.2}, {}", bob.nom, bob.moyenne(), bob.mention());
}`,
          expectedOutput: `Alice : moy=16.00, Très bien\nBob : moy=9.62, Insuffisant`,
          hint: 'Crée struct Etudiant avec Vec<f64> pour les notes, et impl avec moyenne() et mention().',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'rust-traits',
          title: 'Traits',
          description: 'Définis et implémente des traits pour le polymorphisme.',
          content: `## Traits en Rust

\`\`\`rust
trait Aire {
    fn aire(&self) -> f64;
    // Méthode par défaut
    fn est_grand(&self) -> bool { self.aire() > 100.0 }
}

struct Cercle { rayon: f64 }
impl Aire for Cercle {
    fn aire(&self) -> f64 { std::f64::consts::PI * self.rayon.powi(2) }
}

// Paramètre qui implémente un trait
fn afficher_aire(forme: &impl Aire) {
    println!("Aire : {:.2}", forme.aire());
}
\`\`\``,
          code: `trait Describable {
    fn description(&self) -> String;
    fn court(&self) -> String {
        let d = self.description();
        if d.len() > 20 { format!("{}...", &d[..20]) } else { d }
    }
}

struct Livre { titre: String, auteur: String, pages: u32 }
struct Film  { titre: String, duree: u32 }

impl Describable for Livre {
    fn description(&self) -> String {
        format!("\"{}\" par {} ({} pages)", self.titre, self.auteur, self.pages)
    }
}

impl Describable for Film {
    fn description(&self) -> String {
        format!("\"{}\" — {}min", self.titre, self.duree)
    }
}

fn afficher(item: &dyn Describable) {
    println!("{}", item.description());
}

fn main() {
    let items: Vec<Box<dyn Describable>> = vec![
        Box::new(Livre { titre: "Rust en pratique".into(), auteur: "Alice".into(), pages: 350 }),
        Box::new(Film { titre: "Le Programmeur".into(), duree: 120 }),
        Box::new(Livre { titre: "Zero to Production".into(), auteur: "Luca".into(), pages: 485 }),
    ];

    for item in &items { afficher(item.as_ref()); }
}`,
          expectedOutput: `"Rust en pratique" par Alice (350 pages)\n"Le Programmeur" — 120min\n"Zero to Production" par Luca (485 pages)`,
          hint: 'Définis le trait Describable, implémente-le sur Livre et Film, et utilise Box<dyn Describable>.',
          xp: 35,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'rust-result',
          title: 'Gestion des erreurs avec Result',
          description: 'Utilise Result<T, E> et l\'opérateur ? pour gérer les erreurs.',
          content: `## Result en Rust

\`\`\`rust
fn diviser(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 { Err("Division par zéro".to_string()) }
    else { Ok(a / b) }
}

// Avec ? (propage l'erreur)
fn calculer(a: f64, b: f64, c: f64) -> Result<f64, String> {
    let r1 = diviser(a, b)?;  // si Err → retourne Err
    let r2 = diviser(r1, c)?;
    Ok(r2)
}

match diviser(10.0, 2.0) {
    Ok(r)  => println!("Résultat : {}", r),
    Err(e) => println!("Erreur : {}", e),
}
\`\`\``,
          code: `#[derive(Debug)]
enum ErreurCalc {
    DivisionParZero,
    RacineNegative,
    Invalide(String),
}

impl std::fmt::Display for ErreurCalc {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            ErreurCalc::DivisionParZero => write!(f, "Division par zéro"),
            ErreurCalc::RacineNegative  => write!(f, "Racine d'un nombre négatif"),
            ErreurCalc::Invalide(msg)   => write!(f, "Invalide : {}", msg),
        }
    }
}

fn diviser(a: f64, b: f64) -> Result<f64, ErreurCalc> {
    if b == 0.0 { Err(ErreurCalc::DivisionParZero) }
    else { Ok(a / b) }
}

fn racine(x: f64) -> Result<f64, ErreurCalc> {
    if x < 0.0 { Err(ErreurCalc::RacineNegative) }
    else { Ok(x.sqrt()) }
}

fn main() {
    let opérations = vec![(16.0, 4.0), (10.0, 0.0), (-4.0, 1.0)];

    for (a, b) in opérations {
        let résultat = diviser(a, b).and_then(|r| racine(r));
        match résultat {
            Ok(v)  => println!("√({}/{}) = {:.2}", a, b, v),
            Err(e) => println!("Erreur : {}", e),
        }
    }
}`,
          expectedOutput: `√(16/4) = 2.00\nErreur : Division par zéro\nErreur : Division par zéro`,
          hint: 'Crée enum ErreurCalc, implémente Display, et utilise .and_then() pour chaîner diviser et racine.',
          xp: 40,
          difficulty: 'advanced',
          type: 'lesson',
        },
        {
          id: 'rust-hashmap',
          title: 'HashMap et collections',
          description: 'Utilise HashMap pour stocker et manipuler des données associatives.',
          content: `## HashMap en Rust

\`\`\`rust
use std::collections::HashMap;

let mut scores: HashMap<String, i32> = HashMap::new();
scores.insert("Alice".to_string(), 85);
scores.entry("Bob".to_string()).or_insert(0);

// Accès
let s = scores.get("Alice");  // Option<&i32>
let s = scores["Alice"];      // i32 (panique si absent)

// Itération
for (nom, score) in &scores {
    println!("{}: {}", nom, score);
}
\`\`\``,
          code: `use std::collections::HashMap;

fn compter_mots(texte: &str) -> HashMap<&str, usize> {
    let mut freq = HashMap::new();
    for mot in texte.split_whitespace() {
        *freq.entry(mot).or_insert(0) += 1;
    }
    freq
}

fn main() {
    let texte = "le chat mange le poisson le chat dort";
    let freq = compter_mots(texte);

    // Trier par fréquence décroissante
    let mut pairs: Vec<(&&str, &usize)> = freq.iter().collect();
    pairs.sort_by(|a, b| b.1.cmp(a.1).then(a.0.cmp(b.0)));

    for (mot, count) in &pairs {
        println!("{}: {}x", mot, count);
    }
    println!("Mots distincts : {}", freq.len());
}`,
          expectedOutput: `le: 3x\nchat: 2x\ndort: 1x\nmange: 1x\npoisson: 1x\nMots distincts : 5`,
          hint: 'Utilise .entry().or_insert(0) pour compter, puis trie par fréquence avec sort_by.',
          xp: 30,
          difficulty: 'intermediate',
          type: 'lesson',
        },
        {
          id: 'rust-closures',
          title: 'Closures et fonctions d\'ordre supérieur',
          description: 'Maîtrise les closures Rust et les fonctions qui les acceptent.',
          content: `## Closures en Rust

\`\`\`rust
// Closure qui capture son environnement
let x = 5;
let ajouter_x = |n| n + x;
println!("{}", ajouter_x(3)); // 8

// Fn, FnMut, FnOnce
fn appliquer<F: Fn(i32) -> i32>(f: F, val: i32) -> i32 { f(val) }

let double = |n: i32| n * 2;
println!("{}", appliquer(double, 5)); // 10

// move — capture par valeur
let msg = String::from("Bonjour");
let saluer = move || println!("{}", msg);
saluer(); // msg est déplacé dans la closure
\`\`\``,
          code: `fn appliquer_n_fois<F: Fn(i32) -> i32>(f: F, mut val: i32, n: u32) -> i32 {
    for _ in 0..n { val = f(val); }
    val
}

fn composer<F, G>(f: F, g: G) -> impl Fn(i32) -> i32
where F: Fn(i32) -> i32, G: Fn(i32) -> i32 {
    move |x| g(f(x))
}

fn main() {
    let double = |x: i32| x * 2;
    let ajouter_un = |x: i32| x + 1;

    println!("double 3 fois depuis 1 : {}", appliquer_n_fois(double, 1, 3));

    let double_puis_plus_un = composer(double, ajouter_un);
    for i in 1..=5 {
        println!("f({}) = {}", i, double_puis_plus_un(i));
    }
}`,
          expectedOutput: `double 3 fois depuis 1 : 8\nf(1) = 3\nf(2) = 5\nf(3) = 7\nf(4) = 9\nf(5) = 11`,
          hint: 'Crée appliquer_n_fois avec F: Fn(i32)->i32, et composer qui combine deux Fn.',
          xp: 40,
          difficulty: 'advanced',
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
