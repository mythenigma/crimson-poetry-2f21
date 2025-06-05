---
title: "Optimizing PDF File Sizes for MaiPDF"
description: "Best practices for optimizing PDF files before uploading to MaiPDF platform"
publishDate: "2025-02-10"
tags: ["pdf", "optimization", "performance", "best-practices"]
---

## Why Optimize PDFs for MaiPDF?

MaiPDF supports PDF files up to 50MB, but smaller files provide better user experience with faster loading times and reduced bandwidth usage. Optimizing your PDFs ensures smooth sharing and viewing across all devices.

<!-- Platform interface placeholder -->

## PDF Optimization Benefits

Large PDF files can cause issues for your recipients, including slow loading times, increased data usage on mobile devices, and potential timeout errors. Optimization reduces file size while maintaining essential content quality and readability.

For secure PDF sharing, file size optimization becomes even more important as protected PDFs may have additional processing overhead. A well-optimized PDF ensures your secure links load quickly and provide a smooth user experience.

### Upload Process Optimization

![Upload Interface](/maipdf-images/upload_section.png)

The MaiPDF upload interface is designed to handle various file sizes efficiently, but optimized files process faster and provide better performance for end users.

### Key Optimization Strategies

**1. Image Compression**
- Reduce image resolution to 150-300 DPI for screen viewing
- Use JPEG compression for photos
- Convert unnecessary color images to grayscale
- Remove embedded thumbnails and previews

**2. Font Optimization**
- Embed only used font subsets
- Remove unnecessary font variants
- Use standard fonts when possible
- Optimize font encoding

**3. Content Streamlining**
- Remove hidden layers and annotations
- Compress embedded objects
- Optimize vector graphics
- Remove metadata and comments

**4. Page Structure**
- Flatten complex layouts
- Optimize page sizes
- Remove blank pages
- Compress page streams

### Tools for PDF Optimization

**Adobe Acrobat Pro**
```
File > Save As Other > Optimized PDF
- Audit space usage to identify large components
- Compress images and optimize fonts
- Remove unnecessary elements
```

**Online Tools**
- SmallPDF: Easy web-based compression
- ILovePDF: Batch processing capabilities
- PDF24: Free desktop and web tools
- Soda PDF: Advanced optimization features

**Command Line Tools**
```bash
# Using Ghostscript for compression
gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 \
   -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET \
   -dBATCH -sOutputFile=optimized.pdf input.pdf

# Using qpdf for optimization
qpdf --linearize --object-streams=generate input.pdf optimized.pdf
```

### Best Practices for MaiPDF

**File Size Targets**
- Documents: 1-5 MB ideal
- Presentations: 2-10 MB acceptable
- Reports with images: 5-15 MB maximum
- Marketing materials: 3-8 MB recommended

**Quality Considerations**
- Maintain readability at 100% zoom
- Preserve essential graphics quality
- Keep text crisp and searchable
- Ensure accessibility features remain intact

### Testing Your Optimized PDFs

Before uploading to MaiPDF, test your optimized files:

1. **Visual Quality Check**
   - View at various zoom levels
   - Check image clarity
   - Verify text readability
   - Test on different devices

2. **Functionality Test**
   - Ensure links work properly
   - Test search functionality
   - Verify form fields (if applicable)
   - Check bookmarks and navigation

3. **Performance Test**
   - Measure loading times
   - Test on slower connections
   - Verify mobile compatibility
   - Check accessibility features

### Security Considerations

When optimizing PDFs for MaiPDF:

- **Remove sensitive metadata** that might contain author information, creation software, or edit history
- **Check for hidden content** like comments, annotations, or hidden layers
- **Verify text redaction** is properly applied and not just visually covered
- **Test copy protection** to ensure optimization doesn't bypass security features

### Mobile Optimization

![Mobile Experience](/maipdf-images/pdf_native_view_on_ui.png)

Given that many users will access your PDFs on mobile devices, consider these mobile-specific optimizations:

- **Single-column layouts** work better on small screens
- **Larger font sizes** improve readability
- **Simplified graphics** load faster on mobile networks
- **Portrait orientation** matches mobile viewing patterns

### Monitoring and Analytics

Once you've uploaded your optimized PDF to MaiPDF, monitor its performance:

- Track loading times across different regions
- Monitor bounce rates (users leaving before content loads)
- Analyze device-specific performance metrics
- Review user engagement patterns

![Analytics and Tracking](/maipdf-images/check_pdf_open_result.png)

By following these optimization guidelines, your PDFs will load quickly, display beautifully, and provide an excellent user experience while maintaining all of MaiPDF's security features.

After subsetting the font, I ended up with two subsets, both containing **only Latin characters**: one slightly over 100KB and another around 355KB. This significantly reduced the overall font size while keeping the necessary glyphs.

## Creating a Font Subset with Transfonter

Let's take **SF Pro Rounded**, a multilingual font, and divide it into two subsets:

- **Basic subset**: Includes Latin characters and essential symbols.
- **Extended subset**: Includes additional glyphs beyond the basic set.

### Upload the Font
1. Go to [Transfonter](https://transfonter.org/).
2. Click **Add Fonts** and select the **SF Pro Rounded Regular** font file (TTF or OTF format).

### Define Unicode Ranges
For subsetting, use the following ranges:

#### Basic Subset

transfonter.org latin + essential symbols unicode-range:
```
0000-007F, 00A0-024F, 2190-22FF, 2934-2937, F6D5-F6D8
```

#### Extended Subset

transfonter.org additional glyphs unicode-range:
```
0080-00A0, 0250-218F, 2300-FFFF
```

:::tip
You can find out the character codes and view the glyph tables of a font using built-in system tools:
- Windows: Use Character Map (charmap). Open the Start menu, search for "Character Map," and select a font to see its glyphs and Unicode codes.
- macOS: Open Font Book, select a font, and switch to "Repertoire" mode to see all available characters along with their codes.
- Linux: Use gucharmap (GNOME Character Map) or kcharselect (for KDE) to browse Unicode symbols in installed fonts.
:::

### Generate the Font Files
1. Check the **Subset** box in Transfonter.
2. Enter the Unicode ranges above for each subset.
3. Click **Convert** to generate the optimized font files.
4. Download the converted fonts.

:::tip
Additionally, when using Transfonter, you can upload and convert multiple fonts at the same time. The tool allows batch processing, and after conversion, all optimized fonts can be downloaded as a ZIP archive, making it easier to manage multiple font files efficiently.
:::

### Implement in CSS
Once the fonts are ready, use `@font-face` to load them efficiently:

```css
@font-face {
  font-family: "SFProRounded";
  src: url("/fonts/SF-Pro-Rounded-Regular-Basic.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: "SFProRounded";
  src: url("/fonts/SF-Pro-Rounded-Regular-Extended.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
```

### Test the Fonts
Ensure the fonts load correctly by inspecting network requests in the browser's developer tools. Verify that only necessary subsets are downloaded.

## Conclusion
Using Transfonter for font subsetting helps optimize web performance by reducing font file sizes while keeping necessary glyphs. Try it out with your fonts to enhance your website's loading speed!