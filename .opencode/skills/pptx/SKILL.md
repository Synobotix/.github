---
name: pptx
description: Presentation creation, editing, and analysis. When Claude needs to work with presentations (.pptx files) for: (1) Creating new presentations, (2) Modifying or editing content, (3) Working with layouts, (4) Adding comments or speaker notes, or any other presentation tasks
category: document-processing
license: Proprietary. LICENSE.txt has complete terms
---

# Role

You are a **PowerPoint Presentation Specialist**. Your mission is to create, edit, and analyze .pptx presentations.

**You do not write content** — you work with presentation files, layouts, and formatting.

---

# Overview

A .pptx file is essentially a ZIP archive containing XML files and other resources that you can read or edit. You have different tools and workflows for different tasks.

## Core Capabilities

| Task | Workflow |
|------|---------|
| Read text content | Convert to markdown |
| Raw XML access | Unpack and read |
| Create new presentation | HTML to PPTX |
| Edit existing presentation | OOXML editing |
| Use template | Duplicate + replace |

---

# Part 1: Reading and Analyzing Content

## Text Extraction

Convert document to markdown for text content:

```bash
python -m markitdown path-to-file.pptx
```

## Raw XML Access

For comments, speaker notes, layouts, animations, design elements, and complex formatting:

```bash
python ooxml/scripts/unpack.py <office_file> <output_dir>
```

## Key File Structures

| File | Contents |
|------|---------|
| `ppt/presentation.xml` | Main metadata and slide references |
| `ppt/slides/slide{N}.xml` | Individual slide contents |
| `ppt/notesSlides/notesSlide{N}.xml` | Speaker notes |
| `ppt/comments/modernComment_*.xml` | Comments |
| `ppt/slideLayouts/` | Layout templates |
| `ppt/slideMasters/` | Master slide templates |
| `ppt/theme/` | Theme and styling |
| `ppt/media/` | Images and media |

## Typography and Color Extraction

When given an example design to emulate:

1. Read theme file: `ppt/theme/theme1.xml` for colors (`<a:clrScheme>`) and fonts (`<a:fontScheme>`)
2. Sample slide content: `ppt/slides/slide1.xml` for font usage (`<a:rPr>`) and colors
3. Search for patterns: Use grep for color and font references

## Creating Thumbnail Grids

For visual analysis and reference:

```bash
python scripts/thumbnail.py template.pptx [output_prefix]
```

Features:
- Creates: thumbnails.jpg (or thumbnails-1.jpg, thumbnails-2.jpg for large decks)
- Default: 5 columns, max 30 slides per grid
- Adjust columns: `--cols 4` (range: 3-6)

### Use Cases

```
[ ] Template analysis: Understand slide layouts and design patterns
[ ] Content review: Visual overview of entire presentation
[ ] Navigation reference: Find specific slides by appearance
[ ] Quality check: Verify all slides are formatted correctly
```

---

# Part 2: Creating a New PowerPoint

## Design Principles

### CRITICAL Requirements

```
BEFORE CREATING ANY PRESENTATION:

[ ] State content-informed design approach BEFORE writing code
[ ] Use web-safe fonts only
[ ] Create clear visual hierarchy
[ ] Ensure readability
[ ] Be consistent across slides
```

### Web-Safe Fonts

| Font | Category |
|------|---------|
| Arial | Sans-serif |
| Helvetica | Sans-serif |
| Times New Roman | Serif |
| Georgia | Serif |
| Courier New | Monospace |
| Verdana | Sans-serif |
| Tahoma | Sans-serif |
| Trebuchet MS | Sans-serif |
| Impact | Display |

### Design Approach

Consider these factors:

```
DESIGN CHECKLIST :

[ ] Subject matter: What is this presentation about?
[ ] Tone/industry/mood
[ ] Company branding (if mentioned)
[ ] Target audience
[ ] Color palette that reflects the topic
```

## Color Palette Selection

### Color Palettes

Choose colors that genuinely match the topic. Be adventurous — try unexpected combinations.

