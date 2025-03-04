export interface Profile {
  name: string
  username: string
  image: string
  bio: string[]
  specialties: string[]
  tagline: string
  availability: {
    status: boolean
    text: string
  }
}
