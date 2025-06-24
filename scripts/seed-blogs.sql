-- Seed Blog Posts for Neon Database (No Featured Image)
-- NOTE: Before running this, you must make the 'featured_image_id' column nullable.
-- Run this command in your Neon SQL Editor first:
-- ALTER TABLE "blogs" ALTER COLUMN "featured_image_id" DROP NOT NULL;

-- Insert sample blog posts into the main blogs table
INSERT INTO "blogs" (
    "title",
    "slug",
    "excerpt",
    "category",
    "status",
    "published_at",
    "reading_time",
    "seo_meta_title",
    "seo_meta_description",
    "seo_keywords",
    "content",
    "created_at",
    "updated_at"
) VALUES
(
    'Building a Modern Portfolio with Next.js and Payload CMS',
    'building-a-modern-portfolio-with-nextjs-and-payload-cms',
    'Learn how to create a stunning portfolio website using Next.js 14, Payload CMS, and modern design patterns. This comprehensive guide covers everything from setup to deployment.',
    'tutorial',
    'published',
    '2024-01-15',
    8,
    'Modern Portfolio with Next.js and Payload CMS - Complete Guide',
    'Build a stunning portfolio website using Next.js 14 and Payload CMS. Learn modern design patterns, deployment strategies, and best practices.',
    'nextjs, payload cms, portfolio, web development, react, typescript',
    '{"root": {"children": [{"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a sample blog post about building a modern portfolio with Next.js and Payload CMS. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}, {"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a second paragraph with more content. You can add code examples, images, and other rich content here.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1}}',
    NOW(),
    NOW()
),
(
    'The Future of Web Development: AI-Powered Tools and Workflows',
    'the-future-of-web-development-ai-powered-tools-and-workflows',
    'Exploring how artificial intelligence is transforming the web development landscape, from code generation to automated testing and deployment strategies.',
    'technology',
    'published',
    '2024-01-10',
    6,
    'AI-Powered Web Development: The Future of Coding',
    'Discover how AI is revolutionizing web development with automated tools, code generation, and intelligent workflows.',
    'ai, web development, automation, coding, future technology',
    '{"root": {"children": [{"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a sample blog post about the future of web development with AI-powered tools and workflows. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}, {"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a second paragraph with more content. You can add code examples, images, and other rich content here.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1}}',
    NOW(),
    NOW()
),
(
    'Designing for Dark Mode: Best Practices and Implementation',
    'designing-for-dark-mode-best-practices-and-implementation',
    'A deep dive into dark mode design principles, implementation strategies, and user experience considerations for modern web applications.',
    'design',
    'published',
    '2024-01-08',
    7,
    'Dark Mode Design: Complete Guide to Implementation',
    'Master dark mode design with best practices, implementation strategies, and user experience considerations.',
    'dark mode, ui design, ux, css, web design',
    '{"root": {"children": [{"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a sample blog post about designing for dark mode with best practices and implementation. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}, {"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a second paragraph with more content. You can add code examples, images, and other rich content here.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1}}',
    NOW(),
    NOW()
),
(
    'TypeScript vs JavaScript: When to Use Each in Modern Development',
    'typescript-vs-javascript-when-to-use-each-in-modern-development',
    'Comparing TypeScript and JavaScript for different project scenarios. Learn when to choose TypeScript for type safety and when JavaScript might be the better option.',
    'development',
    'published',
    '2024-01-05',
    5,
    'TypeScript vs JavaScript: Complete Comparison Guide',
    'Compare TypeScript and JavaScript to choose the right language for your project. Learn when to use each for optimal development.',
    'typescript, javascript, programming, comparison, web development',
    '{"root": {"children": [{"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a sample blog post about TypeScript vs JavaScript comparison. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}, {"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a second paragraph with more content. You can add code examples, images, and other rich content here.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1}}',
    NOW(),
    NOW()
),
(
    'My Journey from Junior to Senior Developer: Lessons Learned',
    'my-journey-from-junior-to-senior-developer-lessons-learned',
    'Personal insights and lessons learned during my transition from junior to senior developer. Tips, challenges, and growth strategies for career advancement.',
    'thoughts',
    'published',
    '2024-01-03',
    4,
    'Junior to Senior Developer: My Career Journey and Lessons',
    'Personal journey from junior to senior developer with valuable lessons, challenges, and growth strategies for career advancement.',
    'career growth, developer journey, senior developer, programming career',
    '{"root": {"children": [{"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a sample blog post about my journey from junior to senior developer. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}, {"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a second paragraph with more content. You can add code examples, images, and other rich content here.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1}}',
    NOW(),
    NOW()
),
(
    'Building a Real-Time Chat Application with WebSockets',
    'building-a-realtime-chat-application-with-websockets',
    'Step-by-step guide to creating a real-time chat application using WebSockets, Node.js, and React. Includes authentication, message persistence, and deployment.',
    'tutorial',
    'published',
    '2024-01-01',
    10,
    'Real-Time Chat App with WebSockets: Complete Tutorial',
    'Build a real-time chat application using WebSockets, Node.js, and React. Complete tutorial with authentication and deployment.',
    'websockets, nodejs, react, real-time, chat application, tutorial',
    '{"root": {"children": [{"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a sample blog post about building a real-time chat application with WebSockets. In a real blog post, this would contain rich content with headings, paragraphs, code blocks, and other formatting.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}, {"children": [{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "This is a second paragraph with more content. You can add code examples, images, and other rich content here.", "type": "text", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "paragraph", "version": 1}], "direction": "ltr", "format": "", "indent": 0, "type": "root", "version": 1}}',
    NOW(),
    NOW()
);

