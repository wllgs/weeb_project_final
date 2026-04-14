from django.core.management.base import BaseCommand
from weeb_app.models import Article
from users.models import CustomUser


class Command(BaseCommand):
    help = "Crée des articles de démonstration pour le blog."

    def handle(self, *args, **options):
        # Récupérer l'utilisateur admin ou en créer un temporaire
        try:
            admin_user = CustomUser.objects.get(email="admin@example.com")
        except CustomUser.DoesNotExist:
            self.stdout.write(self.style.WARNING("Admin non trouvé, création d'un auteur temporaire..."))
            admin_user = CustomUser.objects.create_user(
                email="demo@example.com",
                password="DemoPassword1234",
                first_name="Auteur",
                last_name="Demo",
            )

        articles_data = [
            {
                "title": "L'Intelligence Artificielle : Révolution du Développement Web",
                "content": """L'intelligence artificielle transforme radicalement le paysage du développement web. Depuis l'avènement des grands modèles de langage comme GPT, les développeurs disposent désormais d'outils puissants pour automatiser des tâches complexes.

Les frameworks d'IA comme TensorFlow.js permettent d'intégrer des capacités d'apprentissage automatique directement dans les navigateurs web. Imaginez des applications qui apprennent des comportements des utilisateurs en temps réel, optimisant automatiquement l'interface utilisateur pour maximiser l'engagement.

Les chatbots intelligents, alimentés par des modèles de traitement du langage naturel, offrent désormais des expériences conversationnelles quasi-humaines. Ces assistants virtuels peuvent gérer des demandes complexes, résoudre des problèmes techniques, et même générer du code personnalisé.

L'IA transforme également les processus de développement. Les outils de génération de code automatique comme GitHub Copilot réduisent considérablement le temps nécessaire pour écrire des applications. Les tests automatisés pilotés par IA peuvent identifier des bugs subtils que les tests traditionnels manqueraient.

Cependant, cette révolution soulève d'importantes questions éthiques. Comment garantir la sécurité des applications alimentées par l'IA ? Comment maintenir la confidentialité des données utilisateur ? Les développeurs doivent désormais penser non seulement à la fonctionnalité, mais aussi à la responsabilité algorithmique.

L'avenir du web semble être un mélange harmonieux entre créativité humaine et puissance computationnelle de l'IA, ouvrant des possibilités infinies pour des expériences web plus intelligentes et plus intuitives."""
            },
            {
                "title": "Le Web3 : Vers un Internet Décentralisé",
                "content": """Le Web3 représente la vision d'un internet décentralisé, où les utilisateurs reprennent le contrôle de leurs données et de leur identité numérique. Contrairement au Web2 dominé par les grandes plateformes centralisées, le Web3 s'appuie sur la blockchain et les technologies distribuées.

Les contrats intelligents, ces programmes auto-exécutables stockés sur la blockchain, permettent de créer des applications décentralisées (dApps) qui fonctionnent sans intermédiaire de confiance. Les utilisateurs peuvent interagir directement avec ces applications, sans craindre la censure ou la manipulation des données.

Les NFT (Non-Fungible Tokens) ont popularisé le Web3 auprès du grand public, mais les applications vont bien au-delà de l'art numérique. Des systèmes de vote décentralisés, des marchés peer-to-peer, des réseaux sociaux sans censure, tous ces services deviennent possibles grâce aux technologies Web3.

La décentralisation apporte également des défis techniques importants. Les applications Web3 doivent gérer la complexité des portefeuilles cryptographiques, des clés privées, et des transactions blockchain. L'expérience utilisateur doit être simplifiée pour rendre ces technologies accessibles au plus grand nombre.

Les protocoles DeFi (Decentralized Finance) montrent le potentiel économique du Web3. Des milliards de dollars sont désormais gérés par des smart contracts transparents et immuables, offrant des services financiers sans les intermédiaires traditionnels.

Cependant, le Web3 n'est pas sans risques. Les hacks de smart contracts, la volatilité des cryptomonnaies, et les questions réglementaires freinent encore l'adoption massive. Malgré ces défis, le Web3 représente une évolution naturelle vers un internet plus équitable et plus démocratique."""
            },
            {
                "title": "React 18 et les Nouvelles Fonctionnalités",
                "content": """React 18 apporte des améliorations majeures qui transforment la façon dont nous construisons des applications web modernes. Au cœur de cette version, le nouveau moteur de rendu concurrent offre des performances et une réactivité sans précédent.

Le rendu concurrent permet à React de préparer plusieurs versions de l'interface utilisateur simultanément. Cette approche révolutionnaire signifie que les applications peuvent rester réactives même pendant les mises à jour lourdes. Les utilisateurs bénéficient d'interfaces fluides, sans les blocages traditionnels lors des re-rendus massifs.

Les nouvelles APIs comme startTransition permettent de différencier les mises à jour urgentes des mises à jour non-urgentes. Les développeurs peuvent désormais prioriser les interactions utilisateur critiques, offrant une expérience plus naturelle et plus performante.

Les Server Components représentent une autre innovation majeure. Ces composants s'exécutent côté serveur, réduisant considérablement la quantité de JavaScript envoyée au client. Les applications React deviennent plus rapides à charger et plus efficaces en termes de bande passante.

Le streaming SSR (Server-Side Rendering) permet d'envoyer du HTML au navigateur de manière progressive. Les utilisateurs voient le contenu apparaître plus rapidement, même si certaines parties de la page sont encore en cours de chargement côté serveur.

React 18 facilite également l'adoption progressive. Les applications existantes peuvent bénéficier des nouvelles fonctionnalités sans refactorisation complète. Cette approche pragmatique permet aux équipes de migrer à leur rythme.

Les hooks comme useDeferredValue et useTransition offrent de nouveaux outils pour gérer la concurrence. Les développeurs peuvent créer des interfaces qui restent réactives même pendant les calculs intensifs.

L'écosystème React continue d'évoluer rapidement, avec des outils comme Next.js qui tirent parti des nouvelles capacités de React 18 pour offrir des expériences développeur exceptionnelles."""
            },
            {
                "title": "La Sécurité Web : Défis et Solutions Modernes",
                "content": """La sécurité web représente l'un des défis les plus critiques du développement moderne. Avec l'augmentation constante des cyberattaques, les développeurs doivent intégrer la sécurité à chaque étape du processus de développement.

Les attaques XSS (Cross-Site Scripting) restent l'une des menaces les plus courantes. Ces attaques permettent aux hackers d'injecter du code malveillant dans les pages web, compromettant les données des utilisateurs. Les frameworks modernes comme React offrent des protections intégrées, mais les développeurs doivent rester vigilants.

Les attaques CSRF (Cross-Site Request Forgery) exploitent la confiance des navigateurs dans les cookies d'authentification. Les applications doivent implémenter des tokens CSRF pour valider l'origine des requêtes. Les frameworks comme Django offrent des protections automatiques, mais leur configuration correcte est cruciale.

Le HTTPS est désormais indispensable. Les navigateurs modernes marquent les sites HTTP comme non sécurisés, et les moteurs de recherche pénalisent les sites non chiffrés. L'implémentation correcte des certificats SSL/TLS nécessite une attention particulière aux détails techniques.

Les Content Security Policy (CSP) permettent de contrôler précisément les ressources chargées par le navigateur. Ces politiques de sécurité réduisent considérablement les risques d'attaques XSS et d'injection de code malveillant.

L'authentification moderne s'appuie sur JWT (JSON Web Tokens) et OAuth 2.0. Ces standards permettent des authentifications sécurisées et décentralisées, essentielles pour les applications distribuées.

Les vulnérabilités dans les dépendances tierces représentent un risque majeur. Des outils comme npm audit et Snyk permettent de scanner automatiquement les vulnérabilités connues dans les bibliothèques utilisées.

La sécurité doit être pensée dès la conception. L'approche "Security by Design" intègre la sécurité dans l'architecture même des applications, plutôt que de l'ajouter comme une couche supplémentaire."""
            },
            {
                "title": "Les APIs REST et GraphQL : Évolution des Architectures Web",
                "content": """Les APIs constituent le fondement des architectures web modernes, permettant la communication entre applications distribuées. REST et GraphQL représentent deux approches complémentaires pour exposer et consommer des données.

REST (Representational State Transfer) s'appuie sur les principes du web : ressources identifiées par des URLs, méthodes HTTP standardisées, et représentations multiples des données. Cette approche simple et universelle a dominé le paysage des APIs pendant des années.

Cependant, REST présente des limitations. Le sur-fetching (récupération de données inutiles) et l'under-fetching (nécessité de multiples requêtes) peuvent dégrader les performances des applications riches. Les développeurs frontend se retrouvent souvent à faire des compromis entre efficacité et complexité.

GraphQL, développé par Facebook, apporte une solution élégante à ces problèmes. Les clients peuvent spécifier exactement les données dont ils ont besoin, éliminant le sur-fetching et réduisant le nombre de requêtes. Cette approche déclarative simplifie considérablement le développement frontend.

Les schémas GraphQL offrent une documentation vivante et auto-documentée. Les outils de développement comme GraphiQL permettent d'explorer et de tester les APIs de manière interactive, améliorant considérablement l'expérience développeur.

L'adoption de GraphQL nécessite une évolution de l'architecture backend. Les resolvers doivent gérer des requêtes complexes et optimiser l'accès aux données. Des outils comme Apollo Server facilitent cette transition.

REST et GraphQL ne sont pas mutuellement exclusifs. De nombreuses applications adoptent une approche hybride, utilisant REST pour les opérations CRUD simples et GraphQL pour les interfaces complexes.

Les APIs modernes doivent également gérer l'authentification, la pagination, le caching, et la gestion d'erreurs. Des standards comme JSON:API et OpenAPI Specification offrent des frameworks pour des APIs cohérentes et bien documentées.

L'avenir des APIs semble se diriger vers une convergence des approches, avec des protocoles plus intelligents capables d'adapter leur comportement aux besoins des clients."""
            }
        ]

        created_count = 0
        for article_data in articles_data:
            article, created = Article.objects.get_or_create(
                title=article_data["title"],
                defaults={
                    "content": article_data["content"],
                    "author": admin_user,
                    "is_published": True,
                }
            )
            if created:
                created_count += 1
                self.stdout.write(
                    self.style.SUCCESS(f"Article créé : {article.title}")
                )
            else:
                self.stdout.write(
                    self.style.WARNING(f"Article déjà existant : {article.title}")
                )

        self.stdout.write(
            self.style.SUCCESS(f"Création terminée : {created_count} article(s) créé(s)")
        )