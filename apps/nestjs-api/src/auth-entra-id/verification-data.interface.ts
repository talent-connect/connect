export interface VerificationData {
  state: string
  scopes: string[]
  redirectUri: string
  code: string
  codeVerifier: string
}
