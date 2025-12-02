import fs from "node:fs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";
import robotsTxt from "astro-robots-txt";
import webmanifest from "astro-webmanifest";
import { defineConfig, envField } from "astro/config";



import { siteConfig } from "./src/site.config";

// Remark plugins
import remarkDirective from "remark-directive"; /* handle ::: directives as nodes */
import { remarkAdmonitions } from "./src/plugins/remark-admonitions"; /* add admonitions */
import { remarkReadingTime } from "./src/plugins/remark-reading-time";

// Rehype plugins
import rehypeExternalLinks from "rehype-external-links";
import rehypeUnwrapImages from "rehype-unwrap-images";

import rehypePrettyCode from "rehype-pretty-code";
import {
  transformerMetaHighlight,
  transformerNotationDiff,
} from "@shikijs/transformers";

// https://astro.build/config
export default defineConfig({
  image: {
    domains: ["webmention.io"],
  },
  integrations: [
    icon(),
    tailwind({
      applyBaseStyles: false,
      nesting: true,
    }),
    sitemap({
      // 激进的sitemap配置 - 确保所有页面都被包含
      entryLimit: 50000,
      filter: (page) => {
        // 更宽松的过滤策略 - 只排除真正不需要的页面
        const excludePatterns = ['/404', '/og-image/', '/_astro/', '/api/', '/admin/'];
        return !excludePatterns.some(pattern => page.includes(pattern));
      },
      customPages: [
        'https://pdfhost.online/',
        'https://pdfhost.online/about/',
        'https://pdfhost.online/posts/',
        'https://pdfhost.online/notes/',
        'https://pdfhost.online/tags/',
        // PDF功能核心页面
        'https://pdfhost.online/posts/pdf-to-qr-simple-guide/',
        'https://pdfhost.online/posts/pdf-qr-beginners-guide/',
        'https://pdfhost.online/posts/pdf-qr-vs-email-attachments/',
        'https://pdfhost.online/posts/pdf-qr-messaging-apps/',
        'https://pdfhost.online/posts/pdf-qr-security-guide/',
        'https://pdfhost.online/posts/pdf-qr-tracking-analytics/',
        // PDF链接分享相关
        'https://pdfhost.online/posts/pdf-to-link-generator/',
        'https://pdfhost.online/posts/pdf-link-sharing-simple/',
        'https://pdfhost.online/posts/pdf-link-vs-cloud-storage/',
        // PDF DRM和安全相关
        'https://pdfhost.online/posts/free-pdf-drm-online/',
        'https://pdfhost.online/posts/pdf-drm-beginners-guide/',
        'https://pdfhost.online/posts/pdf-drm-vs-traditional-sharing/',
        'https://pdfhost.online/posts/stop-pdf-forwarding-tips/',
        'https://pdfhost.online/posts/pdf-anti-forwarding-secrets/',
        // 社交媒体和移动端分享
        'https://pdfhost.online/posts/pdf-social-media-sharing/',
        'https://pdfhost.online/posts/pdf-mobile-sharing-links/',
        'https://pdfhost.online/posts/pdf-cross-platform-sharing/',
        // PDF托管服务相关
        'https://pdfhost.online/posts/free-pdf-hosting-guide/',
        'https://pdfhost.online/posts/pdf-hosting-vs-file-sharing/',
        'https://pdfhost.online/posts/host-pdf-online-free-guide/',
        'https://pdfhost.online/posts/host-pdf-online-free-vs-paid/',
        // Google Drive替代方案
        'https://pdfhost.online/posts/maipdf-google-drive-alternative/',
        
        // 新增的PDF编辑保护文章 - 高价值内容
        'https://pdfhost.online/posts/pdf-edit-protection-offline-chinese/',
        'https://pdfhost.online/posts/pdf-edit-protection-online-chinese/',
        'https://pdfhost.online/posts/prevent-pdf-editing-offline-guide/',
        'https://pdfhost.online/posts/online-pdf-edit-protection-guide/',\n        'https://pdfhost.online/posts/prevent-pdf-editing-offline-complete/',\n        'https://pdfhost.online/posts/prevent-pdf-editing-online-complete/',\n        'https://pdfhost.online/posts/prevent-pdf-editing-offline-english/',\n        'https://pdfhost.online/posts/prevent-pdf-editing-online-english/',
        
        // 重要的功能页面和着陆页
        'https://pdfhost.online/sitemap/',
        'https://pdfhost.online/features/',
        'https://pdfhost.online/tools/',
        'https://pdfhost.online/pdf-security/',
        'https://pdfhost.online/pdf-sharing/',
        'https://pdfhost.online/pdf-qr-code/',
        
        // 主要标签页面 - 分类索引
        'https://pdfhost.online/tags/pdf/',
        'https://pdfhost.online/tags/security/',
        'https://pdfhost.online/tags/sharing/',
        'https://pdfhost.online/tags/protection/',
        'https://pdfhost.online/tags/qr-code/',
        'https://pdfhost.online/tags/links/',
        'https://pdfhost.online/tags/drm/',
        'https://pdfhost.online/tags/hosting/',
        'https://pdfhost.online/tags/mobile/',
        'https://pdfhost.online/tags/online/',
        'https://pdfhost.online/tags/offline/',
        'https://pdfhost.online/tags/edit-protection/',
        'https://pdfhost.online/tags/password-protection/',
        'https://pdfhost.online/tags/access-control/',
        
        // 其他现有文章
        'https://pdfhost.online/posts/share-pdfs-as-links/',
        'https://pdfhost.online/posts/set-pdf-open-limits/',
        'https://pdfhost.online/posts/make-pdf-links-expire/',
        'https://pdfhost.online/posts/what-is-free-pdf-drm/',
        'https://pdfhost.online/posts/smart-resume-sharing/',
        'https://pdfhost.online/posts/stop-using-google-drive-for-pdfs/',
        'https://pdfhost.online/posts/share-pdf-on-instagram/',
        'https://pdfhost.online/posts/stop-emailing-proposals/',
        'https://pdfhost.online/posts/how-to-send-resume/',
        'https://pdfhost.online/posts/protect-your-ebook/',
      ],
      serialize(item) {
        // 首页最高优先级
        if (item.url === 'https://pdfhost.online/') {
          item.priority = 1.0;
          item.changefreq = "daily";
        } 
        // PDF核心功能文章 - 高优先级
        else if (item.url.includes('/pdf-to-qr-simple-guide/') || 
                 item.url.includes('/pdf-qr-beginners-guide/') ||
                 item.url.includes('/pdf-to-link-generator/') ||
                 item.url.includes('/free-pdf-drm-online/') ||
                 item.url.includes('/free-pdf-hosting-guide/')) {
          item.priority = 0.9;
          item.changefreq = "weekly";
        }
        // PDF功能对比类文章 - 次高优先级
        else if (item.url.includes('/pdf-qr-vs-email-attachments/') ||
                 item.url.includes('/pdf-drm-vs-traditional-sharing/') ||
                 item.url.includes('/pdf-hosting-vs-file-sharing/') ||
                 item.url.includes('/pdf-link-vs-cloud-storage/') ||
                 item.url.includes('/maipdf-google-drive-alternative/') ||
                 item.url.includes('/stop-using-google-drive-for-pdfs/')) {
          item.priority = 0.8;
          item.changefreq = "weekly";
        }
        // 新增的用例文章 - 高优先级
        else if (item.url.includes('/share-pdf-on-instagram/') ||
                 item.url.includes('/stop-emailing-proposals/') ||
                 item.url.includes('/how-to-send-resume/') ||
                 item.url.includes('/protect-your-ebook/') ||
                 item.url.includes('/smart-resume-sharing/')) {
          item.priority = 0.8;
          item.changefreq = "monthly";
        }
        // PDF安全和防转发文章
        else if (item.url.includes('/stop-pdf-forwarding-tips/') ||
                 item.url.includes('/pdf-anti-forwarding-secrets/') ||
                 item.url.includes('/pdf-drm-beginners-guide/') ||
                 item.url.includes('/pdf-qr-security-guide/')) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        // 社交媒体和跨平台分享文章
        else if (item.url.includes('/pdf-social-media-sharing/') ||
                 item.url.includes('/pdf-mobile-sharing-links/') ||
                 item.url.includes('/pdf-cross-platform-sharing/')) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        // PDF托管和在线服务文章
        else if (item.url.includes('/host-pdf-online-free-guide/') ||
                 item.url.includes('/host-pdf-online-free-vs-paid/')) {
          item.priority = 0.7;
          item.changefreq = "monthly";
        }
        // 其他PDF功能文章
        else if (item.url.includes('/pdf-qr-messaging-apps/') ||
                 item.url.includes('/pdf-qr-tracking-analytics/') ||
                 item.url.includes('/pdf-link-sharing-simple/') ||
                 item.url.includes('/share-pdfs-as-links/') ||
                 item.url.includes('/set-pdf-open-limits/') ||
                 item.url.includes('/make-pdf-links-expire/') ||
                 item.url.includes('/what-is-free-pdf-drm/')) {
          item.priority = 0.6;
          item.changefreq = "monthly";
        }
        // 一般博客文章
        else if (item.url.includes('/posts/')) {
          item.priority = 0.5;
          item.changefreq = "monthly";
        } 
        // Notes页面
        else if (item.url.includes('/notes/')) {
          item.priority = 0.4;
          item.changefreq = "monthly";
        } 
        // 标签页面
        else if (item.url.includes('/tags/')) {
          item.priority = 0.3;
          item.changefreq = "weekly";
        } 
        // 其他页面
        else {
          item.priority = 0.5;
          item.changefreq = "monthly";
        }
        
        // 设置最后修改时间为当前时间
        item.lastmod = new Date().toISOString();
        
        return item;
      },
    }),
    mdx(),
    robotsTxt(),
    webmanifest({
      // See: https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/README.md
      /**
       * required
       **/
      name: siteConfig.title,
      /**
       * optional
       **/
      // short_name: "Astro_Citrus",
      description: siteConfig.description,
      lang: siteConfig.lang,
      icon: "public/icon.svg", // the source for generating favicon & icons
      icons: [
        {
          src: "icons/apple-touch-icon.png", // used in src/components/BaseHead.astro L:26
          sizes: "180x180",
          type: "image/png",
        },
        {
          src: "icons/icon-192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: "icons/icon-512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      start_url: "/",
      background_color: "#1d1f21",
      theme_color: "#2bbc8a",
      display: "standalone",
      config: {
        insertFaviconLinks: false,
        insertThemeColorMeta: false,
        insertManifestLink: false,
      },
    }),
  ],
  markdown: {
    syntaxHighlight: false,

    remarkPlugins: [remarkReadingTime, remarkDirective, remarkAdmonitions],
    remarkRehype: {
      footnoteLabelProperties: {
        className: [""],
      },
      footnoteBackContent: "⤴",
    },

    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          rel: ["nofollow", "noreferrer"],
          target: "_blank",
        },
      ],

      [
        rehypePrettyCode,
        {
          theme: {
            light: "rose-pine-dawn", // after changing the theme, the server needs to be restarted
            dark: "rose-pine", // after changing the theme, the server needs to be restarted
          },

          transformers: [transformerNotationDiff(), transformerMetaHighlight()],
        },
      ],
      rehypeUnwrapImages,
    ],
  },
  // https://docs.astro.build/en/guides/prefetch/
  prefetch: true,
  // ! Please remember to replace the following site property with your own domain
  site: "https://pdfhost.online/",
  vite: {
    build: {
      sourcemap: true, // Source maps generation
    },
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
    plugins: [rawFonts([".ttf", ".woff"])],
  },
  env: {
    schema: {
      WEBMENTION_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: true,
      }),
      WEBMENTION_URL: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
      WEBMENTION_PINGBACK: envField.string({
        context: "client",
        access: "public",
        optional: true,
      }),
    },
  },
  server: {
    // port: 1234,
    host: true,
  },
});

function rawFonts(ext: string[]) {
  return {
    name: "vite-plugin-raw-fonts",
    // @ts-expect-error:next-line
    transform(_, id) {
      if (ext.some((e) => id.endsWith(e))) {
        const buffer = fs.readFileSync(id);
        return {
          code: `export default ${JSON.stringify(buffer)}`,
          map: null,
        };
      }
    },
  };
}
