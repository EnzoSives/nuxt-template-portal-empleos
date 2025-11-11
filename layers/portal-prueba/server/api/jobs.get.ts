import type { Job } from '../../shared/types/jobs'

export default defineEventHandler(async (): Promise<Job[]> => {
  // Datos de ejemplo - en producción, estos vendrían de una base de datos
  const jobs: Job[] = [
    {
      id: '1',
      title: 'Desarrollador Full Stack Senior',
      company: 'Tech Solutions Inc.',
      location: 'Buenos Aires, Argentina (Híbrido)',
      type: 'full-time',
      salary: '$50,000 - $70,000 ARS',
      description: 'Buscamos un desarrollador full stack con experiencia en Vue.js y Node.js para unirse a nuestro equipo de desarrollo.',
      requirements: [
        '5+ años de experiencia en desarrollo web',
        'Dominio de Vue.js/Nuxt.js',
        'Experiencia con Node.js y Express',
        'Conocimientos de bases de datos SQL y NoSQL',
        'Experiencia con Git y metodologías ágiles'
      ],
      responsibilities: [
        'Desarrollar y mantener aplicaciones web',
        'Colaborar con el equipo de diseño y producto',
        'Realizar code reviews',
        'Optimizar el rendimiento de las aplicaciones',
        'Mentorear a desarrolladores junior'
      ],
      benefits: [
        'Seguro de gastos médicos mayores',
        'Vacaciones superiores a la ley',
        'Capacitación continua',
        'Trabajo híbrido',
        'Bonos por desempeño'
      ],
      postedDate: '2025-11-05',
      applicationDeadline: '2025-12-05',
      isActive: true
    },
    {
      id: '2',
      title: 'Diseñador UX/UI',
      company: 'Creative Agency',
      location: 'Remoto',
      type: 'remote',
      salary: '$35,000 - $50,000 ARS',
      description: 'Buscamos un diseñador UX/UI creativo para crear experiencias digitales excepcionales.',
      requirements: [
        '3+ años de experiencia en diseño UX/UI',
        'Dominio de Figma y Adobe XD',
        'Portafolio sólido',
        'Conocimiento de design systems',
        'Inglés intermedio'
      ],
      responsibilities: [
        'Crear wireframes y prototipos',
        'Diseñar interfaces de usuario',
        'Realizar investigación de usuarios',
        'Colaborar con desarrolladores',
        'Mantener design systems'
      ],
      benefits: [
        '100% remoto',
        'Horario flexible',
        'Equipo de trabajo',
        'Días de salud mental'
      ],
      postedDate: '2025-11-08',
      applicationDeadline: '2025-12-08',
      isActive: true
    },
    {
      id: '3',
      title: 'Data Analyst',
      company: 'Data Corp',
      location: 'Cordoba, Argentina',
      type: 'full-time',
      salary: '$40,000 - $55,000 ARS',
      description: 'Únete a nuestro equipo de análisis de datos para ayudar a tomar decisiones basadas en datos.',
      requirements: [
        '2+ años de experiencia en análisis de datos',
        'SQL avanzado',
        'Python o R',
        'Power BI o Tableau',
        'Estadística aplicada'
      ],
      responsibilities: [
        'Analizar grandes conjuntos de datos',
        'Crear dashboards y reportes',
        'Identificar tendencias y patrones',
        'Presentar insights al equipo ejecutivo',
        'Automatizar procesos de análisis'
      ],
      benefits: [
        'Seguro médico',
        'Vales de despensa',
        'Home office 2 días a la semana',
        'Capacitación en herramientas de análisis'
      ],
      postedDate: '2025-11-10',
      applicationDeadline: '2025-12-10',
      isActive: true
    },
    {
      id: '4',
      title: 'Marketing Digital Manager',
      company: 'E-commerce Plus',
      location: 'Rosario, Argentina',
      type: 'full-time',
      salary: '$45,000 - $60,000 ARS',
      description: 'Líder de marketing digital para impulsar nuestras estrategias de crecimiento en línea.',
      requirements: [
        '4+ años en marketing digital',
        'Experiencia en e-commerce',
        'Google Ads y Facebook Ads',
        'SEO/SEM',
        'Analítica web'
      ],
      responsibilities: [
        'Desarrollar estrategias de marketing digital',
        'Gestionar presupuestos de publicidad',
        'Analizar métricas y KPIs',
        'Liderar equipo de marketing',
        'Optimizar conversiones'
      ],
      benefits: [
        'Bonos por resultados',
        'Seguro de vida',
        'Prestaciones superiores',
        'Oportunidades de crecimiento'
      ],
      postedDate: '2025-11-07',
      applicationDeadline: '2025-12-07',
      isActive: true
    },
    {
      id: '5',
      title: 'Desarrollador Frontend Junior',
      company: 'StartupTech',
      location: 'Remoto',
      type: 'remote',
      salary: '$25,000 - $35,000 ARS',
      description: 'Oportunidad para desarrolladores junior apasionados por el frontend y dispuestos a aprender.',
      requirements: [
        '1+ año de experiencia',
        'HTML, CSS, JavaScript',
        'React o Vue.js',
        'Git básico',
        'Ganas de aprender'
      ],
      responsibilities: [
        'Desarrollar componentes de UI',
        'Implementar diseños responsivos',
        'Colaborar con el equipo',
        'Aprender mejores prácticas',
        'Participar en code reviews'
      ],
      benefits: [
        '100% remoto',
        'Mentoring',
        'Cursos pagados',
        'Ambiente de aprendizaje'
      ],
      postedDate: '2025-11-09',
      applicationDeadline: '2025-12-15',
      isActive: true
    },
    {
      id: '6',
      title: 'Product Manager',
      company: 'SaaS Company',
      location: 'Buenos Aires, Argentina',
      type: 'full-time',
      salary: '$60,000 - $80,000 ARS',
      description: 'Product Manager para liderar el desarrollo de nuestros productos SaaS.',
      requirements: [
        '3+ años como Product Manager',
        'Experiencia en productos SaaS',
        'Metodologías ágiles',
        'Análisis de mercado',
        'Inglés avanzado'
      ],
      responsibilities: [
        'Definir roadmap de producto',
        'Priorizar features',
        'Trabajar con stakeholders',
        'Analizar métricas de producto',
        'Coordinar con equipos de desarrollo'
      ],
      benefits: [
        'Salario competitivo',
        'Stock options',
        'Seguro médico premium',
        'Trabajo híbrido',
        'Conferencias internacionales'
      ],
      postedDate: '2025-11-06',
      applicationDeadline: '2025-12-06',
      isActive: true
    }
  ]

  // Simular delay de red
  await new Promise(resolve => setTimeout(resolve, 500))

  return jobs.filter(job => job.isActive)
})