-- Now let's get the IDs of the blogs we just created to link tags
-- We'll use a CTE (Common Table Expression) to get the blog IDs
WITH blog_ids AS (
    SELECT id, title FROM "blogs"
    WHERE title IN (
        'Building a Modern Portfolio with Next.js and Payload CMS',
        'The Future of Web Development: AI-Powered Tools and Workflows',
        'Designing for Dark Mode: Best Practices and Implementation',
        'TypeScript vs JavaScript: When to Use Each in Modern Development',
        'My Journey from Junior to Senior Developer: Lessons Learned',
        'Building a Real-Time Chat Application with WebSockets'
    )
)
-- Insert tags for each blog
INSERT INTO "blogs_tags" ("_parent_id", "tag", "_order", "id")
SELECT
    bi.id as "_parent_id",
    tag_value as "tag",
    tag_order as "_order",
    gen_random_uuid() as "id"
FROM blog_ids bi
CROSS JOIN (
    -- Blog 1: Building a Modern Portfolio
    SELECT 'Building a Modern Portfolio with Next.js and Payload CMS' as title, 'nextjs' as tag_value, 1 as tag_order
    UNION ALL SELECT 'Building a Modern Portfolio with Next.js and Payload CMS', 'payload', 2
    UNION ALL SELECT 'Building a Modern Portfolio with Next.js and Payload CMS', 'portfolio', 3
    UNION ALL SELECT 'Building a Modern Portfolio with Next.js and Payload CMS', 'web-development', 4

    -- Blog 2: AI-Powered Tools
    UNION ALL SELECT 'The Future of Web Development: AI-Powered Tools and Workflows', 'ai', 1
    UNION ALL SELECT 'The Future of Web Development: AI-Powered Tools and Workflows', 'web-development', 2
    UNION ALL SELECT 'The Future of Web Development: AI-Powered Tools and Workflows', 'future-tech', 3
    UNION ALL SELECT 'The Future of Web Development: AI-Powered Tools and Workflows', 'automation', 4

    -- Blog 3: Dark Mode Design
    UNION ALL SELECT 'Designing for Dark Mode: Best Practices and Implementation', 'dark-mode', 1
    UNION ALL SELECT 'Designing for Dark Mode: Best Practices and Implementation', 'ui-design', 2
    UNION ALL SELECT 'Designing for Dark Mode: Best Practices and Implementation', 'ux', 3
    UNION ALL SELECT 'Designing for Dark Mode: Best Practices and Implementation', 'css', 4

    -- Blog 4: TypeScript vs JavaScript
    UNION ALL SELECT 'TypeScript vs JavaScript: When to Use Each in Modern Development', 'typescript', 1
    UNION ALL SELECT 'TypeScript vs JavaScript: When to Use Each in Modern Development', 'javascript', 2
    UNION ALL SELECT 'TypeScript vs JavaScript: When to Use Each in Modern Development', 'programming', 3
    UNION ALL SELECT 'TypeScript vs JavaScript: When to Use Each in Modern Development', 'comparison', 4

    -- Blog 5: Career Journey
    UNION ALL SELECT 'My Journey from Junior to Senior Developer: Lessons Learned', 'career', 1
    UNION ALL SELECT 'My Journey from Junior to Senior Developer: Lessons Learned', 'personal-growth', 2
    UNION ALL SELECT 'My Journey from Junior to Senior Developer: Lessons Learned', 'development', 3
    UNION ALL SELECT 'My Journey from Junior to Senior Developer: Lessons Learned', 'experience', 4

    -- Blog 6: WebSockets Chat
    UNION ALL SELECT 'Building a Real-Time Chat Application with WebSockets', 'websockets', 1
    UNION ALL SELECT 'Building a Real-Time Chat Application with WebSockets', 'nodejs', 2
    UNION ALL SELECT 'Building a Real-Time Chat Application with WebSockets', 'react', 3
    UNION ALL SELECT 'Building a Real-Time Chat Application with WebSockets', 'real-time', 4
    UNION ALL SELECT 'Building a Real-Time Chat Application with WebSockets', 'chat', 5
) tags
WHERE bi.title = tags.title;

-- Verify the insertion
SELECT
    b.id,
    b.title,
    b.category,
    b.status,
    b.published_at,
    b.reading_time,
    COUNT(bt.tag) as tag_count
FROM "blogs" b
LEFT JOIN "blogs_tags" bt ON b.id = bt._parent_id
WHERE b.status = 'published'
GROUP BY b.id, b.title, b.category, b.status, b.published_at, b.reading_time
ORDER BY b."published_at" DESC;

-- Show tags for each blog
SELECT
    b.title,
    STRING_AGG(bt.tag, ', ' ORDER BY bt."_order") as tags
FROM "blogs" b
LEFT JOIN "blogs_tags" bt ON b.id = bt._parent_id
WHERE b.status = 'published'
GROUP BY b.id, b.title
ORDER BY b."published_at" DESC;

-- Check the count
SELECT COUNT(*) as total_blogs FROM "blogs" WHERE status = 'published';
