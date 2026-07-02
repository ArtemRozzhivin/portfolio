export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc){
  "id": coalesce(slug.current, _id),
  name,
  description,
  "image": image.asset->url,
  "lqip": image.asset->metadata.lqip,
  stack,
  "links": { "github": githubUrl, "preview": previewUrl }
}`

export const EXPERIENCE_QUERY = `*[_type == "experience"] | order(order asc){
  "id": coalesce(slug.current, _id),
  role,
  company,
  meta,
  period,
  note,
  current,
  bullets
}`

export const SKILLS_QUERY = `*[_type == "skillGroup"] | order(order asc){
  title,
  icon,
  skills,
  wide
}`

export const PROFILE_QUERY = `*[_type == "profile"][0]{
  name,
  roleLead,
  roleAccent,
  eyebrow,
  availability,
  cvUrl,
  intro,
  bio,
  facts,
  badges,
  "avatar": avatar.asset->url,
  "avatarLqip": avatar.asset->metadata.lqip
}`
