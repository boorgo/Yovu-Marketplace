import { defineField, defineType } from "sanity"

export default defineType({
  name: "restaurant",
  title: "Restaurant",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "partner",
      title: "Partner",
      type: "reference",
      to: { type: "partner" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "cuisineType",
      title: "Cuisine Type",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Vegan", value: "vegan" },
          { title: "Farm-to-Table", value: "farm-to-table" },
          { title: "Organic", value: "organic" },
          { title: "Local", value: "local" },
          { title: "Mediterranean", value: "mediterranean" },
          { title: "Asian", value: "asian" },
          { title: "European", value: "european" },
          { title: "Latin American", value: "latin-american" },
          { title: "African", value: "african" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() },
        { name: "state", title: "State/Province", type: "string" },
        { name: "zip", title: "Zip/Postal Code", type: "string" },
        { name: "country", title: "Country", type: "string", validation: (Rule) => Rule.required() },
      ],
    }),
    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "string",
      options: {
        list: [
          { title: "$", value: "low" },
          { title: "$$", value: "medium" },
          { title: "$$$", value: "high" },
          { title: "$$$$", value: "very-high" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sustainabilityFeatures",
      title: "Sustainability Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Locally Sourced", value: "locally-sourced" },
          { title: "Organic", value: "organic" },
          { title: "Zero Waste", value: "zero-waste" },
          { title: "Plastic-Free", value: "plastic-free" },
          { title: "Seasonal Menu", value: "seasonal-menu" },
          { title: "Sustainable Seafood", value: "sustainable-seafood" },
          { title: "Eco-Certified", value: "eco-certified" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "carbonFootprint",
      title: "Carbon Footprint",
      type: "string",
      options: {
        list: [
          { title: "Very Low", value: "very-low" },
          { title: "Low", value: "low" },
          { title: "Medium", value: "medium" },
          { title: "High", value: "high" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "dietaryOptions",
      title: "Dietary Options",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Vegetarian", value: "vegetarian" },
          { title: "Vegan", value: "vegan" },
          { title: "Gluten-Free", value: "gluten-free" },
          { title: "Dairy-Free", value: "dairy-free" },
          { title: "Nut-Free", value: "nut-free" },
          { title: "Halal", value: "halal" },
          { title: "Kosher", value: "kosher" },
        ],
      },
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "cuisineType",
      media: "mainImage",
    },
  },
})
