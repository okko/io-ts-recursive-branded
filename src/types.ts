import * as t from 'io-ts';
// a unique brand for positive numbers
interface PositiveBrand {
  readonly Positive: unique symbol // use `unique symbol` here to ensure uniqueness across modules / packages
}

export const Positive = t.brand(
  t.number, // a codec representing the type to be refined
  (n): n is t.Branded<number, PositiveBrand> => 0 < n, // a custom type guard using the build-in helper `Branded`
  'Positive' // the name must match the readonly field in the brand
)

export type Positive = t.TypeOf<typeof Positive>


export interface Category {
  name: string
  identifier: Positive
  categories: Array<Category>
}

export const Category: t.Type<Category> = t.recursion('Category', () =>
  t.type({
    name: t.string,
    identifier: Positive,
    categories: t.array(Category)
  })
)
