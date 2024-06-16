import { Author } from "./author.type"

export interface Post {
    id: number
    author_id: number
    title: string
    body: string
    image_url: string
    created_at: string
    author?: Author
}