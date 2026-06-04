import { NextRequest, NextResponse } from 'next/server';

const WANDBOX_URL = 'https://wandbox.org/api/compile.json';

const COMPILERS: Record<string, string> = {
  c:          'gcc-head-c',
  java:       'openjdk-jdk-22+36',
  rust:       'rust-1.82.0',
  typescript: 'typescript-5.6.2',
  sql:        'sqlite-3.46.1',
};

const FILENAMES: Record<string, string> = {
  java: 'Main.java',
};

const SQL_PREAMBLE = `
CREATE TABLE IF NOT EXISTS employes (
  id INTEGER PRIMARY KEY,
  nom TEXT, prenom TEXT, salaire REAL,
  departement TEXT, annee_embauche INTEGER,
  email TEXT, dept_id INTEGER
);
INSERT INTO employes VALUES
  (1,'Martin','Alice',4500,'Informatique',2019,'alice@gmail.com',1),
  (2,'Dupont','Bob',3800,'RH',2021,'bob@company.com',2),
  (3,'Durand','Clara',5200,'Informatique',2018,'clara@gmail.com',1),
  (4,'Bernard','David',3200,'Marketing',2022,'david@company.com',3),
  (5,'Petit','Emma',4100,'RH',2020,'emma@company.com',2),
  (6,'Marchand','Félix',6000,'Informatique',2017,'felix@company.com',1),
  (7,'Morel','Grace',3500,'Marketing',2021,'grace@gmail.com',3);

CREATE TABLE IF NOT EXISTS departements (
  id INTEGER PRIMARY KEY, nom TEXT, budget REAL
);
INSERT INTO departements VALUES
  (1,'Informatique',150000),(2,'RH',80000),(3,'Marketing',100000);

CREATE TABLE IF NOT EXISTS projets (
  id INTEGER PRIMARY KEY, nom TEXT, employe_id INTEGER
);
INSERT INTO projets VALUES
  (1,'Site Web',1),(2,'Appli Mobile',3),(3,'CRM',6);

CREATE TABLE IF NOT EXISTS clients (
  id INTEGER PRIMARY KEY, nom TEXT, ville TEXT
);
INSERT INTO clients VALUES
  (1,'Durand SA','Paris'),(2,'Martin Inc','Lyon'),(3,'Petit SARL','Bordeaux');

CREATE TABLE IF NOT EXISTS commandes (
  id INTEGER PRIMARY KEY, client_id INTEGER, montant REAL, date TEXT
);
INSERT INTO commandes VALUES
  (1,1,1500,'2024-01-15'),(2,1,3200,'2024-02-20'),(3,2,800,'2024-03-10');

`;

export async function POST(req: NextRequest) {
  const { language, code } = await req.json();

  const compiler = COMPILERS[language];
  if (!compiler) {
    return NextResponse.json({
      output: `L'exécution de ${language.toUpperCase()} n'est pas encore supportée.`,
      error: false,
    });
  }

  const finalCode = language === 'sql' ? SQL_PREAMBLE + code : code;

  try {
    const body: Record<string, string> = { code: finalCode, compiler };
    if (FILENAMES[language]) body.filename = FILENAMES[language];

    const res = await fetch(WANDBOX_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (data.compiler_error) {
      return NextResponse.json({ output: data.compiler_error, error: true });
    }

    const output = data.program_output || data.program_message || '';
    return NextResponse.json({ output: output || '(aucune sortie)', error: false });
  } catch (e: unknown) {
    return NextResponse.json({ output: `Erreur serveur : ${(e as Error).message}`, error: true });
  }
}
