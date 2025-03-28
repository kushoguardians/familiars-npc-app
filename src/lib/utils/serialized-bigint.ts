// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function serializeBigInt(obj: any): any {
  if (typeof obj === 'bigint') {
    return obj.toString()
  }

  if (Array.isArray(obj)) {
    return obj.map(serializeBigInt)
  }

  if (typeof obj === 'object' && obj !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const serialized: Record<string, any> = {}
    for (const [key, value] of Object.entries(obj)) {
      serialized[key] = serializeBigInt(value)
    }
    return serialized
  }

  return obj
}
