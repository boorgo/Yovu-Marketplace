import { defineField, defineType } from "sanity"

export default defineType({
  name: "transportation",
  title: "Transportation",
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
      name: "transportationType",
      title: "Transportation Type",
      type: "string",
      options: {
        list: [
          { title: "Electric Vehicle", value: "electric-vehicle" },
          { title: "Hybrid Vehicle", value: "hybrid-vehicle" },
          { title: "Bicycle", value: "bicycle" },
          { title: "Public Transit", value: "public-transit" },
          { title: "Boat", value: "boat" },
          { title: "Walking Tour", value: "walking-tour" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "serviceArea",
      title: "Service Area",
      type: "object",
      fields: [
        { name: "city", title: "City", type: "string", validation: (Rule) => Rule.required() },
        { name: "state", title: "State/Province", type: "string" },
        { name: "country", title: "Country", type: "string", validation: (Rule) => Rule.required() },
        { name: "radius", title: "Radius (km)", type: "number" },
      ],
    }),
    defineField({
      name: "price",
      title: "Base Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
      initialValue: "USD",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricingModel",
      title: "Pricing Model",
      type: "string",
      options: {
        list: [
          { title: "Per Hour", value: "per-hour" },
          { title: "Per Day", value: "per-day" },
          { title: "Per Trip", value: "per-trip" },
          { title: "Per Kilometer", value: "per-km" },
          { title: "Fixed Price", value: "fixed" },
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
          { title: "Zero Emissions", value: "zero-emissions" },
          { title: "Low Emissions", value: "low-emissions" },
          { title: "Carbon Offset", value: "carbon-offset" },
          { title: "Renewable Energy", value: "renewable-energy" },
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
          { title: "Zero", value: "zero" },
          { title: "Very Low", value: "very-low" },
          { title: "Low", value: "low" },
          { title: "Medium", value: "medium" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capacity",
      title: "Capacity",
      type: "number",
      validation: (Rule) => Rule.required().min(1),
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
      subtitle: "transportationType",
      media: "mainImage",
    },
  },
})
