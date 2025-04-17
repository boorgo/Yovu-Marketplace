import type { SchemaTypeDefinition } from "sanity"

import accommodation from "./schemas/accommodation"
import activity from "./schemas/activity"
import partner from "./schemas/partner"
import restaurant from "./schemas/restaurant"
import transportation from "./schemas/transportation"
import post from "./schemas/post"
import author from "./schemas/author"
import category from "./schemas/category"
import blockContent from "./schemas/blockContent"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Content types
    accommodation,
    activity,
    partner,
    restaurant,
    transportation,
    post,
    author,
    category,
    blockContent,
  ],
}
