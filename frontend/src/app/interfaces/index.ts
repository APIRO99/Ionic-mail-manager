export interface User {
  email: string,
  name: string,
  avatar: string
}

export interface Mail {
  to: User[],
  subject: string,
  body: string,
  attachments: File[]
}