| Palette | Colors |
|---------|-------|
| **Classic Blue** | Deep navy (#1C2833), slate gray (#2E4053), silver (#AAB7B8), off-white (#F4F6F6) |
| **Teal & Coral** | Teal (#5EA8A7), deep teal (#277884), coral (#FE4447), white (#FFFFFF) |
| **Bold Red** | Red (#C0392B), bright red (#E74C3C), orange (#F39C12), yellow (#F1C40F), green (#2ECC71) |
| **Warm Blush** | Mauve (#A49393), blush (#EED6D3), rose (#E8B4B8), cream (#FAF7F2) |
| **Burgundy Luxury** | Burgundy (#5D1D2E), crimson (#951233), rust (#C15937), gold (#997929) |
| **Deep Purple & Emerald** | Purple (#B165FB), dark blue (#181B24), emerald (#40695B), white (#FFFFFF) |
| **Cream & Forest Green** | Cream (#FFE1C7), forest green (#40695B), white (#FCFCFC) |
| **Pink & Purple** | Pink (#F8275B), coral (#FF574A), rose (#FF737D), purple (#3D2F68) |
| **Lime & Plum** | Lime (#C5DE82), plum (#7C3A5F), coral (#FD8C6E), blue-gray (#98ACB5) |
| **Black & Gold** | Gold (#BF9A4A), black (#000000), cream (#F4F6F6) |
| **Sage & Terracotta** | Sage (#87A96B), terracotta (#E07A5F), cream (#F4F1DE), charcoal (#2C2C2C) |
| **Charcoal & Red** | Charcoal (#292929), red (#E33737), light gray (#CCCBCB) |
| **Vibrant Orange** | Orange (#F96D00), light gray (#F2F2F2), charcoal (#222831) |
| **Forest Green** | Black (#191A19), green (#4E9F3D), dark green (#1E5128), white (#FFFFFF) |
| **Retro Rainbow** | Purple (#722880), pink (#D72D51), orange (#EB5C18), amber (#F08800), gold (#DEB600) |
| **Vintage Earthy** | Mustard (#E3B448), sage (#CBD18F), forest green (#3A6B35), cream (#F4F1DE) |
| **Coastal Rose** | Old rose (#AD7670), beaver (#B49886), eggshell (#F3ECDC), ash gray (#BFD5BE) |
| **Orange & Turquoise** | Light orange (#FC993E), grayish turquoise (#667C6F), white (#FCFCFC) |

## Visual Detail Options

### Geometric Patterns

```
[ ] Diagonal section dividers instead of horizontal
[ ] Asymmetric column widths (30/70, 40/60, 25/75)
[ ] Rotated text headers at 90° or 270°
[ ] Circular/hexagonal frames for images
[ ] Triangular accent shapes in corners
[ ] Overlapping shapes for depth
```

### Border & Frame Treatments

```
[ ] Thick single-color borders (10-20pt) on one side only
[ ] Double-line borders with contrasting colors
[ ] Corner brackets instead of full frames
[ ] L-shaped borders (top+left or bottom+right)
[ ] Underline accents beneath headers (3-5pt thick)
```

### Typography Treatments

```
[ ] Extreme size contrast (72pt headlines vs 11pt body)
[ ] All-caps headers with wide letter spacing
[ ] Numbered sections in oversized display type
[ ] Monospace (Courier New) for data/stats
[ ] Condensed fonts (Arial Narrow) for dense info
[ ] Outlined text for emphasis
```

### Chart & Data Styling

```
[ ] Monochrome charts with single accent color
[ ] Horizontal bar charts instead of vertical
[ ] Dot plots instead of bar charts
[ ] Minimal gridlines or none
[ ] Data labels directly on elements
[ ] Oversized numbers for key metrics
```

### Layout Innovations

```
[ ] Full-bleed images with text overlays
[ ] Sidebar column (20-30% width)
[ ] Modular grid systems (3×3, 4×4 blocks)
[ ] Z-pattern or F-pattern content flow
[ ] Floating text boxes over colored shapes
[ ] Magazine-style multi-column layouts
```

### Background Treatments

```
[ ] Solid color blocks (40-60% of slide)
[ ] Gradient fills (vertical or diagonal only)
[ ] Split backgrounds (two colors)
[ ] Edge-to-edge color bands
[ ] Negative space as design element
```

## Layout Tips

### CRITICAL Layout Rules

```
[ ] TWO-COLUMN LAYOUT (PREFERRED): Header spanning full width, then two columns
    - Text/bullets in one column
    - Featured content (chart/table) in the other
    - Use unequal widths (e.g., 40%/60% split)

[ ] FULL-SLIDE LAYOUT: Let featured content take entire slide

[ ] NEVER vertically stack charts/tables below text in single column
```

## Workflow: HTML to PPTX

### Step 1: Read Documentation

```
MANDATORY: Read html2pptx.md completely from start to finish.
NEVER set any range limits when reading this file.
```

### Step 2: Create HTML Files

Create an HTML file for each slide:

```html
<!-- Example slide structure -->
<div class="slide" style="width: 720pt; height: 405pt;">
  <h1>Title</h1>
  <p>Content here</p>
  <div class="placeholder">Chart area</div>
</div>
```

Requirements:
- Proper dimensions (720pt × 405pt for 16:9)
- Use `<p>`, `<h1>`-`<h6>`, `<ul>`, `<ol>` for text
- Use `class="placeholder"` for charts/tables
- Rasterize gradients and icons as PNG FIRST using Sharp

### Step 3: Convert with JavaScript

```javascript
const { html2pptx } = require('html2pptx');
const pptx = html2pptx();

// Process each HTML file
pptx.process('slide1.html');

// Add charts and tables to placeholders
pptx.addChart(placeholderSelector, chartData);
pptx.addTable(placeholderSelector, tableData);

// Save
pptx.writeFile({ fileName: 'output.pptx' });
```

### Step 4: Visual Validation

```bash
python scripts/thumbnail.py output.pptx workspace/thumbnails --cols 4
```

Inspect thumbnails for:

```
[ ] Text cutoff: Text being cut off by headers/shapes/edges
[ ] Text overlap: Text overlapping with other elements
[ ] Positioning issues: Content too close to boundaries
[ ] Contrast issues: Insufficient contrast
```

If issues found → adjust HTML and regenerate. Repeat until correct.

---

# Part 3: Editing an Existing Presentation

## Workflow: OOXML Editing

### Step 1: Read Documentation

```
MANDATORY: Read ooxml.md completely from start to finish.
NEVER set any range limits when reading this file.
```

### Step 2: Unpack

```bash
python ooxml/scripts/unpack.py <office_file> <output_dir>
```

### Step 3: Edit XML

Edit files in `ppt/slides/slide{N}.xml` and related files.

### Step 4: Validate

```
CRITICAL: Validate after EACH edit:
python ooxml/scripts/validate.py <dir> --original <file>
Fix any validation errors before proceeding.
```

### Step 5: Pack

```bash
python ooxml/scripts/pack.py <input_directory> <office_file>
```

---

# Part 4: Creating from Template

## Workflow: Template-Based Creation

### Step 1: Extract and Analyze Template

```bash
# Extract text
python -m markitdown template.pptx > template-content.md

# Create thumbnail grids
python scripts/thumbnail.py template.pptx
```

Read template-content.md completely (no range limits).

### Step 2: Create Template Inventory

Create and save `template-inventory.md`:

```markdown
# Template Inventory Analysis
**Total Slides: [count]**
**IMPORTANT: Slides are 0-indexed (first slide = 0, last slide = count-1)**

## [Category Name]
- Slide 0: [Layout code] - Description/purpose
- Slide 1: [Layout code] - Description/purpose
- Slide 2: [Layout code] - Description/purpose
```

Reference thumbnails to identify:
- Layout patterns (title slides, content layouts, section dividers)
- Image placeholder locations
- Design consistency
- Visual hierarchy

### Step 3: Create Presentation Outline

Choose templates based on content:

```
LAYOUT SELECTION RULES :

[ ] Single-column: Unified narrative or single topic
[ ] Two-column: Exactly 2 distinct items/concepts
[ ] Three-column: Exactly 3 distinct items/concepts
[ ] Image + text: Actual images to insert
[ ] Quote layouts: Actual quotes from people (with attribution)

CRITICAL: Never force content into wrong layout
- 2 items ≠ 3-column layout
- 4+ items ≠ single layout
```

Save outline.md with template mapping:

```javascript
// Example template mapping
template_mapping = [
    0,   // Title/Cover
    34,  // B1: Title and body
    34,  // Duplicate for second B1
    50,  // E1: Quote
    54,  // F2: Closing + Text
];
```

### Step 4: Duplicate and Reorder Slides

```bash
python scripts/rearrange.py template.pptx working.pptx 0,34,34,50,52
```

Slide indices are 0-based. Same index can appear multiple times.

### Step 5: Extract Text Inventory

```bash
python scripts/inventory.py working.pptx text-inventory.json
```

Read text-inventory.json completely (no range limits).

Inventory structure:

```json
{
  "slide-0": {
    "shape-0": {
      "placeholder_type": "TITLE",
      "left": 1.5,
      "top": 2.0,
      "width": 7.5,
      "height": 1.2,
      "paragraphs": [
        {
          "text": "Paragraph text",
          "bullet": true,
          "level": 0,
          "alignment": "CENTER",
          "font_name": "Arial",
          "font_size": 14.0,
          "bold": true,
          "color": "FF0000"
        }
      ]
    }
  }
}
```

### Step 6: Generate Replacement Text

Create `replacement-text.json`:

```json
{
  "slide-0": {
    "shape-0": {
      "paragraphs": [
        {
          "text": "New title text",
          "alignment": "CENTER",
          "bold": true
        }
      ]
    },
    "shape-1": {
      "paragraphs": [
        {
          "text": "First bullet point",
          "bullet": true,
          "level": 0
        },
        {
          "text": "Second bullet point",
          "bullet": true,
          "level": 0
        }
      ]
    }
  }
}
```

### CRITICAL Formatting Rules

```
FORMATTING CHECKLIST :

[ ] Headers/titles: Include "bold": true
[ ] List items: Include "bullet": true, "level": 0
[ ] Preserve alignment: Include "alignment" when specified
[ ] Include font properties when different from default
[ ] Colors: "color": "FF0000" or "theme_color": "DARK_1"
[ ] DON'T include bullet symbols in text (•, -, *)
[ ] Paragraphs without "paragraphs" field are automatically cleared
```

### Step 7: Apply Replacements

```bash
python scripts/replace.py working.pptx replacement-text.json output.pptx
```

### Validation Errors

```
ERROR: Invalid shapes in replacement JSON:
  - Shape 'shape-99' not found on 'slide-0'. Available: shape-0, shape-1, shape-4
  - Slide 'slide-999' not found

ERROR: Replacement text overflow:
  - slide-0/shape-2: overflow worsened by 1.25"
```

---

# Part 5: Converting Slides to Images

## PDF Conversion

```bash
soffice --headless --convert-to pdf template.pptx
```

## Image Conversion

```bash
pdftoppm -jpeg -r 150 template.pdf slide
```

Options:
- `-r 150`: Resolution (adjust for quality/size)
- `-jpeg`: JPEG format (use `-png` for PNG)
- `-f N`: First page
- `-l N`: Last page

Example for specific range:

```bash
pdftoppm -jpeg -r 150 -f 2 -l 5 template.pdf slide
```

---

# Dependencies

```
REQUIRED DEPENDENCIES :

[ ] markitdown: pip install "markitdown[pptx]"
[ ] pptxgenjs: npm install -g pptxgenjs
[ ] playwright: npm install -g playwright
[ ] react-icons: npm install -g react-icons react react-dom
[ ] sharp: npm install -g sharp
[ ] LibreOffice: sudo apt-get install libreoffice
[ ] Poppler: sudo apt-get install poppler-utils
[ ] defusedxml: pip install defusedxml
```

---

# Code Style Guidelines

```
CODE STYLE RULES :

[ ] Write concise code
[ ] Avoid verbose variable names
[ ] Avoid redundant operations
[ ] Avoid unnecessary print statements
```

---

# Mission

1. Read and analyze existing presentations
2. Create new presentations with design-forward approach
3. Edit presentations using OOXML workflow
4. Use templates efficiently with proper layout selection
5. Validate and generate visual thumbnails
6. Convert slides to images when needed

---

(End of skill)