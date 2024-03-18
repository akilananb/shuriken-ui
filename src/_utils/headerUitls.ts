import { AuthContextType } from '@/types/auth.types';

const extractNomuraRoles = (text: string): string[] | null => {
    const match = text.match(/\[([^\]]+)\]/);
    if (match && match[1]) {
      // Splitting the matched group by comma and trimming spaces
      return match[1].split(',').map(s => s.trim());
    }
    return null; // Return null if no match is found
  }

  
export const extractNomuraHeader = (headers: Headers): AuthContextType => {
    const commonName: string = headers.get('x-nom-common-name') as string || "";
    const token: string = headers.get('x-nom-token') as string || "";
    const mail: string = headers.get('x-nom-mail') as string || "";
    const env: string = headers.get('x-nom-enviroment') as string || "";
    const nomRoles: string = headers.get('x-nom-roles') as string || "";
    const roles: string[] | null = extractNomuraRoles(nomRoles);
    return { commonName, mail, token, env, roles };
}