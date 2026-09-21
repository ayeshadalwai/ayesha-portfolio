export type ProjectCategory = 'TECH' | 'PRODUCT + DESIGN' | 'COMMUNITY' | 'RESEARCH'
export type Project = {
  id: string; title: string; shortDescription: string; longDescription?: string
  category: ProjectCategory; secondaryCategories?: ProjectCategory[]; technologies: string[]
  year?: string; image?: string; gallery?: string[]; video?: string; liveUrl?: string; githubUrl?: string
  caseStudyUrl?: string; featured: boolean; status?: string; role?: string; client?: string
}

// Add a project here and it will automatically appear in the appropriate views.
export const projects: Project[] = [
  { id: 'arbiter', title: 'Arbiter', shortDescription: 'Orchestrated multi-LLM system for more deliberate AI workflows.', longDescription: 'A project exploring how multiple language models can be composed into an intentional decision-making system.', category: 'TECH', technologies: ['React', 'FastAPI', 'LLM APIs'], image: '/projects/arbiter/cover.webp', featured: true, status: 'In progress', role: 'Engineering' },
  { id: 'a-vision-of-good', title: 'A Vision of Good', shortDescription: 'A digital space supporting a community-led initiative.', category: 'COMMUNITY', secondaryCategories: ['PRODUCT + DESIGN'], technologies: ['Web', 'Product', 'UI/UX'], image: '/projects/a-vision-of-good/cover.webp', featured: true, role: 'Engineering + product' },
  { id: 'seeb-sea-tours', title: 'Seeb Sea Tours', shortDescription: 'A considered web presence for a local experience on the coast.', category: 'PRODUCT + DESIGN', secondaryCategories: ['TECH'], technologies: ['Frontend', 'UX/UI', 'Responsive design'], image: '/projects/seeb-sea-tours/cover.webp', featured: true, role: 'Design + development' },
]
