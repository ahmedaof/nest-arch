import { LoginSerializer } from '../serializers/index.serializer'

export interface UserAuthInterface {
	token: string
	userData: LoginSerializer
}
