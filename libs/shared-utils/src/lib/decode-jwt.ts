function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  const pad = base64.length % 4
  if (pad) {
    if (pad === 1) {
      throw new Error('Invalid Base64Url string')
    }
    base64 += new Array(5 - pad).join('=')
  }
  return atob(base64)
}

export function decodeJwt(jwt: string): any {
  const parts = jwt.split('.')
  if (parts.length !== 3) {
    throw new Error('JWT is invalid')
  }
  const payload = parts[1]
  return JSON.parse(base64UrlDecode(payload))
}
