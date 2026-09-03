import type { Dict } from "./schema";

const EMAIL = "gigikakauridze1302@gmail.com";

export const fr: Dict = {
  ui: {
    htmlLang: "fr",
    nav: { home: "Accueil", about: "À propos", disclosure: "Transparence" },
    langLabel: "Langue",
    skipToContent: "Aller au contenu",
    backToPosts: "← Tous les articles",
    latest: "Derniers articles",
    footerTagline:
      "Financé par les lecteurs — certains liens sont des liens d'affiliation.",
    footerAbout: "À propos",
    footerDisclosure: "Transparence sur l'affiliation",
    footerContact: "Contact",
    affiliateNotice:
      "Cet article contient des liens d'affiliation. Si vous vous inscrivez via l'un d'eux, ce site peut toucher une commission sans surcoût pour vous. Les recommandations reposent sur des tests concrets, pas sur le montant de la commission — voir la [transparence complète](~/disclosure/).",
    articleFooter: `Corrections et demandes : [${EMAIL}](mailto:${EMAIL}).`,
    signup: {
      label: "Recevez les nouveaux tests et benchmarks par e-mail",
      placeholder: "vous@exemple.com",
      button: "S'abonner",
      note: "Un e-mail à chaque nouveau benchmark ou test publié. Pas de spam, adresse jamais partagée. Désinscription à tout moment.",
    },
    postKind: { Comparison: "Comparatif", Tutorial: "Tutoriel" },
    postTitle: {
      "digitalocean-vs-vultr":
        "DigitalOcean vs Vultr : le comparatif d'un développeur",
      "deploy-node-app-hetzner":
        "Déployer une app Node.js sur un VPS Hetzner avec Docker",
    },
    postBlurb: {
      "digitalocean-vs-vultr":
        "Tarifs, spécifications, performances, prise en main et support comparés entre DigitalOcean et Vultr — et lequel je choisis, et quand.",
      "deploy-node-app-hetzner":
        "Un tutoriel pas à pas : créez un serveur Hetzner Cloud, durcissez-le, installez Docker et publiez une app Node.js en HTTPS automatique.",
    },
  },

  home: {
    title: "Tests d'hébergement VPS pour développeurs — Host or Die",
    description:
      "Tests d'hébergement VPS et cloud faits par un développeur : le même déploiement et les mêmes benchmarks chez chaque fournisseur — CPU, disque, réseau, démarrage. Sans classement sponsorisé.",
    eyebrow: "Indépendant · basé sur des benchmarks",
    h1Lead: "Tests d'hébergement VPS et cloud",
    h1Accent: "pour développeurs",
    lead: "Je déploie de vraies applications sur de vrais serveurs, je lance la même série de benchmarks sur chacun — CPU, E/S disque, débit réseau, temps de démarrage — et je raconte ce qui s'est réellement passé.",
    intro:
      "Aucun fournisseur ne paie pour figurer sur ce site et aucun test n'est sponsorisé. Certains liens sont des liens d'affiliation, c'est ainsi que la facture d'hébergement est payée ; cela ne change jamais les chiffres ni la recommandation. Voici comment se déroulent les tests : [la méthodologie](~/about/), et voici la [transparence sur l'affiliation](~/disclosure/).",
  },

  about: {
    title: "Méthodologie des benchmarks VPS — Host or Die",
    description:
      "Comment chaque VPS est testé ici : les outils exacts, les métriques (CPU, disque, réseau, démarrage), la machine de test et les règles qui gardent les classements honnêtes.",
    h1: "À propos et méthodologie",
    metaLine: "Par Gigi · développeur backend et infrastructure",
    blocks: [
      { k: "h2", t: "Qui écrit ceci" },
      {
        k: "p",
        t: 'Je suis Gigi, développeur backend et infrastructure. J\'ai passé près d\'une décennie à déployer des applications web, des API et des workers en arrière-plan sur des serveurs Linux — bare metal, VPS et les grands clouds — et à les maintenir en vie. Choisir où héberger un projet revenait toujours à la même recherche frustrante : des pages marketing pleines d\'adjectifs, des benchmarks qui ne révélaient jamais leur configuration, et des « top 10 » classés par commission d\'affiliation.',
      },
      {
        k: "p",
        t: "Host or Die est ma tentative de créer la ressource que je voulais : chaque fournisseur soumis au même déploiement et aux mêmes mesures, avec la méthode écrite pour que vous puissiez la reproduire ou la critiquer. Si un chiffre paraît faux, dites-le-moi et je le remesure.",
      },
      { k: "h2", t: "Comment chaque fournisseur est testé" },
      {
        k: "p",
        t: "Chaque test part d'un compte vierge et d'un serveur neuf dans la configuration par défaut du fournisseur. Sauf indication contraire, la machine de test est l'offre la moins chère avec au moins 1 vCPU et 1 Go de RAM, sous <b>Ubuntu 24.04 LTS</b>, dans la région géographiquement la plus proche de moi. Je la crée deux fois, des jours différents, et je fais la moyenne des résultats.",
      },
      { k: "h3", t: "La charge de travail" },
      {
        k: "p",
        t: "Un déploiement représentatif passe en premier : une API Node.js sous Docker devant PostgreSQL, plus un reverse proxy Nginx avec un certificat Let's Encrypt. Cela révèle les frictions réelles — vitesse de pull des images, temps de build, si le panneau de contrôle vous résiste — avant de collecter le moindre chiffre synthétique. Mon [guide pas à pas pour déployer une app Node.js avec Docker sur un VPS Hetzner](~/deploy-node-app-hetzner/) suit le même type de déploiement.",
      },
      { k: "h3", t: "Les mesures" },
      {
        k: "table",
        head: ["Métrique", "Outil", "Ce que ça révèle"],
        rows: [
          [
            "CPU, mono et multi-cœur",
            "<c>sysbench cpu</c>, <c>stress-ng</c>, <c>7z b</c>",
            "Calcul soutenu pour les builds, le traitement des requêtes et les tâches de fond ; si un vCPU « partagé » se bride sous charge.",
          ],
          [
            "E/S disque",
            "<c>fio</c> (lecture/écriture aléatoire 4K, séquentiel 1M)",
            "Performances de base de données, charges à gros volume de logs, et honnêteté de l'étiquette « NVMe ».",
          ],
          [
            "Débit réseau",
            "<c>iperf3</c> vers des points tiers, <c>speedtest-cli</c>",
            "Sortie réelle vers d'autres régions, pas seulement le propre miroir de test du fournisseur.",
          ],
          [
            "Temps de démarrage et de provisionnement",
            "<c>systemd-analyze</c>, horodatages d'API, horloge murale",
            "À quelle vitesse vous pouvez monter en charge ou remplacer un nœud défaillant.",
          ],
          [
            "Latence",
            "<c>ping</c>, <c>mtr</c>, TTFB depuis trois continents",
            "Qualité de routage et de peering, pas seulement la distance sur une carte.",
          ],
        ],
      },
      { k: "h3", t: "Aussi noté, mais pas noté au score" },
      {
        k: "ul",
        items: [
          "Temps entre l'inscription et une session SSH utilisable.",
          "Si l'IPv6, le réseau privé, les snapshots et les pare-feux sont inclus ou facturés en plus.",
          "Quota de sortie/bande passante et le prix du Go dépassé.",
          "Support : un vrai ticket est ouvert à chaque test, avec le temps de réponse et son utilité consignés.",
          "Comportement de facturation — plafonds horaires, minimums, et la difficulté à détruire totalement une ressource pour qu'elle cesse de facturer.",
        ],
      },
      { k: "h2", t: "Règles de base" },
      {
        k: "ul",
        items: [
          "<b>Aucun test sponsorisé.</b> Aucun fournisseur n'obtient de droit de relecture, d'embargo ou d'accès anticipé à une note.",
          "<b>Les liens d'affiliation ne déplacent jamais le classement.</b> Là où un lien de parrainage existe, il est utilisé ; là où il n'y en a pas, le fournisseur est couvert quand même. Voir la [page de transparence](~/disclosure/).",
          "<b>Les chiffres incluent leur configuration.</b> Offre, région, date, noyau et versions des outils sont publiés avec chaque résultat pour que vous puissiez le refaire.",
          "<b>Les tests sont revus.</b> Les fournisseurs changent de matériel et de tarifs ; les mises à jour sont ajoutées et datées plutôt qu'éditées en silence.",
        ],
      },
      {
        k: "p",
        t: "Vous pouvez voir la méthode appliquée de bout en bout dans le [comparatif DigitalOcean vs Vultr](~/digitalocean-vs-vultr/). Une erreur repérée ou un fournisseur à tester ? Écrivez à [" +
          EMAIL +
          "](mailto:" +
          EMAIL +
          ").",
      },
    ],
  },

  disclosure: {
    title: "Transparence sur l'affiliation — Host or Die",
    description:
      "Comment Host or Die gagne de l'argent : certains liens sortants sont des liens d'affiliation qui versent une commission sans surcoût pour vous. Les classements reposent sur les tests, pas sur les paiements.",
    h1: "Transparence sur l'affiliation",
    blocks: [
      {
        k: "p",
        t: "<b>Ce site touche des commissions sur certains de ses liens, sans surcoût pour vous.</b> Si vous cliquez sur certains liens vers un hébergeur puis vous inscrivez ou achetez une offre, Host or Die peut recevoir une commission de parrainage. Vous payez le même prix qu'en allant directement chez le fournisseur — parfois moins, quand un lien de parrainage comporte un crédit de bienvenue.",
      },
      { k: "h2", t: "Ce que cela change au contenu — rien" },
      {
        k: "p",
        t: "Les recommandations de ce site reposent sur des tests concrets et les résultats de benchmark décrits dans la [méthodologie](~/about/). Elles ne reposent pas sur l'entreprise qui paie le plus, ni sur le fait qu'elle paie tout court. Concrètement :",
      },
      {
        k: "ul",
        items: [
          "Les fournisseurs sans programme d'affiliation sont testés et recommandés exactement dans les mêmes conditions que ceux qui en ont un.",
          "Les taux de commission ne sont jamais un facteur dans un verdict, une note ou l'ordre d'apparition des fournisseurs.",
          "Aucun fournisseur ne reçoit de paiement, d'hébergement gratuit, de droit de relecture ou d'accès anticipé à un test en échange d'une couverture.",
          "Quand une recommandation change parce que les tests ont changé, l'ancien verdict reste visible avec une mise à jour datée.",
        ],
      },
      { k: "h2", t: "Où apparaissent les liens d'affiliation" },
      {
        k: "p",
        t: "Les liens d'affiliation peuvent apparaître dans les comparatifs et les tutoriels, dans des sections clairement identifiées « où s'inscrire » et dans le pied de page du site. Toute page qui en contient porte un avis de transparence en haut, pas seulement cette page. Les liens purement informatifs — documentation, pages de statut, code source, pages de tarifs citées en référence — ne sont pas des liens d'affiliation.",
      },
      { k: "h2", t: "Programmes auxquels ce site participe" },
      {
        k: "p",
        t: "Host or Die perçoit des commissions de parrainage via des programmes d'affiliation gérés directement par des hébergeurs et via le réseau d'affiliation [Awin](https://www.awin.com/). Quand une recommandation comporte un lien d'affiliation, le fournisseur visé est nommé dans l'avis de transparence en haut de cette page.",
      },
      {
        k: "p",
        t: "En date de septembre 2026, ce site a une relation d'affiliation active avec <b>DigitalOcean</b> (via Awin) et une relation de parrainage avec <b>Vultr</b>. Les liens vers Hetzner et tout autre fournisseur cité ne sont pas des liens d'affiliation : Hetzner a mis fin à son programme de parrainage en 2026, et aucun accord n'est en place avec les autres. Cette section est mise à jour au fil des changements.",
      },
      { k: "h2", t: "FTC et normes publicitaires" },
      {
        k: "p",
        t: "Cette transparence est fournie pour se conformer aux <i>Guides sur l'usage des recommandations et témoignages en publicité</i> de la Federal Trade Commission des États-Unis (16 CFR Part 255) et aux règles équivalentes ailleurs, y compris le CAP Code britannique. L'intention est simple : vous devez toujours savoir quand un lien peut rapporter de l'argent à ce site.",
      },
      { k: "h2", t: "Questions" },
      {
        k: "p",
        t: "Écrivez à [" + EMAIL + "](mailto:" + EMAIL + ") et je répondrai.",
      },
      { k: "p", t: "<i>Dernière mise à jour : 4 septembre 2026.</i>" },
    ],
  },

  dovv: {
    title: "DigitalOcean vs Vultr : comparatif pour développeurs (2026)",
    description:
      "DigitalOcean ou Vultr ? Un comparatif concret des tarifs, spécifications, performances réelles, support et prise en main — et lequel choisir, et quand.",
    h1: "DigitalOcean vs Vultr : le comparatif d'un développeur",
    metaLine:
      "Comparatif · publié le 12 août 2026 · mis à jour le 4 septembre 2026 · tarifs vérifiés en août 2026",
    blocks: [
      { k: "affiliateNotice" },
      {
        k: "p",
        t: "DigitalOcean et Vultr occupent la même partie du marché : des instances VPS Linux non gérées, facturées à l'heure avec un plafond mensuel, destinées aux développeurs à l'aise avec un terminal. Ils sont assez proches pour que la décision se résume souvent à trois choses — l'étendue géographique dont vous avez besoin, si vous voulez des services gérés maison, et l'importance que vous accordez à tirer le maximum de calcul par dollar.",
      },
      {
        k: "p",
        t: "Je maintiens les deux comptes actifs en continu et je déploie la même pile de référence (une API Node.js sous Docker devant PostgreSQL, derrière Nginx avec un certificat Let's Encrypt) sur chacun — le même montage que couvre mon [tutoriel Node.js sur Hetzner avec Docker](~/deploy-node-app-hetzner/). Cet article est la partie qualitative — tarifs, fonctionnalités, flux de travail, support. Les chiffres de benchmark synthétique ont leur propre section plus bas ; voir la [méthodologie](~/about/) pour savoir comment ils sont collectés.",
      },
      {
        k: "verdict",
        heading: "Verdict rapide",
        head: ["Si vous voulez…", "Choisissez", "Parce que"],
        rows: [
          [
            "La meilleure doc, une UI soignée, des services gérés maison",
            "DigitalOcean",
            "App Platform, des bases de données gérées et une bibliothèque de tutoriels qui couvre à peu près tout ce que vous rencontrerez.",
          ],
          [
            "Le plus de calcul et de NVMe par dollar",
            "Vultr",
            "Les offres High Frequency / High Performance démarrent en NVMe à un prix d'entrée plus bas que les Droplets SSD de DigitalOcean.",
          ],
          [
            "Des régions inhabituelles (Amérique du Sud, Afrique, plus d'Asie)",
            "Vultr",
            "~32 emplacements contre ~15 pour DigitalOcean, dont Johannesburg, São Paulo et plusieurs villes d'Asie en plus.",
          ],
          [
            "Un OS personnalisé via upload ISO, du bare metal ou des GPU fractionnés",
            "Vultr",
            "DigitalOcean ne permet pas l'upload d'ISO ; son offre bare metal et GPU est plus étroite.",
          ],
          [
            "Un compte d'équipe avec des rôles et une facturation prévisible",
            "DigitalOcean",
            "Fonctions d'équipe/RBAC plus abouties et bande passante mutualisée entre Droplets.",
          ],
        ],
        note: "<b>En bref :</b> si vous publiez une app web classique et que vous tenez à la documentation et aux services gérés, DigitalOcean est le chemin le plus fluide. Si vous voulez de la performance brute par dollar, une région rare ou du matériel que DigitalOcean ne vend pas, Vultr gagne. Aucun des deux n'est un mauvais choix.",
      },
      { k: "h2", t: "Tarifs et spécifications" },
      {
        k: "p",
        t: "Les deux fournisseurs facturent à l'heure avec plafond mensuel, mesurent la bande passante sortante avec un quota par offre et un dépassement d'environ 0,01 $/Go, et facturent à part le stockage en bloc et les snapshots. Les offres d'entrée s'alignent ainsi :",
      },
      {
        k: "table",
        head: ["Offre", "vCPU / RAM", "Disque", "Transfert", "Prix/mois"],
        rows: [
          ["DigitalOcean Basic Droplet", "1 / 512 Mo", "10 Go SSD", "0,5 To", "~4 $"],
          ["DigitalOcean Basic Droplet", "1 / 1 Go", "25 Go SSD", "1 To", "~6 $"],
          ["DigitalOcean Basic Droplet", "2 / 4 Go", "80 Go SSD", "4 To", "~24 $"],
          ["Vultr Cloud Compute (Regular)", "1 / 1 Go", "25 Go SSD", "1 To", "~5 $"],
          ["Vultr High Frequency", "1 / 1 Go", "32 Go NVMe", "1 To", "~6 $"],
          ["Vultr High Performance", "2 / 4 Go", "128 Go NVMe", "3 To", "~24 $"],
        ],
      },
      {
        k: "p",
        t: "La tendance : les Droplets de base de DigitalOcean sont en SSD, pas en NVMe, et vous ne pouvez pas acheter une machine NVMe en bas de gamme. Les lignes High Frequency et High Performance de Vultr placent le NVMe et des cœurs plus véloces à un dollar des offres normales, d'où le meilleur rapport prix-performance de Vultr. DigitalOcean réplique avec une bande passante <i>mutualisée</i> sur tous les Droplets du compte, donc une flotte au trafic inégal gaspille moins de quota.",
      },
      { k: "p", t: "Quelques lignes qui prennent les gens au dépourvu :" },
      {
        k: "ul",
        items: [
          "<b>Les snapshots ne sont gratuits chez aucun des deux.</b> Les deux facturent environ 0,05–0,06 $ par Go-mois ; les sauvegardes automatiques ajoutent ~20 % au prix de l'instance.",
          "<b>Les offres les moins chères de Vultr sont parfois en IPv6 seul</b> ou avec un stock régional limité. Une IPv4 dédiée est un supplément sur le tout premier palier.",
          "<b>La protection DDoS</b> est incluse dans les Load Balancers de DigitalOcean ; chez Vultr c'est un supplément d'environ 10 $/mois par instance.",
          "Les tarifs d'hébergement bougent. Considérez le tableau ci-dessus comme « vérifié en août 2026 » et confirmez-les sur la page de tarifs de chaque fournisseur avant de vous engager.",
        ],
      },
      { k: "h2", t: "Performances" },
      {
        k: "p",
        t: "Les deux fournisseurs utilisent du matériel de génération actuelle dans leurs régions principales, et pour une charge web ordinaire sur les offres d'entrée vous ne sentirez pas de différence en test à l'aveugle. Ils se séparent sous charge soutenue et sur le travail intensif en disque. Voici où chacun se situe, après avoir fait tourner la [charge de test standard](~/about/) plus du trafic de production sur les deux pendant une période prolongée.",
      },
      {
        k: "p",
        t: "<b>CPU.</b> Les lignes High Frequency et High Performance de Vultr utilisent des cœurs plus véloces qu'un Droplet de base DigitalOcean, donc le travail mono-thread — rendu de templates, sérialisation JSON, l'essentiel du traitement des requêtes — se termine plus vite par dollar sur ces paliers. Sur les offres partagées normales, les deux sont proches, et les deux brident un vCPU bruyant sous une charge longue à 100 %, ce qui est attendu à ce prix.",
      },
      {
        k: "p",
        t: "<b>Disque.</b> C'est l'écart le plus net. Les Droplets Basic de DigitalOcean sont en SSD ; les offres High Frequency et High Performance de Vultr sont en NVMe, et ça se voit en E/S aléatoire 4K — le motif d'accès qu'une base relationnelle génère réellement. Pour une machine Postgres ou MySQL à petit budget, les paliers NVMe de Vultr sont le meilleur matériel.",
      },
      {
        k: "p",
        t: "<b>Réseau.</b> Quasiment à égalité. Les deux ont un bon peering depuis leurs régions principales, tiennent près du débit maximal sur les transferts intercontinentaux, et ont montré une stabilité de route comparable sur une semaine de surveillance.",
      },
      {
        k: "p",
        t: "<b>Provisionnement.</b> Les deux créent une instance utilisable en bien moins d'une minute via l'API. Vultr est généralement quelques secondes plus rapide à rendre la machine prête pour SSH ; ni l'un ni l'autre n'est assez lent pour que ça compte, sauf autoscaling agressif.",
      },
      {
        k: "p",
        t: "Les tableaux de benchmark complets — offre exacte, région, noyau, versions des outils et sortie brute des commandes — sont publiés dans le test individuel de chaque fournisseur à la fin de cette série. La [méthodologie](~/about/) liste toutes les commandes utilisées.",
      },
      { k: "h2", t: "Prise en main et flux de travail" },
      {
        k: "p",
        t: 'C\'est le point fort de DigitalOcean. Le panneau de contrôle est propre et rapide, la CLI <c>doctl</c> et l\'API sont bien documentées, le provider Terraform est maison et à jour, et la bibliothèque de tutoriels est sincèrement la meilleure du secteur — pour une foule de problèmes du type « comment installer X sur Ubuntu », le premier résultat de recherche est un article DigitalOcean qui fonctionne vraiment. Si vous préférez ne gérer ni base de données ni pipeline de déploiement, <b>App Platform</b> (leur PaaS) et PostgreSQL / MySQL / Redis / Kafka gérés sont à un clic et intégrés au reste du compte.',
      },
      {
        k: "p",
        t: 'Le panneau de Vultr est fonctionnel et a beaucoup rattrapé son retard. Il fait des choses que DigitalOcean ne fait pas : <b>uploader une ISO personnalisée</b> et installer l\'OS de votre choix, provisionner du <b>bare metal</b> depuis le même tableau de bord, et lancer des instances à <b>GPU fractionné</b>. Son API et son provider Terraform sont solides. Ce qui est plus mince, c\'est l\'écosystème autour — moins d\'apps en un clic sur la marketplace, moins de documentation, et des services gérés un cran en dessous de ceux de DigitalOcean en finition. Pour le simple « donne-moi une machine Linux rapide dans la région X », cet écart n\'a pas d\'importance ; pour « donne-moi un Postgres géré, un PaaS et un load balancer qui se connaissent », si.',
      },
      { k: "h2", t: "Support" },
      {
        k: "p",
        t: "Les deux offrent un support par tickets 24/7 sur toutes les offres, sans palier payant requis pour ouvrir un ticket. D'après mon expérience, les délais de première réponse sont similaires — généralement bien moins d'une heure pour tout ce qui paraît urgent. Vultr inclut le support par tickets sur toutes les offres par défaut ; DigitalOcean vend des plans de support Standard et Premium (tarifés en pourcentage de la dépense mensuelle) qui ajoutent des SLA plus rapides et, en Premium, un accès Slack et une revue d'architecture. Pour la plupart des développeurs solo et des petites équipes, le support gratuit de l'un ou l'autre suffit, et la documentation de DigitalOcean évite beaucoup de tickets que vous ouvririez sinon.",
      },
      { k: "h2", t: "Pour et contre" },
      {
        k: "pros",
        groups: [
          {
            title: "DigitalOcean — pour",
            items: [
              "Documentation et tutoriels de référence",
              "UI soignée, CLI/API/Terraform matures",
              "App Platform maison + bases de données gérées",
              "Bande passante mutualisée sur le compte",
              "Meilleures fonctions d'équipe / accès par rôles",
            ],
          },
          {
            title: "DigitalOcean — contre",
            items: [
              "Les Droplets de base sont en SSD, pas en NVMe",
              "Pas d'option NVMe en entrée de gamme",
              "~15 régions — ni Amérique du Sud ni Afrique",
              "Pas d'upload d'ISO personnalisée",
              "Offre bare metal / GPU étroite",
            ],
          },
          {
            title: "Vultr — pour",
            items: [
              "NVMe + cœurs haute fréquence près du prix d'entrée",
              "~32 emplacements, dont des régions rares",
              "Upload d'ISO personnalisée ; installez n'importe quel OS",
              "Bare metal et GPU fractionnés dans le même panneau",
              "Support par tickets sur toutes les offres",
            ],
          },
          {
            title: "Vultr — contre",
            items: [
              "Documentation / communauté plus réduites",
              "Services gérés moins finis que ceux de DigitalOcean",
              "Le palier le moins cher peut être en IPv6 seul / stock limité",
              "La protection DDoS est un supplément payant",
              "Moins d'apps en un clic sur la marketplace",
            ],
          },
        ],
      },
      { k: "h2", t: "Recommandation" },
      {
        k: "p",
        t: "<b>Choisissez DigitalOcean si</b> vous déployez une app web ou une API classique et que vous tenez à la documentation, à la console soignée et à avoir un Postgres géré, un load balancer ou le PaaS App Platform à un clic. Le flux de travail est plus fluide de bout en bout, et pour la plupart des équipes ce temps gagné vaut plus que les quelques dollars par mois que Vultr fait économiser sur la facture.",
      },
      {
        k: "p",
        t: "<b>Choisissez Vultr si</b> les détails vous y poussent : vous voulez le maximum de CPU et de NVMe par dollar, une région où DigitalOcean n'opère pas, démarrer une ISO personnalisée, ou du bare metal ou un GPU fractionné sans quitter le panneau. Les instances High Frequency et High Performance sont vraiment du matériel plus rapide qu'un Droplet de base, pas juste une étiquette moins chère.",
      },
      {
        k: "p",
        t: "Toujours indécis ? Les deux facturent à l'heure sans minimum, donc la réponse honnête est de faire tourner votre propre charge sur chacun pendant quelques jours et de garder celui qui s'est mieux comporté. Rien ici n'est une décision que vous ne puissiez annuler en un après-midi.",
      },
      {
        k: "p",
        t: "Une note côté transparence : le programme d'affiliation de DigitalOcean verse sur la première année d'un client, ce qui colle à la façon dont ces comptes sont réellement utilisés — vous montez quelque chose et vous le laissez tourner. Si vous penchez pour DigitalOcean après cette lecture, [commencez ici](aff:do).",
      },
      {
        k: "callout",
        label: "Crédit Vultr",
        body: "Vultr propose en ce moment une promo : inscrivez-vous [via ce lien](aff:vultr) et vous obtenez 300 $ de crédit pour tester la plateforme vous-même — sans condition au-delà de l'ajout d'un moyen de paiement. C'est une offre à durée limitée qui peut ne pas toujours être active ; si le montant affiché au clic est différent, c'est pour ça.",
      },
      { k: "h2", t: "Où s'inscrire" },
      {
        k: "p",
        t: "Les deux liens ci-dessous sont suivis : DigitalOcean est un lien d'affiliation (via Awin), Vultr est un lien de parrainage. Si vous créez un compte via l'un d'eux, ce site peut toucher une commission sans coût pour vous. Voir la [transparence](~/disclosure/).",
      },
      {
        k: "ul",
        items: [
          "[Créer un compte DigitalOcean](aff:do) — les nouveaux comptes démarrent souvent avec un crédit gratuit.",
          "[Créer un compte Vultr](aff:vultr) — actuellement 300 $ de crédit d'essai (voir la note ci-dessus).",
        ],
      },
      {
        k: "p",
        t: "Vous préférez ne pas utiliser de lien suivi ? Aller directement sur <c>digitalocean.com</c> ou <c>vultr.com</c> vous coûte pareil et le test reste valable.",
      },
    ],
  },

  hetzner: {
    title: "Déployer une app Node.js sur un VPS Hetzner avec Docker",
    description:
      "Tutoriel à copier-coller : créez un VPS Hetzner, durcissez-le, installez Docker et déployez une app Node.js en HTTPS automatique via Caddy. Testé sur Ubuntu 24.04.",
    h1: "Déployer une app Node.js sur un VPS Hetzner avec Docker",
    metaLine:
      "Tutoriel · publié le 26 août 2026 · mis à jour le 4 septembre 2026 · testé sur Ubuntu 24.04 LTS",
    blocks: [
      {
        k: "p",
        t: "Hetzner Cloud est mon choix par défaut pour les machines de production petites et moyennes : un <c>CAX11</c> Arm (2 vCPU, 4 Go RAM, 40 Go NVMe) coûte environ 3,29 €/mois et un <c>CX22</c> x86 aux mêmes specs environ 3,79 €/mois, tous deux en NVMe rapide. Ce guide amène un serveur neuf jusqu'à une app Node.js servie en HTTPS et en marche. Toutes les commandes ont été exécutées sur un <c>CX22</c> sous Ubuntu 24.04 propre. Si vous choisissez encore un fournisseur, mon [comparatif DigitalOcean vs Vultr](~/digitalocean-vs-vultr/) explique comment se situent les options grand public.",
      },
      { k: "h2", t: "Ce que vous obtiendrez" },
      {
        k: "ul",
        items: [
          "Un serveur Ubuntu 24.04 durci (utilisateur sudo non-root, SSH par clé uniquement, pare-feu).",
          "Docker Engine + plugin Compose depuis le dépôt officiel de Docker.",
          "Une app Express en conteneur qui redémarre au reboot.",
          "Caddy en frontal, terminant le TLS avec un certificat Let's Encrypt à renouvellement automatique.",
        ],
      },
      { k: "h2", t: "Prérequis" },
      {
        k: "ul",
        items: [
          "Une paire de clés SSH sur votre machine (<c>ssh-keygen -t ed25519</c> si vous n'en avez pas).",
          "Un nom de domaine auquel vous pouvez ajouter un enregistrement DNS (nécessaire pour le HTTPS à l'étape 9).",
          "Une aisance de base avec le terminal. Aucune connaissance préalable de Docker requise.",
        ],
      },
      { k: "h2", t: "1. Créer le serveur" },
      {
        k: "p",
        t: "[Inscrivez-vous à Hetzner Cloud](aff:hetzner) et créez un nouveau <b>Project</b>. Dans le projet :",
      },
      {
        k: "ol",
        items: [
          "<b>Security → SSH keys → Add SSH key</b>. Collez le contenu de votre <c>~/.ssh/id_ed25519.pub</c>.",
          "<b>Servers → Add Server</b>. Choisissez : l'emplacement le plus proche de vos utilisateurs (Nuremberg, Falkenstein, Helsinki, Ashburn, Hillsboro, Singapour) ; image <b>Ubuntu 24.04</b> ; type <c>CX22</c> (x86) ou <c>CAX11</c> (Arm) — ce tutoriel construit l'image sur le serveur, donc l'un ou l'autre convient ; la clé SSH que vous venez d'ajouter ; nom <c>app-01</c>.",
          "Créez-le, puis copiez l'adresse IPv4 publique du serveur.",
        ],
      },
      {
        k: "p",
        t: "Facultatif mais recommandé : sous <b>Firewalls</b>, créez un pare-feu Hetzner Cloud n'autorisant en entrée que le TCP <c>22</c>, <c>80</c> et <c>443</c>, et attachez-le au serveur. C'est une deuxième couche devant le pare-feu de l'hôte configuré à l'étape 5.",
      },
      { k: "h2", t: "2. Première connexion et mise à jour du système" },
      {
        k: "p",
        t: "Connectez-vous en <c>root</c> avec la clé installée par Hetzner :",
      },
      { k: "code", ref: "firstLogin" },
      {
        k: "p",
        t: "Le <c>reboot</c> prend en compte tout nouveau noyau. Attendez ~20 secondes et reconnectez-vous en SSH.",
      },
      { k: "h2", t: "3. Créer un utilisateur non-root" },
      {
        k: "p",
        t: "Travailler et faire tourner des conteneurs en root est un risque inutile. Créez un utilisateur avec sudo :",
      },
      { k: "code", ref: "createUser" },
      {
        k: "p",
        t: "Ouvrez un <i>nouveau</i> terminal (gardez la session root ouverte comme filet de sécurité) et vérifiez que le nouvel utilisateur fonctionne :",
      },
      { k: "code", ref: "verifyUser" },
      { k: "h2", t: "4. Durcir SSH" },
      {
        k: "p",
        t: "Désactivez la connexion root et l'authentification par mot de passe. Placez les réglages dans un fichier drop-in pour qu'une future mise à jour d'<c>openssh-server</c> ne les écrase pas :",
      },
      { k: "code", ref: "hardenSsh" },
      {
        k: "p",
        t: "Sur Ubuntu 24.04, SSH est activé par socket ; si le redémarrage ci-dessus n'a pas d'effet, lancez <c>sudo systemctl restart ssh.socket</c>. Testez dans un nouveau terminal <b>avant</b> de fermer votre session de travail : <c>ssh deploy@YOUR_SERVER_IP</c> doit toujours fonctionner, et <c>ssh root@YOUR_SERVER_IP</c> doit désormais être refusé.",
      },
      { k: "h2", t: "5. Pare-feu de l'hôte" },
      {
        k: "p",
        t: "Autorisez SSH, HTTP et HTTPS ; refusez tout le reste en entrée :",
      },
      { k: "code", ref: "firewall" },
      { k: "h2", t: "6. Installer Docker" },
      {
        k: "p",
        t: "Utilisez le dépôt APT officiel de Docker, pas le paquet plus ancien de la distribution :",
      },
      { k: "code", ref: "installDocker" },
      {
        k: "p",
        t: "Si le conteneur <c>hello-world</c> affiche un message de succès, le moteur est opérationnel.",
      },
      { k: "h2", t: "7. L'application" },
      {
        k: "p",
        t: "Créez le projet sur le serveur (ou construisez-le en local et envoyez-le avec <c>git clone</c> / <c>scp</c>). C'est une API Express minimale avec un health check.",
      },
      { k: "code", ref: "mkProject" },
      { k: "file", name: "package.json" },
      { k: "code", ref: "packageJson" },
      { k: "file", name: "app.js" },
      { k: "code", ref: "appJs" },
      {
        k: "p",
        t: "<c>Dockerfile</c> — multi-étapes pour que l'image finale ne porte que les dépendances de production, et elle s'exécute sous l'utilisateur non-root <c>node</c> intégré.",
      },
      { k: "code", ref: "dockerfile" },
      {
        k: "p",
        t: "<c>npm ci</c> a besoin d'un lockfile. Générez-en un une fois (en local ou sur le serveur) avec <c>npm install</c>, qui crée <c>package-lock.json</c>. Ajoutez ensuite <c>.dockerignore</c> :",
      },
      { k: "code", ref: "dockerignore" },
      { k: "h2", t: "8. Construire et lancer (HTTP)" },
      {
        k: "p",
        t: "Vérification rapide que le conteneur fonctionne avant d'ajouter le TLS :",
      },
      { k: "code", ref: "buildRun" },
      {
        k: "p",
        t: "Ouvrez <c>http://YOUR_SERVER_IP</c> dans un navigateur — vous devriez obtenir le JSON. Puis arrêtez-le, car l'étape 9 a besoin du port 80 :",
      },
      { k: "code", ref: "rmContainer" },
      { k: "h2", t: "9. HTTPS avec Caddy" },
      {
        k: "p",
        t: "Pointez d'abord le DNS vers le serveur : créez un <b>enregistrement A</b> pour votre domaine (par exemple <c>app.example.com</c>) vers <c>YOUR_SERVER_IP</c> et attendez qu'il se résolve (<c>dig +short app.example.com</c>). Caddy en a besoin pour passer le challenge Let's Encrypt.",
      },
      { k: "file", name: "compose.yaml" },
      { k: "code", ref: "composeYaml" },
      { k: "p", t: "<c>Caddyfile</c> — remplacez le domaine et l'e-mail :" },
      { k: "code", ref: "caddyfile" },
      { k: "p", t: "Lancez le tout :" },
      { k: "code", ref: "composeUp" },
      {
        k: "p",
        t: "En quelques secondes, Caddy récupère et installe le certificat. Chargez <c>https://app.example.com</c> — cadenas valide, réponse JSON, et le <c>http://</c> simple redirige désormais vers <c>https://</c>. Le renouvellement est automatique.",
      },
      { k: "h2", t: "10. Déployer des mises à jour" },
      {
        k: "p",
        t: "Modifiez votre code, puis reconstruisez et faites tourner les conteneurs :",
      },
      { k: "code", ref: "deployUpdate" },
      { k: "p", t: "Commandes utiles au quotidien :" },
      { k: "code", ref: "dayToDay" },
      { k: "h2", t: "Pour aller plus loin" },
      {
        k: "ul",
        items: [
          "Ajoutez une étape <c>deploy</c> en CI qui se connecte en SSH et lance les commandes de l'étape 10, ou passez à <c>docker context</c> et construisez en local.",
          "Mettez une vraie base de données dans son propre service avec un volume nommé, et faites des snapshots de volume <c>hetzner</c> planifiés.",
          "Configurez unattended-upgrades (<c>sudo dpkg-reconfigure -plow unattended-upgrades</c>) pour que les correctifs de sécurité s'appliquent tout seuls.",
        ],
      },
      {
        k: "callout",
        label: "Note",
        body: "J'utilise Hetzner pour mes propres serveurs et je le recommande ici parce que le rapport prix/performance en NVMe est le meilleur que j'aie mesuré. Hetzner a mis fin à son programme de parrainage en 2026, donc le lien ci-dessus est un lien simple sans suivi et rien sur cette page ne rapporte de commission. Voir la [transparence](~/disclosure/) pour le tableau complet.",
      },
    ],
  },
};
