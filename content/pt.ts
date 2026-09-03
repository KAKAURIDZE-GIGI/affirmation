import type { Dict } from "./schema";

const EMAIL = "gigikakauridze1302@gmail.com";

export const pt: Dict = {
  ui: {
    htmlLang: "pt-BR",
    nav: { home: "Início", about: "Sobre", disclosure: "Divulgação" },
    langLabel: "Idioma",
    skipToContent: "Pular para o conteúdo",
    backToPosts: "← Todos os artigos",
    latest: "Mais recentes",
    footerTagline:
      "Financiado pelos leitores — alguns links são de afiliado.",
    footerAbout: "Sobre",
    footerDisclosure: "Divulgação de afiliados",
    footerContact: "Contato",
    affiliateNotice:
      "Este artigo contém links de afiliado. Se você se cadastrar por um deles, este site pode ganhar uma comissão sem custo extra para você. As recomendações se baseiam em testes práticos, não no valor da comissão — veja a [divulgação completa](~/disclosure/).",
    articleFooter: `Correções e pedidos: [${EMAIL}](mailto:${EMAIL}).`,
    signup: {
      label: "Receba novas análises e benchmarks por e-mail",
      placeholder: "voce@exemplo.com",
      button: "Assinar",
      note: "Um e-mail quando sai um novo benchmark ou análise. Sem spam, sem compartilhar seu endereço. Cancele quando quiser.",
    },
    postKind: { Comparison: "Comparativo", Tutorial: "Tutorial" },
    postTitle: {
      "digitalocean-vs-vultr":
        "DigitalOcean vs Vultr: o comparativo de um desenvolvedor",
      "deploy-node-app-hetzner":
        "Faça deploy de uma app Node.js em um VPS da Hetzner com Docker",
    },
    postBlurb: {
      "digitalocean-vs-vultr":
        "Preços, especificações, desempenho, facilidade de uso e suporte comparados entre DigitalOcean e Vultr — e qual eu escolho, e quando.",
      "deploy-node-app-hetzner":
        "Um tutorial passo a passo: crie um servidor na Hetzner Cloud, reforce-o, instale o Docker e publique uma app Node.js com HTTPS automático.",
    },
  },

  home: {
    title: "Análises de hospedagem VPS para devs — Host or Die",
    description:
      "Análises de hospedagem VPS e em nuvem feitas por um desenvolvedor: o mesmo deploy e os mesmos benchmarks em cada provedor — CPU, disco, rede, boot. Sem rankings patrocinados.",
    eyebrow: "Independente · baseado em benchmarks",
    h1Lead: "Análises de hospedagem VPS e em nuvem",
    h1Accent: "para desenvolvedores",
    lead: "Eu faço deploy de aplicações reais em servidores reais, rodo a mesma bateria de benchmarks em cada um — CPU, E/S de disco, throughput de rede, tempo de boot — e escrevo o que de fato aconteceu.",
    intro:
      "Nenhum provedor paga por um lugar neste site e nenhuma análise é patrocinada. Alguns links são de afiliado, e é assim que a conta da hospedagem é paga; isso nunca muda os números nem a recomendação. Veja como os testes funcionam: [a metodologia](~/about/), e aqui está a [divulgação de afiliados](~/disclosure/).",
  },

  about: {
    title: "Metodologia de benchmarks de VPS — Host or Die",
    description:
      "Como cada VPS é testado aqui: as ferramentas exatas, as métricas (CPU, disco, rede, boot), a máquina de teste e as regras que mantêm os rankings honestos.",
    h1: "Sobre e metodologia",
    metaLine: "Por Gigi · desenvolvedor de backend e infraestrutura",
    blocks: [
      { k: "h2", t: "Quem escreve isto" },
      {
        k: "p",
        t: 'Sou o Gigi, desenvolvedor de backend e infraestrutura. Passei quase uma década colocando aplicações web, APIs e workers em background em servidores Linux — bare metal, VPS e as grandes nuvens — e mantendo tudo no ar. Escolher onde hospedar um projeto sempre acabava na mesma busca frustrante: páginas de marketing cheias de adjetivos, benchmarks que nunca revelavam a configuração e listas "top 10" ordenadas por comissão de afiliado.',
      },
      {
        k: "p",
        t: "O Host or Die é minha tentativa de criar o recurso que eu queria: cada provedor submetido ao mesmo deploy e às mesmas medições, com o método escrito para você reproduzir ou contestar. Se um número aqui parecer errado, me avise e eu remeço.",
      },
      { k: "h2", t: "Como cada provedor é testado" },
      {
        k: "p",
        t: "Cada análise parte de uma conta limpa e um servidor novo na configuração padrão do provedor. A menos que a análise diga o contrário, a máquina de teste é o plano mais barato com pelo menos 1 vCPU e 1 GB de RAM, rodando <b>Ubuntu 24.04 LTS</b>, na região geograficamente mais próxima de mim. Eu a provisiono duas vezes, em dias diferentes, e faço a média dos resultados.",
      },
      { k: "h3", t: "A carga de trabalho" },
      {
        k: "p",
        t: "Primeiro vai um deploy representativo: uma API Node.js em Docker na frente do PostgreSQL, mais um proxy reverso Nginx com certificado Let's Encrypt. Isso expõe o atrito do mundo real — velocidade de pull das imagens, tempo de build, se o painel de controle atrapalha — antes de coletar qualquer número sintético. Meu [guia passo a passo para fazer deploy de uma app Node.js com Docker em um VPS da Hetzner](~/deploy-node-app-hetzner/) percorre o mesmo tipo de deploy.",
      },
      { k: "h3", t: "As medições" },
      {
        k: "table",
        head: ["Métrica", "Ferramenta", "O que ela diz"],
        rows: [
          [
            "CPU, um núcleo e vários",
            "<c>sysbench cpu</c>, <c>stress-ng</c>, <c>7z b</c>",
            'Processamento sustentado para builds, atendimento de requisições e jobs em background; se uma vCPU "compartilhada" sofre throttling sob carga.',
          ],
          [
            "E/S de disco",
            "<c>fio</c> (leitura/escrita aleatória 4K, sequencial 1M)",
            'Desempenho de banco de dados, cargas com muitos logs e quão honesto é o rótulo "NVMe".',
          ],
          [
            "Throughput de rede",
            "<c>iperf3</c> para endpoints de terceiros, <c>speedtest-cli</c>",
            "Saída real para outras regiões, não só o espelho de teste de velocidade do próprio provedor.",
          ],
          [
            "Tempo de boot e provisionamento",
            "<c>systemd-analyze</c>, timestamps da API, relógio de parede",
            "Com que rapidez você escala ou substitui um nó que caiu.",
          ],
          [
            "Latência",
            "<c>ping</c>, <c>mtr</c>, TTFB de três continentes",
            "Qualidade de rota e peering, não só a distância no mapa.",
          ],
        ],
      },
      { k: "h3", t: "Também anotado, mas sem pontuação" },
      {
        k: "ul",
        items: [
          "Tempo do cadastro até uma sessão SSH utilizável.",
          "Se IPv6, rede privada, snapshots e firewalls são inclusos ou cobrados à parte.",
          "Cota de saída/banda e o preço por GB excedente.",
          "Suporte: um ticket real é aberto em cada análise e o tempo de resposta e sua utilidade são registrados.",
          "Comportamento de cobrança — tetos por hora, mínimos e o quão difícil é destruir totalmente um recurso para ele parar de cobrar.",
        ],
      },
      { k: "h2", t: "Regras básicas" },
      {
        k: "ul",
        items: [
          "<b>Nenhuma análise patrocinada.</b> Nenhum provedor recebe aprovação do texto, embargo ou acesso antecipado a uma nota.",
          "<b>Links de afiliado nunca mexem no ranking.</b> Onde existe um link de indicação, ele é usado; onde não existe, o provedor é coberto do mesmo jeito. Veja a [página de divulgação](~/disclosure/).",
          "<b>Os números incluem a configuração.</b> Plano, região, data, kernel e versões das ferramentas são publicados com cada resultado para você refazer.",
          "<b>As análises são revisitadas.</b> Provedores mudam hardware e preços; as atualizações são acrescentadas com data, não editadas em silêncio.",
        ],
      },
      {
        k: "p",
        t: "Você pode ver o método aplicado de ponta a ponta no [comparativo DigitalOcean vs Vultr](~/digitalocean-vs-vultr/). Viu um erro ou quer que eu teste um provedor? Escreva para [" +
          EMAIL +
          "](mailto:" +
          EMAIL +
          ").",
      },
    ],
  },

  disclosure: {
    title: "Divulgação de afiliados — Host or Die",
    description:
      "Como o Host or Die ganha dinheiro: alguns links de saída são de afiliado e pagam uma comissão sem custo extra para você. Os rankings se baseiam em testes, não em pagamentos.",
    h1: "Divulgação de afiliados",
    blocks: [
      {
        k: "p",
        t: "<b>Este site ganha comissões por alguns dos seus links, sem custo extra para você.</b> Se você clicar em certos links para um provedor de hospedagem e depois se cadastrar ou comprar um plano, o Host or Die pode receber uma taxa de indicação. Você paga o mesmo preço que pagaria indo direto ao provedor — em alguns casos menos, quando um link de indicação traz um crédito de boas-vindas.",
      },
      { k: "h2", t: "O que isso muda no conteúdo — nada" },
      {
        k: "p",
        t: "As recomendações deste site se baseiam em testes práticos e nos resultados de benchmark descritos na [metodologia](~/about/). Elas não se baseiam em qual empresa paga mais, nem em se paga. Especificamente:",
      },
      {
        k: "ul",
        items: [
          "Provedores sem programa de afiliados são analisados e recomendados exatamente nos mesmos termos que os que têm.",
          "As taxas de comissão nunca são um fator num veredito, numa nota ou na ordem em que os provedores aparecem.",
          "Nenhum provedor recebe pagamento, hospedagem grátis, aprovação do texto ou acesso antecipado a uma análise em troca de cobertura.",
          "Quando uma recomendação muda porque os testes mudaram, o veredito antigo permanece visível com uma atualização datada.",
        ],
      },
      { k: "h2", t: "Onde aparecem os links de afiliado" },
      {
        k: "p",
        t: 'Links de afiliado podem aparecer dentro de comparativos e tutoriais, em seções claramente marcadas de "onde se cadastrar" e no rodapé do site. Toda página que os contém traz um aviso de divulgação no topo, não só esta página. Links puramente informativos — documentação, páginas de status, código-fonte, páginas de preços citadas como referência — não são links de afiliado.',
      },
      { k: "h2", t: "Programas dos quais este site participa" },
      {
        k: "p",
        t: "O Host or Die ganha comissão de indicação por meio de programas de afiliados operados diretamente por provedores de hospedagem e pela rede de afiliados [Awin](https://www.awin.com/). Quando uma recomendação traz um link de afiliado, o provedor para o qual ele aponta é citado no aviso de divulgação no topo daquela página.",
      },
      {
        k: "p",
        t: "Em setembro de 2026, este site tem uma relação de afiliado ativa com a <b>DigitalOcean</b> (via Awin) e uma relação de indicação com a <b>Vultr</b>. Links para a Hetzner e qualquer outro provedor citado não são links de afiliado: a Hetzner encerrou seu programa de indicação em 2026 e não há acordo com os demais. Esta seção é atualizada conforme isso mudar.",
      },
      { k: "h2", t: "FTC e normas de publicidade" },
      {
        k: "p",
        t: "Esta divulgação é feita para cumprir os <i>Guides Concerning the Use of Endorsements and Testimonials in Advertising</i> da Comissão Federal de Comércio dos EUA (16 CFR Parte 255) e normas equivalentes em outros lugares, incluindo o CAP Code do Reino Unido. A intenção é simples: você deve sempre saber quando um link pode render dinheiro para este site.",
      },
      { k: "h2", t: "Dúvidas" },
      {
        k: "p",
        t: "Escreva para [" + EMAIL + "](mailto:" + EMAIL + ") e eu respondo.",
      },
      { k: "p", t: "<i>Última atualização: 4 de setembro de 2026.</i>" },
    ],
  },

  dovv: {
    title: "DigitalOcean vs Vultr: comparativo para devs (2026)",
    description:
      "DigitalOcean ou Vultr? Um comparativo prático de preços, especificações, desempenho real, suporte e facilidade de uso — e qual escolher, e quando.",
    h1: "DigitalOcean vs Vultr: o comparativo de um desenvolvedor",
    metaLine:
      "Comparativo · publicado em 12 de agosto de 2026 · atualizado em 4 de setembro de 2026 · preços verificados em agosto de 2026",
    blocks: [
      { k: "affiliateNotice" },
      {
        k: "p",
        t: "DigitalOcean e Vultr ocupam a mesma parte do mercado: instâncias VPS Linux não gerenciadas, cobradas por hora com teto mensal, voltadas para desenvolvedores à vontade com um terminal. São próximas o bastante para que a decisão geralmente se resuma a três coisas — quão ampla cobertura geográfica você precisa, se você quer complementos gerenciados da própria plataforma, e o quanto você se importa em extrair o máximo de processamento por dólar.",
      },
      {
        k: "p",
        t: "Mantenho as duas contas ativas continuamente e faço deploy da mesma stack de referência (uma API Node.js em Docker na frente do PostgreSQL, atrás do Nginx com certificado Let's Encrypt) em cada uma — o mesmo setup que meu [tutorial de Node.js na Hetzner com Docker](~/deploy-node-app-hetzner/) cobre. Este post é a parte qualitativa — preços, recursos, fluxo de trabalho, suporte. Os números de benchmark sintético têm uma seção própria mais abaixo; veja a [metodologia](~/about/) para saber como são coletados.",
      },
      {
        k: "verdict",
        heading: "Veredito rápido",
        head: ["Se você quer…", "Escolha", "Porque"],
        rows: [
          [
            "A melhor documentação, UI polida, serviços gerenciados da plataforma",
            "DigitalOcean",
            "App Platform, bancos de dados gerenciados e uma biblioteca de tutoriais que cobre quase tudo que você vai encontrar.",
          ],
          [
            "Mais processamento e NVMe por dólar",
            "Vultr",
            "Os planos High Frequency / High Performance começam com NVMe a um preço de entrada menor que os Droplets SSD da DigitalOcean.",
          ],
          [
            "Regiões incomuns (América do Sul, África, mais da Ásia)",
            "Vultr",
            "~32 locais contra ~15 da DigitalOcean, incluindo Joanesburgo, São Paulo e várias cidades a mais na Ásia.",
          ],
          [
            "SO personalizado via upload de ISO, bare metal ou GPUs fracionadas",
            "Vultr",
            "A DigitalOcean não permite upload de ISO; sua oferta de bare metal e GPU é mais restrita.",
          ],
          [
            "Uma conta de time com papéis e cobrança previsível",
            "DigitalOcean",
            "Recursos de time/RBAC mais maduros e banda compartilhada entre Droplets.",
          ],
        ],
        note: "<b>Resumo:</b> se você publica uma app web típica e valoriza documentação e complementos gerenciados, a DigitalOcean é o caminho mais tranquilo. Se você quer desempenho bruto por dólar, uma região atípica ou hardware que a DigitalOcean não vende, a Vultr ganha. Nenhuma das duas é uma má escolha.",
      },
      { k: "h2", t: "Preços e especificações" },
      {
        k: "p",
        t: "Os dois provedores cobram por hora com teto mensal, medem a banda de saída com uma cota por plano e cerca de US$ 0,01/GB de excedente, e cobram à parte armazenamento em bloco e snapshots. Os planos de entrada ficam assim:",
      },
      {
        k: "table",
        head: ["Plano", "vCPU / RAM", "Disco", "Transferência", "Preço/mês"],
        rows: [
          ["DigitalOcean Basic Droplet", "1 / 512 MB", "10 GB SSD", "0,5 TB", "~US$ 4"],
          ["DigitalOcean Basic Droplet", "1 / 1 GB", "25 GB SSD", "1 TB", "~US$ 6"],
          ["DigitalOcean Basic Droplet", "2 / 4 GB", "80 GB SSD", "4 TB", "~US$ 24"],
          ["Vultr Cloud Compute (Regular)", "1 / 1 GB", "25 GB SSD", "1 TB", "~US$ 5"],
          ["Vultr High Frequency", "1 / 1 GB", "32 GB NVMe", "1 TB", "~US$ 6"],
          ["Vultr High Performance", "2 / 4 GB", "128 GB NVMe", "3 TB", "~US$ 24"],
        ],
      },
      {
        k: "p",
        t: "O padrão: os Droplets básicos da DigitalOcean são SSD, não NVMe, e não dá para comprar uma máquina NVMe na base da linha. As linhas High Frequency e High Performance da Vultr colocam NVMe e núcleos com clock mais alto a um dólar dos planos normais, e é por isso que a Vultr costuma sair melhor no preço por desempenho. A DigitalOcean responde com banda <i>compartilhada</i> entre todos os Droplets da conta, então uma frota com tráfego desigual desperdiça menos cota.",
      },
      { k: "p", t: "Alguns itens que pegam as pessoas de surpresa:" },
      {
        k: "ul",
        items: [
          "<b>Snapshots não são grátis em nenhum dos dois.</b> Os dois cobram cerca de US$ 0,05–0,06 por GB-mês; backups automáticos somam ~20% ao preço da instância.",
          "<b>Os planos mais baratos da Vultr às vezes são só IPv6</b> ou têm estoque regional limitado. Um IPv4 dedicado é um adicional no nível mais baixo.",
          "<b>Proteção contra DDoS</b> vem incluída nos Load Balancers da DigitalOcean; na Vultr é um adicional de ~US$ 10/mês por instância.",
          'Preços de hospedagem mudam. Trate a tabela acima como "verificada em agosto de 2026" e confirme na página de preços de cada provedor antes de se comprometer.',
        ],
      },
      { k: "h2", t: "Desempenho" },
      {
        k: "p",
        t: "Os dois provedores usam hardware de geração atual nas regiões principais, e para uma carga web comum nos planos de entrada você não vai sentir diferença num teste cego. Eles se separam sob carga sustentada e em trabalho pesado de disco. Veja onde cada um se encaixa, a partir de rodar a [carga de teste padrão](~/about/) mais tráfego de produção nos dois por um período longo.",
      },
      {
        k: "p",
        t: "<b>CPU.</b> As linhas High Frequency e High Performance da Vultr usam núcleos com clock mais alto que um Droplet básico da DigitalOcean, então trabalho single-thread — renderização de templates, serialização JSON, a maior parte do atendimento de requisições — termina mais rápido por dólar nesses níveis. Nos planos compartilhados normais os dois ficam parelhos, e ambos fazem throttling de uma vCPU barulhenta sob carga longa a 100%, o que é esperado nesse preço.",
      },
      {
        k: "p",
        t: "<b>Disco.</b> É a diferença mais clara. Os Droplets Basic da DigitalOcean são SSD; os planos High Frequency e High Performance da Vultr são NVMe, e isso aparece em E/S aleatória 4K — o padrão de acesso que um banco relacional de fato gera. Para uma máquina de Postgres ou MySQL com orçamento apertado, os níveis NVMe da Vultr são o melhor hardware.",
      },
      {
        k: "p",
        t: "<b>Rede.</b> Praticamente empate. Os dois têm bom peering a partir das regiões principais, mantêm perto da taxa máxima em transferências entre continentes e mostraram estabilidade de rota comparável em uma semana de monitoramento.",
      },
      {
        k: "p",
        t: "<b>Provisionamento.</b> Os dois criam uma instância utilizável em bem menos de um minuto pela API. A Vultr costuma ser alguns segundos mais rápida até a máquina ficar pronta para SSH; nenhum é lento o bastante para importar, a menos que você faça autoescala agressiva.",
      },
      {
        k: "p",
        t: "As tabelas completas de benchmark — plano exato, região, kernel, versões das ferramentas e saída bruta dos comandos — são publicadas na análise individual de cada provedor quando aquela rodada termina. A [metodologia](~/about/) lista todos os comandos usados.",
      },
      { k: "h2", t: "Facilidade de uso e fluxo de trabalho" },
      {
        k: "p",
        t: 'Essa é a maior força da DigitalOcean. O painel de controle é limpo e rápido, a CLI <c>doctl</c> e a API são bem documentadas, o provider do Terraform é da própria plataforma e atual, e a biblioteca de tutoriais é sinceramente a melhor do setor — para uma enorme variedade de problemas do tipo "como configurar X no Ubuntu", o primeiro resultado da busca é um artigo da DigitalOcean que realmente funciona. Se você prefere não gerenciar um banco de dados nem um pipeline de deploy, <b>App Platform</b> (o PaaS deles) e PostgreSQL / MySQL / Redis / Kafka gerenciados estão a um clique e integrados ao resto da conta.',
      },
      {
        k: "p",
        t: 'O painel da Vultr é funcional e recuperou bastante terreno. Ele faz coisas que a DigitalOcean não faz: <b>subir uma ISO personalizada</b> e instalar o SO que você quiser, provisionar <b>bare metal</b> pelo mesmo dashboard e subir instâncias com <b>GPU fracionada</b>. A API e o provider do Terraform são sólidos. O que é mais fraco é o ecossistema em volta — menos apps de um clique no marketplace, menos documentação e complementos gerenciados um passo atrás dos da DigitalOcean em acabamento. Para o simples "me dê uma máquina Linux rápida na região X", essa diferença não importa; para "me dê um Postgres gerenciado, um PaaS e um load balancer que se conheçam", importa.',
      },
      { k: "h2", t: "Suporte" },
      {
        k: "p",
        t: "Os dois oferecem suporte por tickets 24/7 em todos os planos, sem exigir um nível pago para abrir um ticket. Na minha experiência os tempos de primeira resposta são parecidos — geralmente bem menos de uma hora para qualquer coisa que pareça urgente. A Vultr inclui suporte por tickets em todos os planos por padrão; a DigitalOcean vende planos de suporte Standard e Premium (com preço como porcentagem do gasto mensal) que adicionam SLAs mais rápidos e, no Premium, acesso por Slack e uma revisão de arquitetura. Para a maioria dos desenvolvedores solo e times pequenos o suporte gratuito de qualquer um dá conta, e a documentação da DigitalOcean evita muitos tickets que você abriria de outra forma.",
      },
      { k: "h2", t: "Prós e contras" },
      {
        k: "pros",
        groups: [
          {
            title: "DigitalOcean — a favor",
            items: [
              "Documentação e tutoriais de referência",
              "UI polida, CLI/API/Terraform maduros",
              "App Platform da plataforma + bancos de dados gerenciados",
              "Banda compartilhada entre a conta",
              "Recursos de time / acesso por papéis mais fortes",
            ],
          },
          {
            title: "DigitalOcean — contra",
            items: [
              "Droplets básicos são SSD, não NVMe",
              "Sem opção NVMe na faixa de entrada",
              "~15 regiões — sem América do Sul nem África",
              "Sem upload de ISO personalizada",
              "Oferta restrita de bare metal / GPU",
            ],
          },
          {
            title: "Vultr — a favor",
            items: [
              "NVMe + núcleos de clock alto perto do preço de entrada",
              "~32 locais, incluindo regiões raras",
              "Upload de ISO personalizada; instale qualquer SO",
              "Bare metal e GPUs fracionadas no mesmo painel",
              "Suporte por tickets em todos os planos",
            ],
          },
          {
            title: "Vultr — contra",
            items: [
              "Documentação / comunidade menores",
              "Complementos gerenciados menos polidos que os da DigitalOcean",
              "O nível mais barato pode ser só IPv6 / estoque limitado",
              "Proteção contra DDoS é um adicional pago",
              "Menos apps de um clique no marketplace",
            ],
          },
        ],
      },
      { k: "h2", t: "Recomendação" },
      {
        k: "p",
        t: "<b>Escolha a DigitalOcean se</b> você vai fazer deploy de uma app web ou API típica e valoriza a documentação, o console polido e ter Postgres gerenciado, um load balancer ou o PaaS App Platform a um clique. O fluxo de trabalho é mais tranquilo de ponta a ponta, e para a maioria dos times esse tempo economizado vale mais que os poucos dólares por mês que a Vultr corta da conta.",
      },
      {
        k: "p",
        t: "<b>Escolha a Vultr se</b> os detalhes te levam para lá: você quer o máximo de CPU e NVMe por dólar, precisa de uma região onde a DigitalOcean não opera, precisa dar boot em uma ISO personalizada, ou quer bare metal ou uma GPU fracionada sem sair do painel. As instâncias High Frequency e High Performance são de fato hardware mais rápido que um Droplet básico, não só um rótulo mais barato.",
      },
      {
        k: "p",
        t: "Ainda na dúvida? Os dois cobram por hora sem mínimo, então a resposta honesta é rodar sua própria carga em cada um por alguns dias e ficar com o que se comportou melhor. Nada aqui é uma decisão que você não possa reverter em uma tarde.",
      },
      {
        k: "p",
        t: "Uma observação sobre a divulgação: o programa de afiliados da DigitalOcean paga ao longo do primeiro ano de um cliente, o que combina com a forma como essas contas são de fato usadas — você sobe algo e deixa rodando. Se você está pendendo para a DigitalOcean depois de ler isto, [comece aqui](aff:do).",
      },
      {
        k: "callout",
        label: "Crédito da Vultr",
        body: "A Vultr está com uma promoção: cadastre-se [por este link](aff:vultr) e você ganha US$ 300 em crédito para testar a plataforma você mesmo — sem amarras além de vincular um meio de pagamento. É uma oferta por tempo limitado e pode não estar sempre ativa; se o valor mostrado ao clicar for diferente, é por isso.",
      },
      { k: "h2", t: "Onde se cadastrar" },
      {
        k: "p",
        t: "Os dois links abaixo têm rastreamento: DigitalOcean é um link de afiliado (via Awin), Vultr é um link de indicação. Se você criar uma conta por um deles, este site pode ganhar uma comissão sem custo para você. Veja a [divulgação](~/disclosure/).",
      },
      {
        k: "ul",
        items: [
          "[Criar uma conta na DigitalOcean](aff:do) — contas novas costumam começar com crédito grátis.",
          "[Criar uma conta na Vultr](aff:vultr) — no momento US$ 300 em crédito de teste (veja a observação acima).",
        ],
      },
      {
        k: "p",
        t: "Prefere não usar um link com rastreamento? Ir direto para <c>digitalocean.com</c> ou <c>vultr.com</c> custa o mesmo e a análise vale igual.",
      },
    ],
  },

  hetzner: {
    title: "Faça deploy de uma app Node.js em um VPS da Hetzner com Docker",
    description:
      "Tutorial para copiar e colar: crie um VPS na Hetzner, reforce-o, instale o Docker e faça deploy de uma app Node.js com HTTPS automático via Caddy. Testado no Ubuntu 24.04.",
    h1: "Faça deploy de uma app Node.js em um VPS da Hetzner com Docker",
    metaLine:
      "Tutorial · publicado em 26 de agosto de 2026 · atualizado em 4 de setembro de 2026 · testado no Ubuntu 24.04 LTS",
    blocks: [
      {
        k: "p",
        t: "A Hetzner Cloud é minha escolha padrão para máquinas de produção pequenas e médias: um <c>CAX11</c> Arm (2 vCPU, 4 GB RAM, 40 GB NVMe) custa cerca de € 3,29/mês e um <c>CX22</c> x86 com as mesmas specs cerca de € 3,79/mês, os dois em NVMe rápido. Este passo a passo leva um servidor novo até uma app Node.js servida por HTTPS e no ar. Todos os comandos rodaram em um <c>CX22</c> com Ubuntu 24.04 limpo. Se você ainda está escolhendo provedor, meu [comparativo DigitalOcean vs Vultr](~/digitalocean-vs-vultr/) explica como as opções mais comuns se comparam.",
      },
      { k: "h2", t: "O que você terá no final" },
      {
        k: "ul",
        items: [
          "Um servidor Ubuntu 24.04 reforçado (usuário sudo não-root, SSH só por chave, firewall).",
          "Docker Engine + plugin Compose do repositório oficial do Docker.",
          "Uma app Express em contêiner que reinicia no boot.",
          "Caddy na frente, terminando o TLS com um certificado Let's Encrypt que se renova sozinho.",
        ],
      },
      { k: "h2", t: "Pré-requisitos" },
      {
        k: "ul",
        items: [
          "Um par de chaves SSH na sua máquina (<c>ssh-keygen -t ed25519</c> se você não tiver).",
          "Um nome de domínio ao qual você possa adicionar um registro DNS (necessário para o HTTPS no passo 9).",
          "Familiaridade básica com o terminal. Não é preciso saber Docker de antemão.",
        ],
      },
      { k: "h2", t: "1. Criar o servidor" },
      {
        k: "p",
        t: "[Cadastre-se na Hetzner Cloud](aff:hetzner) e crie um novo <b>Project</b>. No projeto:",
      },
      {
        k: "ol",
        items: [
          "<b>Security → SSH keys → Add SSH key</b>. Cole o conteúdo do seu <c>~/.ssh/id_ed25519.pub</c>.",
          "<b>Servers → Add Server</b>. Escolha: o local mais próximo dos seus usuários (Nuremberg, Falkenstein, Helsinki, Ashburn, Hillsboro, Cingapura); imagem <b>Ubuntu 24.04</b>; tipo <c>CX22</c> (x86) ou <c>CAX11</c> (Arm) — este tutorial constrói a imagem no servidor, então qualquer um serve; a chave SSH que você acabou de adicionar; nome <c>app-01</c>.",
          "Crie-o e então copie o endereço IPv4 público do servidor.",
        ],
      },
      {
        k: "p",
        t: "Opcional, mas recomendado: em <b>Firewalls</b>, crie um firewall da Hetzner Cloud que permita apenas TCP de entrada <c>22</c>, <c>80</c> e <c>443</c>, e anexe-o ao servidor. É uma segunda camada na frente do firewall do host que configuramos no passo 5.",
      },
      { k: "h2", t: "2. Primeiro acesso e atualização do sistema" },
      {
        k: "p",
        t: "Conecte como <c>root</c> usando a chave que a Hetzner instalou:",
      },
      { k: "code", ref: "firstLogin" },
      {
        k: "p",
        t: "O <c>reboot</c> carrega qualquer kernel novo. Espere ~20 segundos e volte a entrar por SSH.",
      },
      { k: "h2", t: "3. Criar um usuário não-root" },
      {
        k: "p",
        t: "Trabalhar e rodar contêineres como root é risco desnecessário. Crie um usuário com sudo:",
      },
      { k: "code", ref: "createUser" },
      {
        k: "p",
        t: "Abra um <i>novo</i> terminal (deixe a sessão de root aberta como rede de segurança) e confirme que o novo usuário funciona:",
      },
      { k: "code", ref: "verifyUser" },
      { k: "h2", t: "4. Reforçar o SSH" },
      {
        k: "p",
        t: "Desative o login de root e a autenticação por senha. Coloque as configurações num arquivo drop-in para que um futuro update do <c>openssh-server</c> não as sobrescreva:",
      },
      { k: "code", ref: "hardenSsh" },
      {
        k: "p",
        t: "No Ubuntu 24.04 o SSH é ativado por socket; se o reinício acima não fizer efeito, rode <c>sudo systemctl restart ssh.socket</c>. Teste em um novo terminal <b>antes</b> de fechar sua sessão de trabalho: <c>ssh deploy@YOUR_SERVER_IP</c> deve continuar funcionando, e <c>ssh root@YOUR_SERVER_IP</c> deve agora ser recusado.",
      },
      { k: "h2", t: "5. Firewall do host" },
      {
        k: "p",
        t: "Permita SSH, HTTP e HTTPS; negue todo o resto na entrada:",
      },
      { k: "code", ref: "firewall" },
      { k: "h2", t: "6. Instalar o Docker" },
      {
        k: "p",
        t: "Use o repositório APT oficial do Docker, não o pacote mais antigo da distribuição:",
      },
      { k: "code", ref: "installDocker" },
      {
        k: "p",
        t: "Se o contêiner <c>hello-world</c> imprimir uma mensagem de sucesso, o engine está no ar.",
      },
      { k: "h2", t: "7. A aplicação" },
      {
        k: "p",
        t: "Crie o projeto no servidor (ou construa localmente e suba com <c>git clone</c> / <c>scp</c>). É uma API Express mínima com um health check.",
      },
      { k: "code", ref: "mkProject" },
      { k: "file", name: "package.json" },
      { k: "code", ref: "packageJson" },
      { k: "file", name: "app.js" },
      { k: "code", ref: "appJs" },
      {
        k: "p",
        t: "<c>Dockerfile</c> — multi-stage para que a imagem final carregue só dependências de produção, e roda como o usuário não-root <c>node</c> embutido.",
      },
      { k: "code", ref: "dockerfile" },
      {
        k: "p",
        t: "<c>npm ci</c> precisa de um lockfile. Gere um uma vez (localmente ou no servidor) com <c>npm install</c>, que cria o <c>package-lock.json</c>. Depois adicione o <c>.dockerignore</c>:",
      },
      { k: "code", ref: "dockerignore" },
      { k: "h2", t: "8. Construir e rodar (HTTP)" },
      {
        k: "p",
        t: "Checagem rápida de que o contêiner funciona antes de adicionar TLS:",
      },
      { k: "code", ref: "buildRun" },
      {
        k: "p",
        t: "Acesse <c>http://YOUR_SERVER_IP</c> no navegador — você deve receber o JSON. Depois pare-o, porque o passo 9 precisa da porta 80:",
      },
      { k: "code", ref: "rmContainer" },
      { k: "h2", t: "9. HTTPS com Caddy" },
      {
        k: "p",
        t: "Aponte o DNS para o servidor primeiro: crie um <b>registro A</b> para o seu domínio (digamos <c>app.example.com</c>) para <c>YOUR_SERVER_IP</c> e espere resolver (<c>dig +short app.example.com</c>). O Caddy precisa disso para passar o desafio do Let's Encrypt.",
      },
      { k: "file", name: "compose.yaml" },
      { k: "code", ref: "composeYaml" },
      { k: "p", t: "<c>Caddyfile</c> — substitua o domínio e o e-mail:" },
      { k: "code", ref: "caddyfile" },
      { k: "p", t: "Suba tudo:" },
      { k: "code", ref: "composeUp" },
      {
        k: "p",
        t: "Em poucos segundos o Caddy busca e instala o certificado. Carregue <c>https://app.example.com</c> — cadeado válido, resposta JSON, e o <c>http://</c> puro agora redireciona para <c>https://</c>. A renovação é automática.",
      },
      { k: "h2", t: "10. Fazer deploy de atualizações" },
      {
        k: "p",
        t: "Mude seu código, depois reconstrua e recicle os contêineres:",
      },
      { k: "code", ref: "deployUpdate" },
      { k: "p", t: "Comandos úteis do dia a dia:" },
      { k: "code", ref: "dayToDay" },
      { k: "h2", t: "Para onde ir depois" },
      {
        k: "ul",
        items: [
          "Adicione um passo <c>deploy</c> na CI que entra por SSH e roda os comandos do passo 10, ou mude para <c>docker context</c> e construa localmente.",
          "Coloque um banco de dados de verdade no próprio serviço com um volume nomeado, e faça snapshots de volume da <c>hetzner</c> em uma agenda.",
          "Configure o unattended-upgrades (<c>sudo dpkg-reconfigure -plow unattended-upgrades</c>) para que os patches de segurança sejam aplicados sozinhos.",
        ],
      },
      {
        k: "callout",
        label: "Observação",
        body: "Eu uso a Hetzner nos meus próprios servidores e recomendo aqui porque a relação preço-desempenho em NVMe é a melhor que já medi. A Hetzner encerrou seu programa de indicação em 2026, então o link acima é um link comum sem rastreamento e nada nesta página gera comissão. Veja a [divulgação](~/disclosure/) para o quadro completo.",
      },
    ],
  },
};
