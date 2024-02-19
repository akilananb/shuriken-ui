import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'

export async function GET(
  req: NextRequest
) {
  const commonName: string = headers().get('x-nom-common-name') as string || "";
  const token: string = headers().get('x-nom-token') as string || "";
  const mail: string = headers().get('x-nom-mail') as string || "";
  const env: string = headers().get('x-nom-enviroment') as string || "";
  const roles: string[] = headers().get('x-nom-roles') ? headers().get('x-nom-roles')?.split(",") as string[] : ["Nomura User"];

  return Response.json({ commonName, mail, token, env, roles });
}
