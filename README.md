# 🚀 CodePath — Guide de déploiement complet

Plateforme d'apprentissage de la programmation : cours + exercices interactifs, éditeur Monaco, comptes utilisateurs, progression sauvegardée.

---

## Stack technique
- **Next.js 14** — framework React (App Router)
- **Supabase** — base de données + authentification
- **Vercel** — déploiement (gratuit)
- **Monaco Editor** — éditeur VS Code intégré
- **Tailwind CSS + Framer Motion** — styles et animations

---

## 📋 Étapes de déploiement

### Étape 1 — Créer un projet Supabase (gratuit)

1. Va sur [supabase.com](https://supabase.com) → "New project"
2. Choisis un nom, mot de passe, région (Europe West pour toi)
3. Une fois créé, dans **Settings > API** copie :
   - `Project URL` → sera `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → sera `NEXT_PUBLIC_SUPABASE_ANON_KEY`

4. Dans **SQL Editor**, colle et exécute tout le contenu de `supabase-schema.sql`

5. *(Optionnel)* Pour activer GitHub OAuth :
   - Dans Supabase : Authentication > Providers > GitHub → activer
   - Sur [github.com/settings/developers](https://github.com/settings/developers) : New OAuth App
   - Callback URL : `https://[TON_URL_SUPABASE].supabase.co/auth/v1/callback`

---

### Étape 2 — Mettre le code sur GitHub

```bash
# Dans ton terminal, dans le dossier codepath/
git init
git add .
git commit -m "Initial CodePath commit"
git branch -M main
git remote add origin https://github.com/TON_USERNAME/codepath.git
git push -u origin main
```

---

### Étape 3 — Déployer sur Vercel (gratuit)

1. Va sur [vercel.com](https://vercel.com) → "New Project"
2. Importe ton repo GitHub `codepath`
3. Dans **Environment Variables**, ajoute :
   ```
   NEXT_PUBLIC_SUPABASE_URL = https://xxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY = eyJhbGci...
   ```
4. Clique **Deploy** 🎉

Vercel donne une URL gratuite : `codepath-xxx.vercel.app`

---

### Étape 4 — Configurer les redirections Supabase

Dans Supabase : **Authentication > URL Configuration**
- Site URL : `https://ton-projet.vercel.app`
- Redirect URLs : `https://ton-projet.vercel.app/**`

---

## 🛠️ Développement local

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement
cp .env.local.example .env.local
# Puis édite .env.local avec tes clés Supabase

# 3. Lancer en développement
npm run dev
# → http://localhost:3000
```

---

## 📁 Structure du projet

```
codepath/
├── app/
│   ├── page.tsx              # Landing page
│   ├── dashboard/page.tsx    # Tableau de bord utilisateur
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── courses/
│   │   ├── page.tsx          # Liste des cours théoriques
│   │   └── [lang]/page.tsx   # Cours d'un langage
│   └── learn/
│       ├── page.tsx          # Choix du langage
│       └── [lang]/page.tsx   # Éditeur + exercices
├── components/
│   └── editor/
│       └── CodeEditor.tsx    # Monaco Editor
├── data/
│   ├── index.ts              # Export de tous les curricula
│   └── languages/
│       ├── python.ts         # Curriculum Python complet
│       └── javascript.ts     # Curriculum JS complet
├── lib/
│   ├── supabase.ts           # Client Supabase
│   ├── executor.ts           # Exécution de code JS/Python
│   └── types.ts              # Types TypeScript
└── supabase-schema.sql       # Schéma DB à exécuter
```

---

## ➕ Ajouter du contenu

Pour ajouter des leçons, édite les fichiers dans `data/languages/` :

```typescript
// Ajoute une leçon dans le tableau chapters[x].lessons
{
  id: 'py-nouvelle-leçon',
  title: 'Titre de la leçon',
  description: 'Description courte',
  content: `## Markdown complet ici...`,
  code: `# Code de départ`,
  hint: 'Indice pour l\'élève',
  xp: 20,
  difficulty: 'beginner', // 'beginner' | 'intermediate' | 'advanced'
  type: 'lesson', // 'lesson' | 'exercise'
}
```

---

## 🎨 Personnalisation

- **Couleurs** : `tailwind.config.js` → palette `brand`
- **Fonts** : `app/layout.tsx`
- **Langages** : ajoute dans `data/index.ts` en suivant le pattern existant

---

## 📊 Fonctionnalités incluses

- ✅ Landing page moderne
- ✅ Inscription / Connexion (email + GitHub OAuth)
- ✅ Dashboard avec stats (XP, streak, progression)
- ✅ 7 langages : Python, JavaScript, TypeScript, Java, C, SQL, Rust
- ✅ Cours théoriques (lecture seule)
- ✅ Éditeur Monaco (comme VS Code)
- ✅ Exécution de code JS/Python dans le navigateur
- ✅ Sauvegarde de progression en base de données
- ✅ Système de XP et niveaux
- ✅ Responsive + mode sombre

## 🔮 Pour aller plus loin

- Exécution serveur (Python réel) via API route + subprocess
- Plus de langages (Go, PHP, Ruby, Swift...)
- Système de streaks automatique
- Leaderboard global
- Certificats de complétion
- Chat / forum communauté
