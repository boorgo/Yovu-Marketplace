import { defineField, defineType } from "sanity"

export default defineType({
  name: "activity",
  title: "Activity",
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
      name: "activityType",
      title: "Activity Type",
      type: "string",
      options: {
        list: [
          { title: "Tour", value: "tour" },
          { title: "Workshop", value: "workshop" },
          { title: "Adventure", value: "adventure" },
          { title: "Cultural", value: "cultural" },
          { title: "Wellness", value: "wellness" },
          { title: "Food & Drink", value: "food-drink" },
          { title: "Nature", value: "nature" },
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
      name: "price",
      title: "Price per Person",
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
      name: "duration",
      title: "Duration",
      type: "object",
      fields: [
        { name: "value", title: "Value", type: "number", validation: (Rule) => Rule.required().min(0) },
        {
          name: "unit",
          title: "Unit",
          type: "string",
          options: {
            list: [
              { title: "Minutes", value: "minutes" },
              { title: "Hours", value: "hours" },
              { title: "Days", value: "days" },
            ],
          },
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sustainabilityFeatures",
      title: "Sustainability Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Carbon Offset", value: "carbon-offset" },
          { title: "Leave No Trace", value: "leave-no-trace" },
          { title: "Local Guides", value: "local-guides" },
          { title: "Wildlife Protection", value: "wildlife-protection" },
          { title: "Community Support", value: "community-support" },
          { title: "Plastic-Free", value: "plastic-free" },
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
      name: "maxParticipants",
      title: "Maximum Participants",
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
      subtitle: "activityType",
      media: "mainImage",
    },
  },
})
