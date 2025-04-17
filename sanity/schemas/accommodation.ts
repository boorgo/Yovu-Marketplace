import { defineField, defineType } from "sanity"

export default defineType({
  name: "accommodation",
  title: "Accommodation",
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
      name: "accommodationType",
      title: "Accommodation Type",
      type: "string",
      options: {
        list: [
          { title: "Hotel", value: "hotel" },
          { title: "Hostel", value: "hostel" },
          { title: "Eco Lodge", value: "eco-lodge" },
          { title: "Treehouse", value: "treehouse" },
          { title: "Glamping", value: "glamping" },
          { title: "Apartment", value: "apartment" },
          { title: "Cabin", value: "cabin" },
          { title: "Homestay", value: "homestay" },
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
      title: "Price per Night",
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
      name: "sustainabilityFeatures",
      title: "Sustainability Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Solar Powered", value: "solar-powered" },
          { title: "Rainwater Harvesting", value: "rainwater-harvesting" },
          { title: "Organic Toiletries", value: "organic-toiletries" },
          { title: "Energy Efficient", value: "energy-efficient" },
          { title: "Plastic-Free", value: "plastic-free" },
          { title: "Locally Sourced Food", value: "locally-sourced-food" },
          { title: "Waste Reduction", value: "waste-reduction" },
          { title: "Water Conservation", value: "water-conservation" },
          { title: "Eco-Certified", value: "eco-certified" },
        ],
      },
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wi-Fi", value: "wifi" },
          { title: "Pool", value: "pool" },
          { title: "Air Conditioning", value: "air-conditioning" },
          { title: "Kitchen", value: "kitchen" },
          { title: "Breakfast Included", value: "breakfast" },
          { title: "Parking", value: "parking" },
          { title: "Laundry", value: "laundry" },
          { title: "Pets Allowed", value: "pets-allowed" },
        ],
      },
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
      name: "maxGuests",
      title: "Maximum Guests",
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
      subtitle: "accommodationType",
      media: "mainImage",
    },
  },
})
