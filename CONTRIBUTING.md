# Contribuer à `weeb_project_final`

## Issues
1. Créer une issue par sujet (bug, feature, documentation…).
2. Utiliser des labels (`bug`, `feature`, `docs`, `infra`, etc.) et décrire clairement le besoin + étapes de reproduction si bug.

## Branches

| Type | Préfixe suggéré | Exemple |
|------|-----------------|---------|
| Feature | `feature/` | `feature/articles-search` |
| Bugfix | `bugfix/` | `bugfix/fix-contact-validation` |
| Hotfix prod | `hotfix/` | `hotfix/analytics-crash` |
| Documentation | `docs/` | `docs/update-readme` |

- Créer la branche depuis `main`.
- Une branche = une issue (référence dans le nom ou la PR).

## Pull Requests
1. Pousser la branche sur le remote : `git push -u origin feature/...`.
2. Ouvrir une PR vers `main`, lier l’issue (`Closes #ID`).
3. Remplir le template : description, captures si UI, check-list (tests, lint, migrations).
4. Faire relire (au moins 1 reviewer). Résoudre les commentaires avant merge.
5. Squash & merge ou rebase & merge (éviter les merges non linéaires).

## Nettoyage
- Après merge, supprimer la branche côté remote (`Delete branch` dans l’UI ou `git push origin --delete <branch>`).
- Localement : `git branch -d <branch>`.

## Tests à lancer avant PR
- Backend : `cd weeb_backend && .\.venv\Scripts\python.exe manage.py test`
- Frontend : `cd weeb && npm run build` (assure que Vite compile)
- Ajouter des tests quand c’est pertinent (serializers, views, hooks…).

## Bonnes pratiques supplémentaires
- Commits atomiques et messages au format `type: description` (`feat`, `fix`, `docs`, `chore`, …).
- Documenter tout nouveau script/config dans le README.
- Utiliser les Draft PR pour partager l’avancement sans review finale.
