# Yovu Sustainable Marketplace

## Color Scheme Documentation

This document outlines the color scheme used throughout the Yovu Sustainable Marketplace application. Consistent use of these colors helps maintain brand identity and visual coherence across all pages and components.

### Primary Color Palette

| Color Name     | Hex Code  | Description                                      |
|----------------|-----------|--------------------------------------------------|
| Yovu Mint      | `#D1F5D3` | Light mint green used for backgrounds            |
| Yovu Charcoal  | `#3A3A3A` | Dark charcoal/gray used for text and buttons     |
| Yovu White     | `#FFFFFF` | White used for button text and card backgrounds  |

### Color Usage Guidelines

#### Backgrounds
- **Primary Background**: Yovu Mint (`#D1F5D3`) is used as the main background color for the application
- **Card/Component Background**: White (`#FFFFFF`) is used for cards, forms, and other component backgrounds
- **Secondary Sections**: Alternating between Mint and White backgrounds helps create visual separation between sections

#### Text
- **Primary Text**: Yovu Charcoal (`#3A3A3A`) is used for headings and body text
- **Secondary Text**: Yovu Charcoal with opacity (e.g., `text-yovu-charcoal/70` or `text-yovu-charcoal/80`) is used for less prominent text
- **Button Text**: White (`#FFFFFF`) is used for text on primary buttons

#### UI Elements
- **Primary Buttons**: Yovu Charcoal background with White text
- **Secondary Buttons**: Transparent background with Yovu Charcoal border and text
- **Form Inputs**: White background with Yovu Mint border
- **Focus States**: Yovu Charcoal with reduced opacity for focus rings

### Implementation in Tailwind CSS

The colors are defined in the `tailwind.config.ts` file:

\`\`\`typescript
theme: {
  extend: {
    colors: {
      yovu: {
        mint: "#D1F5D3",    // Light mint green background
        charcoal: "#3A3A3A", // Dark charcoal for text and buttons
        white: "#FFFFFF",    // White for button text and accents
      },
      // Other theme colors...
    },
  },
}
\`\`\`

### Usage Examples

#### Backgrounds
\`\`\`jsx
<div className="bg-yovu-mint">
  {/* Mint background content */}
</div>

<div className="bg-white">
  {/* White background content */}
</div>
\`\`\`

#### Text
\`\`\`jsx
<h1 className="text-yovu-charcoal">Heading Text</h1>
<p className="text-yovu-charcoal/80">Secondary Text with 80% opacity</p>
\`\`\`

#### Buttons
\`\`\`jsx
<Button className="bg-yovu-charcoal text-white">Primary Button</Button>
<Button className="border-yovu-charcoal bg-transparent text-yovu-charcoal">Secondary Button</Button>
\`\`\`

#### Form Elements
\`\`\`jsx
<Input className="bg-white border-yovu-mint" />
<Textarea className="bg-white border-yovu-mint" />
\`\`\`

### Dark Mode Considerations

When implementing dark mode, consider these color inversions:

- Background: Yovu Charcoal (`#3A3A3A`)
- Text: Yovu Mint (`#D1F5D3`)
- UI Elements: Maintain contrast but invert the color scheme

### Accessibility

The current color scheme provides good contrast ratios:
- Yovu Charcoal on Yovu Mint: 8.59:1 (Passes WCAG AAA)
- White on Yovu Charcoal: 11.1:1 (Passes WCAG AAA)

Always ensure text remains legible when applying opacity to text colors.

### Brand Guidelines

When creating new components or pages:
1. Use the Yovu Mint as the primary background color
2. Use White for card backgrounds and form elements
3. Use Yovu Charcoal for text and primary buttons
4. Maintain high contrast between text and backgrounds
5. Use opacity variations of Yovu Charcoal for secondary text
