

export class CommentGetAllDto {
    readonly _id: string
    readonly movie_id: string
    readonly content: string
    readonly updatedAt: Date
    readonly user: {
        readonly _id: string
        readonly name: string
        readonly avatar: string
    }
}