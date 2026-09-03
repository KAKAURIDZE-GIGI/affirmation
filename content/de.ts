import type { Dict } from "./schema";

const EMAIL = "gigikakauridze1302@gmail.com";

export const de: Dict = {
  ui: {
    htmlLang: "de",
    nav: { home: "Start", about: "Über", disclosure: "Offenlegung" },
    langLabel: "Sprache",
    skipToContent: "Zum Inhalt springen",
    backToPosts: "← Alle Artikel",
    latest: "Neu",
    footerTagline:
      "Leserfinanziert — einige Links sind Affiliate-Links.",
    footerAbout: "Über",
    footerDisclosure: "Affiliate-Offenlegung",
    footerContact: "Kontakt",
    affiliateNotice:
      "Dieser Artikel enthält Affiliate-Links. Wenn du dich über einen davon anmeldest, kann diese Seite eine Provision erhalten — ohne Mehrkosten für dich. Empfehlungen beruhen auf echten Tests, nicht auf der Provisionshöhe — siehe die [vollständige Offenlegung](~/disclosure/).",
    articleFooter: `Korrekturen und Anfragen: [${EMAIL}](mailto:${EMAIL}).`,
    signup: {
      label: "Neue Tests und Benchmarks per E-Mail erhalten",
      placeholder: "du@beispiel.de",
      button: "Abonnieren",
      note: "Eine E-Mail, wenn ein neuer Benchmark oder Test erscheint. Kein Spam, keine Weitergabe deiner Adresse. Jederzeit abbestellbar.",
    },
    postKind: { Comparison: "Vergleich", Tutorial: "Anleitung" },
    postTitle: {
      "digitalocean-vs-vultr":
        "DigitalOcean vs. Vultr: der Vergleich eines Entwicklers",
      "deploy-node-app-hetzner":
        "Node.js-App mit Docker auf einem Hetzner-VPS deployen",
    },
    postBlurb: {
      "digitalocean-vs-vultr":
        "Preise, Specs, Leistung, Bedienbarkeit und Support von DigitalOcean und Vultr im Vergleich — plus welchen ich wähle, und wann.",
      "deploy-node-app-hetzner":
        "Eine Schritt-für-Schritt-Anleitung: Hetzner-Cloud-Server anlegen, härten, Docker installieren und eine Node.js-App mit automatischem HTTPS ausliefern.",
    },
  },

  home: {
    title: "VPS-Hosting-Tests für Entwickler — Host or Die",
    description:
      "VPS- und Cloud-Hosting-Tests von einem Entwickler: dasselbe Deployment und dieselben Benchmarks bei jedem Anbieter — CPU, Disk-I/O, Netzwerk, Bootzeit. Keine gesponserten Rankings.",
    eyebrow: "Unabhängig · benchmark-basiert",
    h1Lead: "VPS- und Cloud-Hosting-Tests",
    h1Accent: "für Entwickler",
    lead: "Ich deploye echte Anwendungen auf echte Server, lasse auf jedem dieselbe Benchmark-Reihe laufen — CPU, Disk-I/O, Netzwerkdurchsatz, Bootzeit — und schreibe auf, was tatsächlich passiert ist.",
    intro:
      "Kein Anbieter zahlt für einen Platz auf dieser Seite, und kein Test ist gesponsert. Einige Links sind Affiliate-Links; so wird die Hosting-Rechnung bezahlt. Das ändert nie die Zahlen oder die Empfehlung. So laufen die Tests ab: [die Methodik](~/about/), und hier ist die [Affiliate-Offenlegung](~/disclosure/).",
  },

  about: {
    title: "VPS-Benchmark-Methodik — Host or Die",
    description:
      "Wie jeder VPS hier getestet wird: die genauen Tools, die Metriken (CPU, Disk-I/O, Netzwerk, Bootzeit), die Testmaschine und die Regeln, die die Rankings ehrlich halten.",
    h1: "Über und Methodik",
    metaLine: "Von Gigi · Backend- und Infrastruktur-Entwickler",
    blocks: [
      { k: "h2", t: "Wer das schreibt" },
      {
        k: "p",
        t: 'Ich bin Gigi, Backend- und Infrastruktur-Entwickler. Ich habe fast ein Jahrzehnt damit verbracht, Webanwendungen, APIs und Background-Worker auf Linux-Server zu bringen — Bare Metal, VPS und die großen Clouds — und sie am Laufen zu halten. Die Wahl, wo ein Projekt gehostet wird, endete immer in derselben frustrierenden Suche: Marketingseiten voller Adjektive, Benchmarks, die ihr Setup nie offenlegten, und "Top 10"-Listen, sortiert nach Affiliate-Provision.',
      },
      {
        k: "p",
        t: "Host or Die ist mein Versuch, die Ressource zu bauen, die ich wollte: jeder Anbieter durch dasselbe Deployment und dieselben Messungen, mit aufgeschriebener Methode, damit du sie nachvollziehen oder auseinandernehmen kannst. Wenn eine Zahl hier falsch aussieht, sag Bescheid und ich messe sie neu.",
      },
      { k: "h2", t: "Wie jeder Anbieter getestet wird" },
      {
        k: "p",
        t: "Jeder Test startet mit einem frischen Konto und einem neuen Server in der Standardkonfiguration des Anbieters. Sofern ein Test nichts anderes sagt, ist die Testmaschine der günstigste Tarif mit mindestens 1 vCPU und 1 GB RAM, mit <b>Ubuntu 24.04 LTS</b>, in der geografisch nächstgelegenen Region. Ich lege sie zweimal an, an verschiedenen Tagen, und mittle die Ergebnisse.",
      },
      { k: "h3", t: "Die Arbeitslast" },
      {
        k: "p",
        t: "Zuerst kommt ein repräsentatives Deployment: eine Node.js-API in Docker vor PostgreSQL, dazu ein Nginx-Reverse-Proxy mit Let's-Encrypt-Zertifikat. Das deckt reale Reibung auf — Image-Pull-Geschwindigkeit, Build-Zeit, ob dir das Control Panel im Weg steht — bevor irgendwelche synthetischen Zahlen erhoben werden. Meine [Schritt-für-Schritt-Anleitung zum Deployen einer Node.js-App mit Docker auf einem Hetzner-VPS](~/deploy-node-app-hetzner/) durchläuft dieselbe Art von Deployment.",
      },
      { k: "h3", t: "Die Messungen" },
      {
        k: "table",
        head: ["Metrik", "Tool", "Was sie aussagt"],
        rows: [
          [
            "CPU, Single- und Multi-Core",
            "<c>sysbench cpu</c>, <c>stress-ng</c>, <c>7z b</c>",
            'Dauerhafte Rechenleistung für Build-Schritte, Request-Handling und Background-Jobs; ob eine "geteilte" vCPU unter Last drosselt.',
          ],
          [
            "Disk-I/O",
            "<c>fio</c> (4K-Random-Read/Write, 1M sequenziell)",
            'Datenbank-Performance, log-lastige Workloads und wie ehrlich das "NVMe"-Label ist.',
          ],
          [
            "Netzwerkdurchsatz",
            "<c>iperf3</c> zu Drittanbieter-Endpunkten, <c>speedtest-cli</c>",
            "Echter Traffic nach außen in andere Regionen, nicht nur der eigene Speedtest-Spiegel des Anbieters.",
          ],
          [
            "Boot- und Provisionierungszeit",
            "<c>systemd-analyze</c>, API-Zeitstempel, Wanduhr",
            "Wie schnell du hochskalieren oder einen ausgefallenen Knoten ersetzen kannst.",
          ],
          [
            "Latenz",
            "<c>ping</c>, <c>mtr</c>, TTFB von drei Kontinenten",
            "Routen- und Peering-Qualität, nicht nur die Entfernung auf einer Karte.",
          ],
        ],
      },
      { k: "h3", t: "Ebenfalls notiert, aber nicht bewertet" },
      {
        k: "ul",
        items: [
          "Zeit von der Anmeldung bis zu einer nutzbaren SSH-Sitzung.",
          "Ob IPv6, privates Netzwerk, Snapshots und Firewalls inbegriffen sind oder extra kosten.",
          "Traffic-/Bandbreiten-Kontingent und der Preis pro überzähligem GB.",
          "Support: Bei jedem Test wird ein echtes Ticket geöffnet und die Reaktionszeit sowie deren Nützlichkeit festgehalten.",
          "Abrechnungsverhalten — Stunden-Deckel, Mindestbeträge und wie schwer es ist, eine Ressource vollständig zu löschen, damit sie nichts mehr kostet.",
        ],
      },
      { k: "h2", t: "Grundregeln" },
      {
        k: "ul",
        items: [
          "<b>Keine gesponserten Tests.</b> Kein Anbieter bekommt Freigaberecht am Text, ein Embargo oder vorab Einsicht in eine Wertung.",
          "<b>Affiliate-Links verschieben nie das Ranking.</b> Wo ein Empfehlungslink existiert, wird er genutzt; wo keiner existiert, wird der Anbieter trotzdem abgedeckt. Siehe die [Offenlegungsseite](~/disclosure/).",
          "<b>Zahlen enthalten ihr Setup.</b> Tarif, Region, Datum, Kernel und Tool-Versionen werden mit jedem Ergebnis veröffentlicht, damit du es nachstellen kannst.",
          "<b>Tests werden erneut geprüft.</b> Anbieter ändern Hardware und Preise; Aktualisierungen werden datiert ergänzt statt still editiert.",
        ],
      },
      {
        k: "p",
        t: "Die Methode kannst du im [DigitalOcean-vs.-Vultr-Vergleich](~/digitalocean-vs-vultr/) durchgängig angewendet sehen. Einen Fehler entdeckt oder einen Anbieter im Sinn, den ich testen soll? Schreib an [" +
          EMAIL +
          "](mailto:" +
          EMAIL +
          ").",
      },
    ],
  },

  disclosure: {
    title: "Affiliate-Offenlegung — Host or Die",
    description:
      "Wie Host or Die Geld verdient: Einige ausgehende Links sind Affiliate-Links, die eine Provision zahlen — ohne Mehrkosten für dich. Rankings beruhen auf Tests, nicht auf Zahlungen.",
    h1: "Affiliate-Offenlegung",
    blocks: [
      {
        k: "p",
        t: "<b>Diese Seite verdient an einigen ihrer Links eine Provision — ohne Mehrkosten für dich.</b> Wenn du bestimmte Links zu einem Hosting-Anbieter anklickst und dich anschließend anmeldest oder einen Tarif kaufst, kann Host or Die eine Vermittlungsgebühr erhalten. Du zahlst denselben Preis wie beim direkten Weg zum Anbieter — in manchen Fällen weniger, wenn ein Empfehlungslink ein Startguthaben mitbringt.",
      },
      { k: "h2", t: "Was das am Inhalt ändert — nichts" },
      {
        k: "p",
        t: "Die Empfehlungen auf dieser Seite beruhen auf echten Tests und den in der [Methodik](~/about/) beschriebenen Benchmark-Ergebnissen. Sie beruhen nicht darauf, welches Unternehmen am meisten zahlt oder überhaupt zahlt. Konkret:",
      },
      {
        k: "ul",
        items: [
          "Anbieter ohne Affiliate-Programm werden zu exakt denselben Bedingungen getestet und empfohlen wie solche mit Programm.",
          "Provisionssätze sind nie ein Faktor bei einer Wertung, einer Note oder der Reihenfolge, in der Anbieter erscheinen.",
          "Kein Anbieter erhält Zahlung, Gratis-Hosting, Freigaberecht am Text oder vorab Einsicht in einen Test als Gegenleistung für Berichterstattung.",
          "Wenn sich eine Empfehlung ändert, weil sich die Tests geändert haben, bleibt die alte Wertung mit einem datierten Update sichtbar.",
        ],
      },
      { k: "h2", t: "Wo Affiliate-Links erscheinen" },
      {
        k: "p",
        t: 'Affiliate-Links können in Vergleichen und Anleitungen auftauchen, in klar gekennzeichneten "Wo anmelden"-Abschnitten und im Footer der Seite. Jede Seite, die sie enthält, trägt oben einen Offenlegungshinweis, nicht nur diese Seite. Rein informative Links — Dokumentation, Statusseiten, Quellcode, als Referenz zitierte Preisseiten — sind keine Affiliate-Links.',
      },
      { k: "h2", t: "Programme, an denen diese Seite teilnimmt" },
      {
        k: "p",
        t: "Host or Die verdient Vermittlungsprovision über Affiliate-Programme, die direkt von Hosting-Anbietern betrieben werden, sowie über das Affiliate-Netzwerk [Awin](https://www.awin.com/). Wenn eine Empfehlung einen Affiliate-Link enthält, wird der Anbieter, auf den er zeigt, im Offenlegungshinweis oben auf dieser Seite genannt.",
      },
      {
        k: "p",
        t: "Stand September 2026 unterhält diese Seite eine aktive Affiliate-Beziehung mit <b>DigitalOcean</b> (über Awin) und eine Empfehlungsbeziehung mit <b>Vultr</b>. Links zu Hetzner und anderen genannten Anbietern sind keine Affiliate-Links: Hetzner hat sein Empfehlungsprogramm 2026 eingestellt, und mit den anderen besteht keine Vereinbarung. Dieser Abschnitt wird aktualisiert, sobald sich das ändert.",
      },
      { k: "h2", t: "FTC und Werbestandards" },
      {
        k: "p",
        t: "Diese Offenlegung erfolgt zur Einhaltung der <i>Guides Concerning the Use of Endorsements and Testimonials in Advertising</i> der US-Handelsbehörde FTC (16 CFR Part 255) sowie gleichwertiger Vorgaben andernorts, einschließlich des britischen CAP Code. Die Absicht ist einfach: Du sollst immer wissen, wann ein Link dieser Seite Geld einbringen kann.",
      },
      { k: "h2", t: "Fragen" },
      {
        k: "p",
        t: "Schreib an [" + EMAIL + "](mailto:" + EMAIL + ") und ich antworte.",
      },
      { k: "p", t: "<i>Zuletzt aktualisiert: 4. September 2026.</i>" },
    ],
  },

  dovv: {
    title: "DigitalOcean vs. Vultr: Entwickler-Vergleich (2026)",
    description:
      "DigitalOcean oder Vultr? Ein praxisnaher Vergleich von Preisen, Specs, realer Leistung, Support und Bedienbarkeit — plus welchen du wann wählen solltest.",
    h1: "DigitalOcean vs. Vultr: der Vergleich eines Entwicklers",
    metaLine:
      "Vergleich · veröffentlicht am 12. August 2026 · aktualisiert am 4. September 2026 · Preise geprüft im August 2026",
    blocks: [
      { k: "affiliateNotice" },
      {
        k: "p",
        t: "DigitalOcean und Vultr sitzen im selben Marktsegment: unmanaged Linux-VPS-Instanzen, stundenweise abgerechnet mit Monatsdeckel, gedacht für Entwickler, die mit einem Terminal umgehen können. Sie liegen nah genug beieinander, dass die Entscheidung meist auf drei Dinge hinausläuft — wie breit du geografisch aufgestellt sein musst, ob du gemanagte Zusatzdienste aus einer Hand willst, und wie sehr dir zählt, das meiste an Rechenleistung pro Dollar herauszuholen.",
      },
      {
        k: "p",
        t: "Ich halte beide Konten dauerhaft aktiv und deploye auf jedem denselben Referenz-Stack (eine Node.js-API in Docker vor PostgreSQL, hinter Nginx mit Let's-Encrypt-Zertifikat) — dasselbe Setup, das meine [Node.js-auf-Hetzner-mit-Docker-Anleitung](~/deploy-node-app-hetzner/) abdeckt. Dieser Beitrag ist die qualitative Seite — Preise, Funktionen, Workflow, Support. Die synthetischen Benchmark-Zahlen bekommen weiter unten einen eigenen Abschnitt; wie sie erhoben werden, steht in der [Methodik](~/about/).",
      },
      {
        k: "verdict",
        heading: "Kurzurteil",
        head: ["Wenn du willst …", "Nimm", "Weil"],
        rows: [
          [
            "Beste Doku, aufgeräumte UI, gemanagte Dienste aus einer Hand",
            "DigitalOcean",
            "App Platform, gemanagte Datenbanken und eine Tutorial-Bibliothek, die fast alles abdeckt, worauf du stößt.",
          ],
          [
            "Am meisten Rechenleistung und NVMe pro Dollar",
            "Vultr",
            "Die Tarife High Frequency / High Performance starten mit NVMe zu einem niedrigeren Einstiegspreis als die SSD-Droplets von DigitalOcean.",
          ],
          [
            "Ungewöhnliche Regionen (Südamerika, Afrika, mehr Asien)",
            "Vultr",
            "~32 Standorte gegenüber ~15 bei DigitalOcean, darunter Johannesburg, São Paulo und mehrere zusätzliche asiatische Städte.",
          ],
          [
            "Eigenes OS per ISO-Upload, Bare Metal oder anteilige GPUs",
            "Vultr",
            "DigitalOcean hat keinen ISO-Upload; das Bare-Metal- und GPU-Angebot ist schmaler.",
          ],
          [
            "Ein Team-Konto mit Rollen und planbarer Abrechnung",
            "DigitalOcean",
            "Reifere Team-/RBAC-Funktionen und über Droplets hinweg gepoolte Bandbreite.",
          ],
        ],
        note: "<b>Kurzfassung:</b> Wenn du eine typische Web-App ausrollst und Wert auf Dokumentation und gemanagte Zusatzdienste legst, ist DigitalOcean der glattere Weg. Wenn du rohe Leistung pro Dollar willst, eine ausgefallene Region oder Hardware, die DigitalOcean nicht verkauft, gewinnt Vultr. Keiner von beiden ist eine schlechte Wahl.",
      },
      { k: "h2", t: "Preise und Specs" },
      {
        k: "p",
        t: "Beide Anbieter rechnen stundenweise mit Monatsdeckel ab, messen den ausgehenden Traffic mit einem Kontingent pro Tarif und rund 0,01 $/GB Überschreitung, und berechnen Block-Storage und Snapshots separat. Die Einstiegstarife liegen so:",
      },
      {
        k: "table",
        head: ["Tarif", "vCPU / RAM", "Disk", "Transfer", "Preis/Mon."],
        rows: [
          ["DigitalOcean Basic Droplet", "1 / 512 MB", "10 GB SSD", "0,5 TB", "~4 $"],
          ["DigitalOcean Basic Droplet", "1 / 1 GB", "25 GB SSD", "1 TB", "~6 $"],
          ["DigitalOcean Basic Droplet", "2 / 4 GB", "80 GB SSD", "4 TB", "~24 $"],
          ["Vultr Cloud Compute (Regular)", "1 / 1 GB", "25 GB SSD", "1 TB", "~5 $"],
          ["Vultr High Frequency", "1 / 1 GB", "32 GB NVMe", "1 TB", "~6 $"],
          ["Vultr High Performance", "2 / 4 GB", "128 GB NVMe", "3 TB", "~24 $"],
        ],
      },
      {
        k: "p",
        t: "Das Muster: Die Basis-Droplets von DigitalOcean sind SSD, nicht NVMe, und eine NVMe-Maschine am unteren Ende gibt es nicht. Vultrs Linien High Frequency und High Performance bringen NVMe und höher getaktete Kerne für einen Dollar Aufpreis gegenüber den normalen Tarifen — deshalb steht Vultr beim Preis-Leistungs-Verhältnis meist besser da. DigitalOcean kontert mit Bandbreite, die über alle Droplets des Kontos <i>gepoolt</i> ist, sodass eine Flotte mit ungleichem Traffic weniger Kontingent verschenkt.",
      },
      { k: "p", t: "Ein paar Posten, die Leute überraschen:" },
      {
        k: "ul",
        items: [
          "<b>Snapshots sind bei keinem von beiden kostenlos.</b> Beide berechnen rund 0,05–0,06 $ pro GB-Monat; automatische Backups schlagen ~20 % auf den Instanzpreis.",
          "<b>Vultrs günstigste Tarife sind mitunter nur IPv6</b> oder haben begrenzten regionalen Bestand. Eine dedizierte IPv4 ist auf der untersten Stufe ein Aufpreis.",
          "<b>DDoS-Schutz</b> ist bei den Load Balancern von DigitalOcean enthalten; bei Vultr kostet er ~10 $/Mon. pro Instanz extra.",
          'Hosting-Preise bewegen sich. Nimm die Tabelle oben als "geprüft im August 2026" und bestätige sie auf der Preisseite des jeweiligen Anbieters, bevor du dich festlegst.',
        ],
      },
      { k: "h2", t: "Leistung" },
      {
        k: "p",
        t: "Beide Anbieter nutzen in ihren Hauptregionen Hardware der aktuellen Generation, und bei einer gewöhnlichen Web-Last auf den Einstiegstarifen spürst du im Blindtest keinen Unterschied. Sie trennen sich unter Dauerlast und bei disk-lastiger Arbeit. Hier steht, wo jeder landet — aus dem Betrieb der [Standard-Testlast](~/about/) plus Produktions-Traffic auf beiden über einen längeren Zeitraum.",
      },
      {
        k: "p",
        t: "<b>CPU.</b> Vultrs Linien High Frequency und High Performance nutzen höher getaktete Kerne als ein Basis-Droplet von DigitalOcean, daher endet Single-Thread-Arbeit — Template-Rendering, JSON-Serialisierung, der Großteil des Request-Handlings — auf diesen Stufen pro Dollar schneller. Auf den normalen Shared-Tarifen liegen die beiden nah beieinander, und beide drosseln eine laute vCPU unter langer 100-%-Last, was bei diesem Preis zu erwarten ist.",
      },
      {
        k: "p",
        t: "<b>Disk.</b> Das ist der klarste Abstand. Die Basic-Droplets von DigitalOcean sind SSD; Vultrs Tarife High Frequency und High Performance sind NVMe, und das zeigt sich bei 4K-Random-I/O — dem Zugriffsmuster, das eine relationale Datenbank tatsächlich erzeugt. Für eine Postgres- oder MySQL-Maschine mit knappem Budget sind Vultrs NVMe-Stufen die bessere Hardware.",
      },
      {
        k: "p",
        t: "<b>Netzwerk.</b> Weitgehend ausgeglichen. Beide haben von ihren Hauptregionen gutes Peering, halten bei interkontinentalen Transfers nahe der Leitungsrate und zeigten über eine Woche Monitoring vergleichbare Routenstabilität.",
      },
      {
        k: "p",
        t: "<b>Provisionierung.</b> Beide erstellen über die API in deutlich unter einer Minute eine nutzbare Instanz. Vultr ist meist ein paar Sekunden schneller bis zur SSH-bereiten Maschine; keiner ist so langsam, dass es zählt — außer bei aggressivem Autoscaling.",
      },
      {
        k: "p",
        t: "Vollständige Benchmark-Tabellen — genauer Tarif, Region, Kernel, Tool-Versionen und Roh-Ausgabe der Befehle — werden im jeweiligen Einzeltest des Anbieters veröffentlicht, sobald diese Runde abgeschlossen ist. Die [Methodik](~/about/) listet jeden verwendeten Befehl auf.",
      },
      { k: "h2", t: "Bedienbarkeit und Entwickler-Workflow" },
      {
        k: "p",
        t: 'Das ist DigitalOceans stärkster Bereich. Das Control Panel ist aufgeräumt und schnell, die CLI <c>doctl</c> und die API sind gut dokumentiert, der Terraform-Provider ist aus erster Hand und aktuell, und die Tutorial-Bibliothek ist ehrlich die beste der Branche — bei einer riesigen Bandbreite an "Wie richte ich X unter Ubuntu ein"-Problemen ist das oberste Suchergebnis ein DigitalOcean-Artikel, der tatsächlich funktioniert. Wenn du weder Datenbank noch Deploy-Pipeline selbst verwalten willst, sind <b>App Platform</b> (ihr PaaS) und gemanagtes PostgreSQL / MySQL / Redis / Kafka einen Klick entfernt und mit dem Rest des Kontos verzahnt.',
      },
      {
        k: "p",
        t: 'Vultrs Panel ist funktional und hat viel aufgeholt. Es kann Dinge, die DigitalOcean nicht kann: eine <b>eigene ISO hochladen</b> und jedes beliebige OS installieren, <b>Bare Metal</b> aus demselben Dashboard provisionieren und Instanzen mit <b>anteiliger GPU</b> starten. API und Terraform-Provider sind solide. Dünner ist das drumherum liegende Ökosystem — weniger Ein-Klick-Marketplace-Apps, weniger Dokumentation und gemanagte Zusatzdienste, die in der Ausarbeitung einen Schritt hinter denen von DigitalOcean liegen. Für das reine "gib mir eine schnelle Linux-Maschine in Region X" spielt diese Lücke keine Rolle; für "gib mir ein gemanagtes Postgres, ein PaaS und einen Load Balancer, die voneinander wissen" schon.',
      },
      { k: "h2", t: "Support" },
      {
        k: "p",
        t: "Beide bieten auf jedem Tarif 24/7-Ticket-Support, ohne dass ein Bezahltarif nötig wäre, um ein Ticket zu öffnen. Meiner Erfahrung nach sind die Zeiten bis zur ersten Antwort ähnlich — meist deutlich unter einer Stunde bei allem, was dringend aussieht. Vultr enthält Ticket-Support standardmäßig auf allen Tarifen; DigitalOcean verkauft Support-Pläne Standard und Premium (als Prozentsatz der monatlichen Ausgaben), die schnellere SLAs bringen und bei Premium Slack-Zugang und ein Architektur-Review. Für die meisten Solo-Entwickler und kleinen Teams reicht der kostenlose Support bei beiden, und DigitalOceans Dokumentation erspart viele Tickets, die du sonst öffnen würdest.",
      },
      { k: "h2", t: "Vor- und Nachteile" },
      {
        k: "pros",
        groups: [
          {
            title: "DigitalOcean — dafür",
            items: [
              "Erstklassige Dokumentation und Tutorials",
              "Aufgeräumte UI, reife CLI/API/Terraform",
              "App Platform aus erster Hand + gemanagte Datenbanken",
              "Über das Konto gepoolte Bandbreite",
              "Stärkere Team- / rollenbasierte Zugriffsfunktionen",
            ],
          },
          {
            title: "DigitalOcean — dagegen",
            items: [
              "Basis-Droplets sind SSD, nicht NVMe",
              "Keine NVMe-Option am unteren Ende",
              "~15 Regionen — kein Südamerika, kein Afrika",
              "Kein eigener ISO-Upload",
              "Schmales Bare-Metal- / GPU-Angebot",
            ],
          },
          {
            title: "Vultr — dafür",
            items: [
              "NVMe + hoch getaktete Kerne nahe am Einstiegspreis",
              "~32 Standorte, darunter seltene Regionen",
              "Eigener ISO-Upload; installiere jedes OS",
              "Bare Metal und anteilige GPUs im selben Panel",
              "Ticket-Support auf jedem Tarif",
            ],
          },
          {
            title: "Vultr — dagegen",
            items: [
              "Kleinere Doku / Community",
              "Gemanagte Zusatzdienste weniger ausgereift als bei DigitalOcean",
              "Günstigste Stufe ggf. nur IPv6 / begrenzter Bestand",
              "DDoS-Schutz ist ein kostenpflichtiger Aufpreis",
              "Weniger Ein-Klick-Marketplace-Apps",
            ],
          },
        ],
      },
      { k: "h2", t: "Empfehlung" },
      {
        k: "p",
        t: "<b>Nimm DigitalOcean, wenn</b> du eine typische Web-App oder API ausrollst und Wert auf die Dokumentation, die aufgeräumte Konsole und ein gemanagtes Postgres, einen Load Balancer oder das PaaS App Platform einen Klick entfernt legst. Der Workflow ist durchgängig glatter, und für die meisten Teams ist diese gesparte Zeit mehr wert als die paar Dollar im Monat, die Vultr von der Rechnung abzieht.",
      },
      {
        k: "p",
        t: "<b>Nimm Vultr, wenn</b> die Details dorthin zeigen: Du willst das meiste an CPU und NVMe pro Dollar, eine Region, in der DigitalOcean nicht arbeitet, eine eigene ISO booten, oder Bare Metal bzw. eine anteilige GPU, ohne das Panel zu wechseln. Die Instanzen High Frequency und High Performance sind wirklich schnellere Hardware als ein Basis-Droplet, nicht nur ein günstigeres Etikett.",
      },
      {
        k: "p",
        t: "Noch unentschlossen? Beide rechnen stundenweise ohne Mindestlaufzeit ab, also lautet die ehrliche Antwort: Lass deine eigene Last ein paar Tage auf jedem laufen und behalte den, der sich besser angefühlt hat. Nichts hier ist eine Entscheidung, die du nicht an einem Nachmittag rückgängig machen kannst.",
      },
      {
        k: "p",
        t: "Eine Anmerkung zur Offenlegung: DigitalOceans Affiliate-Programm zahlt über das erste Jahr eines Kunden aus, was dazu passt, wie diese Konten tatsächlich genutzt werden — du stellst etwas auf und lässt es laufen. Wenn du nach dieser Lektüre zu DigitalOcean neigst, [starte hier](aff:do).",
      },
      {
        k: "callout",
        label: "Vultr-Guthaben",
        body: "Vultr fährt gerade eine Aktion: Melde dich [über diesen Link](aff:vultr) an und du erhältst 300 $ Guthaben, um die Plattform selbst zu testen — ohne Bedingungen außer dem Hinterlegen einer Zahlungsmethode. Es ist ein zeitlich begrenztes Angebot und ist womöglich nicht immer aktiv; wenn der beim Klick angezeigte Betrag abweicht, liegt es daran.",
      },
      { k: "h2", t: "Wo anmelden" },
      {
        k: "p",
        t: "Die beiden Links unten sind getrackt: DigitalOcean ist ein Affiliate-Link (über Awin), Vultr ist ein Empfehlungslink. Wenn du über einen davon ein Konto erstellst, kann diese Seite eine Provision erhalten — ohne Kosten für dich. Siehe die [Offenlegung](~/disclosure/).",
      },
      {
        k: "ul",
        items: [
          "[DigitalOcean-Konto erstellen](aff:do) — neue Konten starten oft mit Gratis-Guthaben.",
          "[Vultr-Konto erstellen](aff:vultr) — derzeit 300 $ Testguthaben (siehe Hinweis oben).",
        ],
      },
      {
        k: "p",
        t: "Lieber keinen getrackten Link nutzen? Direkt zu <c>digitalocean.com</c> oder <c>vultr.com</c> zu gehen kostet dich dasselbe und der Test gilt trotzdem.",
      },
    ],
  },

  hetzner: {
    title: "Node.js-App mit Docker auf einem Hetzner-VPS deployen",
    description:
      "Copy-and-paste-Anleitung: Hetzner-VPS anlegen, härten, Docker installieren und eine Node.js-App mit automatischem HTTPS via Caddy deployen. Getestet auf Ubuntu 24.04.",
    h1: "Node.js-App mit Docker auf einem Hetzner-VPS deployen",
    metaLine:
      "Anleitung · veröffentlicht am 26. August 2026 · aktualisiert am 4. September 2026 · getestet auf Ubuntu 24.04 LTS",
    blocks: [
      {
        k: "p",
        t: "Hetzner Cloud ist meine Standardwahl für kleine bis mittlere Produktionsmaschinen: ein Arm-<c>CAX11</c> (2 vCPU, 4 GB RAM, 40 GB NVMe) kostet rund 3,29 €/Monat und ein x86-<c>CX22</c> mit denselben Specs rund 3,79 €/Monat, beide auf schnellem NVMe. Diese Anleitung bringt einen frischen Server bis zu einer laufenden, per HTTPS ausgelieferten Node.js-App. Jeder Befehl hier lief auf einem sauberen <c>CX22</c> mit Ubuntu 24.04. Wenn du noch einen Anbieter wählst, erklärt mein [DigitalOcean-vs.-Vultr-Vergleich](~/digitalocean-vs-vultr/), wie die gängigen Optionen dastehen.",
      },
      { k: "h2", t: "Was am Ende dabei herauskommt" },
      {
        k: "ul",
        items: [
          "Ein gehärteter Ubuntu-24.04-Server (Non-Root-Sudo-Benutzer, SSH nur per Schlüssel, Firewall).",
          "Docker Engine + Compose-Plugin aus dem offiziellen Docker-Repo.",
          "Eine containerisierte Express-App, die beim Reboot neu startet.",
          "Caddy davor, das TLS mit einem sich automatisch erneuernden Let's-Encrypt-Zertifikat terminiert.",
        ],
      },
      { k: "h2", t: "Voraussetzungen" },
      {
        k: "ul",
        items: [
          "Ein SSH-Schlüsselpaar auf deiner Maschine (<c>ssh-keygen -t ed25519</c>, falls du keines hast).",
          "Ein Domainname, zu dem du einen DNS-Eintrag hinzufügen kannst (für das HTTPS in Schritt 9 nötig).",
          "Grundlegende Terminal-Vertrautheit. Keine Docker-Vorkenntnisse erforderlich.",
        ],
      },
      { k: "h2", t: "1. Den Server erstellen" },
      {
        k: "p",
        t: "[Melde dich bei Hetzner Cloud an](aff:hetzner) und lege ein neues <b>Project</b> an. Im Projekt:",
      },
      {
        k: "ol",
        items: [
          "<b>Security → SSH keys → Add SSH key</b>. Füge den Inhalt deiner <c>~/.ssh/id_ed25519.pub</c> ein.",
          "<b>Servers → Add Server</b>. Wähle: den Standort, der deinen Nutzern am nächsten ist (Nürnberg, Falkenstein, Helsinki, Ashburn, Hillsboro, Singapur); Image <b>Ubuntu 24.04</b>; Typ <c>CX22</c> (x86) oder <c>CAX11</c> (Arm) — diese Anleitung baut das Image auf dem Server, also passt beides; den gerade hinzugefügten SSH-Schlüssel; Name <c>app-01</c>.",
          "Erstelle ihn und kopiere dann die öffentliche IPv4-Adresse des Servers.",
        ],
      },
      {
        k: "p",
        t: "Optional, aber empfohlen: Erstelle unter <b>Firewalls</b> eine Hetzner-Cloud-Firewall, die eingehend nur TCP <c>22</c>, <c>80</c> und <c>443</c> erlaubt, und hänge sie an den Server. Das ist eine zweite Schicht vor der Host-Firewall, die wir in Schritt 5 einrichten.",
      },
      { k: "h2", t: "2. Erste Anmeldung und System-Update" },
      {
        k: "p",
        t: "Verbinde dich als <c>root</c> mit dem Schlüssel, den Hetzner installiert hat:",
      },
      { k: "code", ref: "firstLogin" },
      {
        k: "p",
        t: "Der <c>reboot</c> übernimmt einen etwaigen neuen Kernel. Warte ~20 Sekunden und verbinde dich per SSH neu.",
      },
      { k: "h2", t: "3. Einen Non-Root-Benutzer anlegen" },
      {
        k: "p",
        t: "Container und Alltagsarbeit als Root sind ein unnötiges Risiko. Lege einen Benutzer mit Sudo an:",
      },
      { k: "code", ref: "createUser" },
      {
        k: "p",
        t: "Öffne ein <i>neues</i> Terminal (lass die Root-Sitzung als Sicherheitsnetz offen) und bestätige, dass der neue Benutzer funktioniert:",
      },
      { k: "code", ref: "verifyUser" },
      { k: "h2", t: "4. SSH härten" },
      {
        k: "p",
        t: "Deaktiviere Root-Login und Passwort-Authentifizierung. Leg die Overrides in eine Drop-in-Datei, damit ein künftiges <c>openssh-server</c>-Update sie nicht überschreibt:",
      },
      { k: "code", ref: "hardenSsh" },
      {
        k: "p",
        t: "Unter Ubuntu 24.04 ist SSH socket-aktiviert; wenn der Neustart oben keine Wirkung zeigt, führe <c>sudo systemctl restart ssh.socket</c> aus. Teste in einem neuen Terminal <b>bevor</b> du deine Arbeitssitzung schließt: <c>ssh deploy@YOUR_SERVER_IP</c> muss weiterhin funktionieren, und <c>ssh root@YOUR_SERVER_IP</c> muss jetzt abgelehnt werden.",
      },
      { k: "h2", t: "5. Host-Firewall" },
      {
        k: "p",
        t: "Erlaube SSH, HTTP und HTTPS; verweigere alles andere eingehend:",
      },
      { k: "code", ref: "firewall" },
      { k: "h2", t: "6. Docker installieren" },
      {
        k: "p",
        t: "Nutze das offizielle APT-Repository von Docker, nicht das ältere Distributionspaket:",
      },
      { k: "code", ref: "installDocker" },
      {
        k: "p",
        t: "Wenn der Container <c>hello-world</c> eine Erfolgsmeldung ausgibt, läuft die Engine.",
      },
      { k: "h2", t: "7. Die Anwendung" },
      {
        k: "p",
        t: "Erstelle das Projekt auf dem Server (oder baue es lokal und lade es per <c>git clone</c> / <c>scp</c> hoch). Es ist eine minimale Express-API mit einem Health-Check.",
      },
      { k: "code", ref: "mkProject" },
      { k: "file", name: "package.json" },
      { k: "code", ref: "packageJson" },
      { k: "file", name: "app.js" },
      { k: "code", ref: "appJs" },
      {
        k: "p",
        t: "<c>Dockerfile</c> — mehrstufig, damit das finale Image nur Produktionsabhängigkeiten trägt, und es läuft als der eingebaute Non-Root-Benutzer <c>node</c>.",
      },
      { k: "code", ref: "dockerfile" },
      {
        k: "p",
        t: "<c>npm ci</c> braucht ein Lockfile. Erzeuge einmal eines (lokal oder auf dem Server) mit <c>npm install</c>, das <c>package-lock.json</c> anlegt. Füge dann <c>.dockerignore</c> hinzu:",
      },
      { k: "code", ref: "dockerignore" },
      { k: "h2", t: "8. Bauen und starten (HTTP)" },
      {
        k: "p",
        t: "Kurzer Check, dass der Container funktioniert, bevor TLS dazukommt:",
      },
      { k: "code", ref: "buildRun" },
      {
        k: "p",
        t: "Öffne <c>http://YOUR_SERVER_IP</c> im Browser — du solltest das JSON bekommen. Stoppe ihn dann, denn Schritt 9 braucht Port 80:",
      },
      { k: "code", ref: "rmContainer" },
      { k: "h2", t: "9. HTTPS mit Caddy" },
      {
        k: "p",
        t: "Richte zuerst das DNS auf den Server: Lege einen <b>A-Eintrag</b> für deine Domain an (etwa <c>app.example.com</c>) auf <c>YOUR_SERVER_IP</c> und warte, bis er auflöst (<c>dig +short app.example.com</c>). Caddy braucht das, um die Let's-Encrypt-Challenge zu bestehen.",
      },
      { k: "file", name: "compose.yaml" },
      { k: "code", ref: "composeYaml" },
      { k: "p", t: "<c>Caddyfile</c> — ersetze Domain und E-Mail:" },
      { k: "code", ref: "caddyfile" },
      { k: "p", t: "Alles hochfahren:" },
      { k: "code", ref: "composeUp" },
      {
        k: "p",
        t: "Innerhalb weniger Sekunden holt und installiert Caddy das Zertifikat. Lade <c>https://app.example.com</c> — gültiges Schloss, JSON-Antwort, und einfaches <c>http://</c> leitet jetzt auf <c>https://</c> um. Die Erneuerung ist automatisch.",
      },
      { k: "h2", t: "10. Updates ausrollen" },
      {
        k: "p",
        t: "Ändere deinen Code, dann neu bauen und die Container durchrollen:",
      },
      { k: "code", ref: "deployUpdate" },
      { k: "p", t: "Nützliche Befehle für den Alltag:" },
      { k: "code", ref: "dayToDay" },
      { k: "h2", t: "Wie es weitergeht" },
      {
        k: "ul",
        items: [
          "Füge in der CI einen <c>deploy</c>-Schritt hinzu, der sich per SSH einloggt und die Befehle aus Schritt 10 ausführt, oder wechsle zu <c>docker context</c> und baue lokal.",
          "Setz eine echte Datenbank in einen eigenen Dienst mit benanntem Volume und mach nach Zeitplan <c>hetzner</c>-Volume-Snapshots.",
          "Richte unattended-upgrades ein (<c>sudo dpkg-reconfigure -plow unattended-upgrades</c>), damit Sicherheitspatches von selbst eingespielt werden.",
        ],
      },
      {
        k: "callout",
        label: "Hinweis",
        body: "Ich nutze Hetzner für meine eigenen Server und empfehle es hier, weil das Preis-zu-NVMe-Leistungs-Verhältnis das beste ist, das ich gemessen habe. Hetzner hat sein Empfehlungsprogramm 2026 eingestellt, daher ist der Link oben ein einfacher, nicht getrackter Link, und nichts auf dieser Seite bringt Provision. Das ganze Bild steht in der [Offenlegung](~/disclosure/).",
      },
    ],
  },
};
