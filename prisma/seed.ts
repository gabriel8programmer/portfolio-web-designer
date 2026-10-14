import { prisma } from "../src/lib/prisma";


async function main() {
  console.log("Iniciando seed do banco de dados...");

  // Remove existing sample data if re-running
  await prisma.project.deleteMany({});

  const sampleProjects = [
    {
      title: "Clínica Bella Vita - Odontologia & Saúde Integrada",
      slug: "clinica-bella-vita",
      category: "Website Institucional",
      shortDescription:
        "Website institucional moderno com foco em captação de pacientes, apresentação de tratamentos e agendamento direto via WhatsApp.",
      fullDescription:
        "Desenvolvido sob medida para clínicas de alto padrão, priorizando elegância, carregamento instantâneo no celular e botão de WhatsApp sempre acessível para facilitar o contato de novos pacientes.",
      coverImage:
        "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80",
      websiteUrl: "https://exemplo-clinica-bellavita.com.br",
      demoVideoUrl: null,
      isDemonstration: true,
      featured: true,
      order: 1,
    },
    {
      title: "Advocacia Silveira & Associados",
      slug: "advocacia-silveira",
      category: "Website Corporativo",
      shortDescription:
        "Presença digital sóbria e confiável para escritório jurídico, destacando áreas de atuação e canais rápidos para consulta inicial.",
      fullDescription:
        "Estrutura focada em transmitir autoridade, clareza nas especialidades do escritório e contato facilitado para clientes corporativos e pessoas físicas.",
      coverImage:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      websiteUrl: "https://exemplo-advocacia-silveira.com.br",
      demoVideoUrl: null,
      isDemonstration: true,
      featured: true,
      order: 2,
    },
    {
      title: "Studio Arquitetura & Interiores",
      slug: "studio-arquitetura",
      category: "Catálogo & Portfólio",
      shortDescription:
        "Portfólio visual de alto impacto para escritório de arquitetura, valorizando fotos de projetos residenciais e comerciais.",
      fullDescription:
        "Layout limpo e minimalista pensado para que as fotografias dos projetos se destaquem, acompanhado de formulário rápido para solicitação de orçamento.",
      coverImage:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      websiteUrl: "https://exemplo-studio-arquitetura.com.br",
      demoVideoUrl: null,
      isDemonstration: true,
      featured: true,
      order: 3,
    },
    {
      title: "Bella Cucina Ristorante",
      slug: "bella-cucina-ristorante",
      category: "Gastronomia & Comércio Local",
      shortDescription:
        "Site otimizado para smartphone com cardápio digital visual, horários, localização integrada ao Google Maps e reservas via WhatsApp.",
      fullDescription:
        "Criado especialmente para atrair clientes locais vindos do Instagram e Google Maps, permitindo acesso rápido ao menu e reservas com apenas um clique.",
      coverImage:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
      websiteUrl: "https://exemplo-bellacucina.com.br",
      demoVideoUrl: null,
      isDemonstration: true,
      featured: false,
      order: 4,
    },
    {
      title: "Pulse Fitness & Treinamento",
      slug: "pulse-fitness",
      category: "Landing Page de Conversão",
      shortDescription:
        "Página de vendas focada em apresentar planos de academia, infraestrutura e chamada direta para matrícula promocional.",
      fullDescription:
        "Landing page com visual dinâmico, depoimentos comerciais claros e direcionamento imediato para a equipe de vendas no WhatsApp.",
      coverImage:
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
      websiteUrl: "https://exemplo-pulsefitness.com.br",
      demoVideoUrl: null,
      isDemonstration: true,
      featured: false,
      order: 5,
    },
  ];

  for (const project of sampleProjects) {
    await prisma.project.create({
      data: project,
    });
  }

  console.log(`Seed concluído com sucesso! ${sampleProjects.length} projetos inseridos.`);
}

main()
  .catch((e) => {
    console.error("Erro no seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
