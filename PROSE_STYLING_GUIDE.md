# Enhanced Prose Styling Guide

This guide explains how to use the comprehensive prose styling system for sanitized HTML content in your application. These styles are designed to match your system's design philosophy and enhance the reading experience.

## Overview

The prose styling system provides consistent, beautiful typography for all HTML content rendered from your database. It automatically applies to any element with the `.prose` class and supports a wide range of HTML elements and custom classes.

## Basic Usage

Simply add the `prose` class to any container that will display sanitized HTML content:

```tsx
<article
  className="prose prose-lg max-w-none"
  dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }}
/>
```

## Supported HTML Elements

### Typography

#### Headings (H1-H6)
- **H1**: Large, bold titles with proper spacing
- **H2**: Section headers with consistent margins
- **H3**: Subsection headers
- **H4-H6**: Smaller headers for nested content

```html
<h1>Main Article Title</h1>
<h2>Section Heading</h2>
<h3>Subsection</h3>
```

#### Paragraphs and Text
- **Paragraphs**: Justified text with optimal line height and spacing
- **Strong**: Bold text with proper weight
- **Emphasis**: Italic text
- **Underline**: Decorative underlines
- **Strikethrough**: Deleted text styling
- **Mark**: Highlighted text with yellow background

```html
<p>This is a regular paragraph with <strong>bold text</strong> and <em>italic text</em>.</p>
<p>You can also use <u>underlined text</u> and <del>deleted text</del>.</p>
<p>Highlight <mark>important information</mark> for readers.</p>
```

### Lists

#### Unordered Lists
- Bullet points with custom styling
- Proper indentation and spacing
- Nested list support

```html
<ul>
  <li>First item</li>
  <li>Second item with nested list:
    <ul>
      <li>Nested item 1</li>
      <li>Nested item 2</li>
    </ul>
  </li>
</ul>
```

#### Ordered Lists
- Numbered lists with consistent formatting
- Automatic numbering
- Nested list support

```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

### Blockquotes

Beautiful quote styling with left border and subtle background:

```html
<blockquote>
  <p>This is an important quote that stands out from the regular text.</p>
  <cite>— Author Name</cite>
</blockquote>
```

### Links

Interactive links with hover effects and focus states:

```html
<p>Visit our <a href="/about">about page</a> for more information.</p>
```

### Images and Figures

Responsive images with captions:

```html
<figure>
  <img src="/path/to/image.jpg" alt="Description" />
  <figcaption>Image caption explaining the content</figcaption>
</figure>
```

### Code

#### Inline Code
```html
<p>Use the <code>npm install</code> command to install packages.</p>
```

#### Code Blocks
```html
<pre><code>function hello() {
  console.log("Hello, World!");
}</code></pre>
```

### Tables

Responsive tables with hover effects:

```html
<table>
  <thead>
    <tr>
      <th>Header 1</th>
      <th>Header 2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Data 1</td>
      <td>Data 2</td>
    </tr>
  </tbody>
</table>
```

## Custom Classes

### Callout Boxes

Create attention-grabbing information boxes:

```html
<div class="callout info">
  <p>This is an informational callout box.</p>
</div>

<div class="callout warning">
  <p>This is a warning callout box.</p>
</div>

<div class="callout error">
  <p>This is an error callout box.</p>
</div>

<div class="callout success">
  <p>This is a success callout box.</p>
</div>
```

### Highlighted Text

```html
<p>This text contains a <span class="highlight">highlighted section</span>.</p>
```

### Code Blocks with Language Tags

```html
<div class="code-block">
  <div class="language-tag">JavaScript</div>
  <pre><code>const greeting = "Hello, World!";</code></pre>
</div>
```

### Footnotes

```html
<p>This is a sentence with a footnote<sup class="footnote-ref">1</sup>.</p>

<div class="footnote">
  <sup>1</sup> This is the footnote content.
</div>
```

## Responsive Design

The prose system automatically adapts to different screen sizes:

- **Desktop**: Full typography scale with optimal spacing
- **Mobile**: Adjusted font sizes and spacing for readability
- **Tablet**: Intermediate sizing between desktop and mobile

## Print Styles

When printing, the prose content automatically optimizes for paper:

- Black text for maximum contrast
- Removed shadows and decorative elements
- Optimized spacing for paper format

## CSS Custom Properties

The system uses CSS custom properties that automatically adapt to light/dark themes:

- `--foreground`: Main text color
- `--muted-foreground`: Secondary text color
- `--primary`: Primary accent color
- `--border`: Border colors
- `--muted`: Background colors for code blocks and tables

## Best Practices

### Content Structure
1. Use semantic HTML elements (h1, h2, p, ul, etc.)
2. Maintain proper heading hierarchy (h1 → h2 → h3)
3. Include alt text for images
4. Use descriptive link text

### Accessibility
1. Ensure proper color contrast
2. Use semantic markup
3. Include focus indicators for interactive elements
4. Provide alternative text for images

### Performance
1. Optimize images before embedding
2. Use appropriate image formats (WebP, AVIF)
3. Lazy load images when possible
4. Minimize inline styles

## Examples

### Complete Article Structure

```html
<article class="prose">
  <h1>How to Build a Successful Blog</h1>
  
  <p>Building a successful blog requires careful planning and consistent execution.</p>
  
  <h2>Planning Your Content Strategy</h2>
  
  <p>Start by identifying your target audience and their needs:</p>
  
  <ul>
    <li>Research your audience demographics</li>
    <li>Identify common pain points</li>
    <li>Plan content themes and topics</li>
  </ul>
  
  <blockquote>
    <p>Content is king, but distribution is queen.</p>
    <cite>— Unknown</cite>
  </blockquote>
  
  <h3>Creating Quality Content</h3>
  
  <p>Focus on providing value to your readers:</p>
  
  <ol>
    <li>Research thoroughly</li>
    <li>Write clearly and concisely</li>
    <li>Include practical examples</li>
  </ol>
  
  <div class="callout info">
    <p>Remember to update your content regularly to keep it relevant and accurate.</p>
  </div>
  
  <h2>Promoting Your Blog</h2>
  
  <p>Use social media and SEO to reach more readers:</p>
  
  <table>
    <thead>
      <tr>
        <th>Platform</th>
        <th>Best Practices</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Twitter</td>
        <td>Share snippets and engage with followers</td>
      </tr>
      <tr>
        <td>LinkedIn</td>
        <td>Professional networking and thought leadership</td>
      </tr>
    </tbody>
  </table>
  
  <p>For more detailed information, check out our <a href="/blogging-guide">complete blogging guide</a>.</p>
</article>
```

## Troubleshooting

### Common Issues

1. **Styles not applying**: Ensure the `prose` class is present
2. **Inconsistent spacing**: Check for conflicting CSS classes
3. **Mobile responsiveness**: Verify viewport meta tag is set
4. **Dark mode issues**: Check CSS custom property definitions

### Browser Support

- **Modern browsers**: Full support
- **Safari**: Full support (iOS 17+ for hyphens)
- **Internet Explorer**: Limited support (consider fallbacks)

## Customization

To customize the prose styles, modify the CSS variables in `globals.css`:

```css
:root {
  --primary: oklch(0.674 0.172 282.5); /* Your brand color */
  --foreground: oklch(0.129 0.042 264.695); /* Your text color */
}
```

## Conclusion

This prose styling system provides a solid foundation for displaying rich HTML content while maintaining consistency with your design system. It automatically handles typography, spacing, and responsive design, allowing you to focus on creating great content rather than styling it.
