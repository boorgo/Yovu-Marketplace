import { defineField, defineType } from "sanity"

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Business Name",
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
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
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
      name: "businessType",
      title: "Business Type",
      type: "string",
      options: {
        list: [
          { title: "Accommodation", value: "accommodation" },
          { title: "Activity/Tour", value: "activity" },
          { title: "Restaurant", value: "restaurant" },
          { title: "Transportation", value: "transportation" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "contactName",
      title: "Contact Name",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State/Province", type: "string" },
        { name: "zip", title: "Zip/Postal Code", type: "string" },
        { name: "country", title: "Country", type: "string" },
      ],
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "geopoint",
    }),
    defineField({
      name: "sustainabilityInitiatives",
      title: "Sustainability Initiatives",
      type: "text",
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
          { title: "Eco-Certified", value: "eco-certified" },
          { title: "Energy Efficient", value: "energy-efficient" },
          { title: "Local Community Support", value: "local-community" },
          { title: "Organic", value: "organic" },
          { title: "Plastic-Free", value: "plastic-free" },
          { title: "Renewable Energy", value: "renewable-energy" },
          { title: "Waste Reduction", value: "waste-reduction" },
          { title: "Water Conservation", value: "water-conservation" },
          { title: "Wildlife Conservation", value: "wildlife-conservation" },
        ],
      },
    }),
    defineField({
      name: "certifications",
      title: "Certifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Approved", value: "approved" },
          { title: "Rejected", value: "rejected" },
        ],
      },
      initialValue: "pending",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "Reference to Supabase user ID",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "businessType",
      media: "logo",
    },
  },
})
