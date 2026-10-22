import { byId } from './data/projects';

export type Target =
  | { kind: 'showcase' }
  | { kind: 'about' }
  | { kind: 'contact' }
  | { kind: 'project'; id: string }
  | { kind: 'folder'; id: 'uxui' | 'otros' };

export type Open = (t: Target) => void;

export const targetKey = (t: Target) => (t.kind === 'project' ? `p-${t.id}` : t.kind === 'folder' ? `f-${t.id}` : t.kind);

/** #/basehub · #/sobre-mi · #/contacto */
export function targetToHash(t: Target) {
  if (t.kind === 'project') return `#/${t.id}`;
  if (t.kind === 'about') return '#/sobre-mi';
  if (t.kind === 'contact') return '#/contacto';
  return '#/';
}

export function hashToTarget(hash: string): Target | null {
  const h = hash.replace(/^#\/?/, '').toLowerCase();
  if (!h) return null;
  if (h === 'sobre-mi' || h === 'about') return { kind: 'about' };
  if (h === 'contacto' || h === 'contact') return { kind: 'contact' };
  if (h === 'tfm') return { kind: 'project', id: 'tfg' };
  if (h === 'mandopc') return { kind: 'project', id: 'couchpad' };
  if (byId(h)) return { kind: 'project', id: h };
  return null;
}
