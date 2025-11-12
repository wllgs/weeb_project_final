# weeb_project_final

Monorepo qui rassemble :

- **weeb** : frontend React + Vite + Tailwind qui affiche les articles et expose un formulaire de contact.
- **weeb_backend** : backend Django / Django REST Framework qui gère les articles, les messages de contact et sert les API consommées par le frontend.

## Démarrer le backend

```powershell
cd weeb_backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser   # optionnel mais recommandé
python manage.py runserver 0.0.0.0:8000
```

## Démarrer le frontend

```powershell
cd weeb
cp .env.example .env   # ou ajuster VITE_API_BASE_URL
npm install
npm run dev -- --host
```

L’application Vite tourne par défaut sur `http://localhost:5173` et requête les endpoints Django (`http://127.0.0.1:8000/api`).

## Git / GitHub

- Branche par défaut : `main`
- Remote : `https://github.com/wllgs/weeb_project_final.git`
- Voir `CONTRIBUTING.md` pour la stratégie de branches, les bonnes pratiques issues / PR et le nettoyage.
