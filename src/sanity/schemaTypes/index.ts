import { type SchemaTypeDefinition } from 'sanity'
import { appleType } from './apple'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [appleType],
}

export { appleType }