export interface AuthenticatedUserInterface {
	id: string
	phone: string
	phoneVerified: boolean
	points?: number
}
