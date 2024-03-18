import { type NextRequest } from 'next/server'
import { headers } from 'next/headers'
import { extractNomuraHeader } from '@/_utils/headerUitls'

export async function GET(
  req: NextRequest
) {
  return Response.json(extractNomuraHeader(headers()));
}
