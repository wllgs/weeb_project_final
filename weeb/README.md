# Weeb

Weeb est une application web moderne construite avec React, Vite et Tailwind CSS. Elle propose un blog, des ressources, un formulaire de contact animé, une gestion d’authentification, et une interface responsive fidèle à un design professionnel.

## Fonctionnalités principales

- **Accueil** : Présentation du blog, boutons animés, sections tendances et ressources, logos partenaires.
- **Formulaire de contact** : Formulaire animé (Framer Motion), gestion du focus, validation, envoi asynchrone avec hook personnalisé (`useForm`, `useFetch`).
- **Connexion** : Page de login stylisée, gestion du focus, bouton violet, responsive.
- **Navigation** : Header avec menu burger mobile, navigation fluide.
- **Footer** : Footer responsive, liens, copyright, réseaux sociaux.
- **Animations** : Framer Motion pour les transitions et effets d’apparition.
- **Responsive** : Design adapté mobile, tablette, desktop.

## Stack technique

- [React](https://react.dev/) (Vite)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Router](https://reactrouter.com/)

## Structure du projet

```
weeb/
├── public/
│   ├── weeb.svg (favicon)
│   └── logos/ (logos partenaires et réseaux sociaux)
├── src/
│   ├── assets/ (images)
│   ├── components/ (Header, Footer, Button...)
│   ├── hooks/ (useForm, useFetch)
│   ├── pages/ (Home, Contact, Login)
│   └── App.jsx, main.jsx, ...
├── tailwind.config.js
├── vite.config.js
└── index.html
```

## Installation et lancement

1. **Cloner le repo**
2. Installer les dépendances :
   ```bash
   npm install
   ```
3. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
4. Accéder à l’application sur [http://localhost:5173](http://localhost:5173)

## Personnalisation
- Modifiez les images dans `public/logos/` et `src/assets/` pour adapter à votre marque.
- Les couleurs principales sont définies dans `tailwind.config.js`.
- Le favicon est dans `public/weeb.svg`.

## Bonnes pratiques
- Utilisez les hooks personnalisés pour la gestion des formulaires et des requêtes.
- Les composants sont réutilisables (ex : `Button`).
- Les animations sont gérées avec Framer Motion pour une UX moderne.

## Licence
Projet pédagogique. Libre d’adaptation pour vos besoins.
