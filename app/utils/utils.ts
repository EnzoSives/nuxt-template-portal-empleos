/**
 * Espera un tiempo determinado
 * @param ms - Tiempo en milisegundos
 * @returns Promise<void>
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
