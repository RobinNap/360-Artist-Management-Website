#!/usr/bin/env python3
"""
Generate article pages from content.json
Run: python3 generate.py
"""

import json
import os
from pathlib import Path

def load_content():
    with open('data/content.json', 'r') as f:
        return json.load(f)

def render_content_block(block):
    """Render a single content block to HTML."""
    block_type = block.get('type', 'text')
    
    if block_type == 'intro':
        return f'<p class="article-intro">{block["text"]}</p>'
    
    elif block_type == 'text':
        return f'<p>{block["text"]}</p>'
    
    elif block_type == 'heading':
        return f'<h2>{block["text"]}</h2>'
    
    elif block_type == 'list':
        items = ''.join(f'<li>{item}</li>' for item in block['items'])
        title = f'<h3>{block["title"]}</h3>' if 'title' in block else ''
        return f'{title}<ul class="content-list">{items}</ul>'
    
    elif block_type == 'grid':
        items_html = ''
        for item in block['items']:
            items_html += f'''
            <div class="content-grid-item">
                <span class="grid-icon">{item["icon"]}</span>
                <h4>{item["title"]}</h4>
                <p>{item["text"]}</p>
            </div>'''
        return f'<div class="content-grid">{items_html}</div>'
    
    elif block_type == 'tip':
        return f'''<div class="callout callout-tip">
            <div class="callout-icon">💡</div>
            <div class="callout-content"><p>{block["text"]}</p></div>
        </div>'''
    
    elif block_type == 'warning':
        return f'''<div class="callout callout-warning">
            <div class="callout-icon">⚠️</div>
            <div class="callout-content"><p>{block["text"]}</p></div>
        </div>'''
    
    elif block_type == 'example':
        items = ''.join(f'<li>{item}</li>' for item in block['items'])
        return f'''
        <div class="example-box">
            <h4>{block["title"]}</h4>
            <ul>{items}</ul>
        </div>'''
    
    elif block_type == 'reflection':
        return f'''
        <div class="callout callout-exercise">
            <div class="callout-icon">✍️</div>
            <div class="callout-content">
                <h4>{block["title"]}</h4>
                <p>{block["text"]}</p>
            </div>
        </div>'''
    
    elif block_type == 'download':
        file_path = f'../../assets/downloads/{block["file"]}'
        return f'''
        <div class="download-card">
            <div class="download-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7,10 12,15 17,10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
            </div>
            <div class="download-info">
                <h4>{block["title"]}</h4>
                <p>{block["description"]}</p>
            </div>
            <a href="{file_path}" class="btn btn-ghost" download>Download</a>
        </div>'''
    
    elif block_type == 'image':
        src = f'../../assets/images/{block["src"]}'
        caption = f'<figcaption>{block["caption"]}</figcaption>' if 'caption' in block else ''
        return f'''
        <figure class="article-figure">
            <img src="{src}" alt="{block.get("alt", "")}" loading="lazy">
            {caption}
        </figure>'''
    
    return ''

def get_icon_svg(icon_name):
    """Return SVG for icon name."""
    icons = {
        'layers': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 2,7 12,12 22,7"/><polyline points="2,17 12,22 22,17"/><polyline points="2,12 12,17 22,12"/></svg>',
        'users': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        'trending-up': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>',
        'calendar': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        'dollar-sign': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        'file-text': '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>',
    }
    return icons.get(icon_name, icons['layers'])

def generate_article_html(module_id, module, article, articles, article_index):
    """Generate HTML for a single article."""
    
    # Build content
    content_html = ''
    for block in article['content']:
        content_html += render_content_block(block)
    
    # Calculate progress
    total_articles = len(articles)
    current_position = article_index + 1
    progress_percent = (current_position / total_articles) * 100
    
    # Build chapter list
    chapter_list_html = ''
    for i, art in enumerate(articles):
        is_active = 'active' if i == article_index else ''
        is_completed = 'completed' if i < article_index else ''
        chapter_list_html += f'''
            <a href="{art["slug"]}.html" class="chapter-item {is_active} {is_completed}">
                <span class="chapter-number">{str(i + 1).zfill(2)}</span>
                <span class="chapter-title">{art["title"]}</span>
            </a>'''
    
    # Continue reading section
    continue_section = ''
    if article_index < len(articles) - 1:
        next_article = articles[article_index + 1]
        continue_section = f'''
        <section class="continue-reading">
            <a href="{next_article["slug"]}.html" class="continue-card">
                <div class="continue-content">
                    <div class="continue-label">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                        Up Next
                    </div>
                    <div class="continue-title">{next_article["title"]}</div>
                    <div class="continue-description">{next_article["description"]}</div>
                </div>
                <div class="continue-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                </div>
            </a>
        </section>'''
    
    # Inline article navigation
    prev_link = ''
    next_link = ''
    
    if article_index > 0:
        prev_article = articles[article_index - 1]
        prev_link = f'''<a href="{prev_article["slug"]}.html" class="article-nav-link prev">
            <span class="nav-direction">Previous</span>
            <span class="nav-title">{prev_article["title"]}</span>
        </a>'''
    else:
        prev_link = '<div class="article-nav-link disabled"></div>'
    
    if article_index < len(articles) - 1:
        next_article = articles[article_index + 1]
        next_link = f'''<a href="{next_article["slug"]}.html" class="article-nav-link next">
            <span class="nav-direction">Next</span>
            <span class="nav-title">{next_article["title"]}</span>
        </a>'''
    else:
        next_link = '<div class="article-nav-link disabled"></div>'
    
    icon_svg = get_icon_svg(module.get('icon', 'layers'))
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{article["title"]} | {module["title"]} | 360° Artist Management</title>
    <link rel="stylesheet" href="../../css/style.css">
    <link rel="stylesheet" href="../../css/articles.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="bg-gradient"></div>
    <div class="noise-overlay"></div>

    <nav class="nav">
        <div class="nav-container">
            <a href="../../index.html" class="logo">
                <span class="logo-360">360°</span>
                <span class="logo-text">Artist Management</span>
            </a>
            <div class="nav-links">
                <a href="../../index.html#modules" class="nav-link">Topics</a>
                <a href="../../index.html#about" class="nav-link">About</a>
            </div>
            <button class="mobile-menu-btn" id="mobileMenuBtn">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
        <a href="../../index.html#modules" class="mobile-link">Topics</a>
        <a href="../../index.html#about" class="mobile-link">About</a>
    </div>

    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    
    <button class="sidebar-toggle" id="sidebarToggle" aria-label="Toggle chapter list">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 12h18M3 6h18M3 18h18"/>
        </svg>
    </button>

    <main class="article-page">
        <div class="article-layout">
            
        <aside class="chapter-sidebar">
            <div class="sidebar-header">
                <a href="../../modules/{module_id}.html" class="sidebar-module-link">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M19 12H5M12 19l-7-7 7-7"/>
                    </svg>
                    {module["title"]}
                </a>
            </div>
            
            <nav class="chapter-list">
                {chapter_list_html}
            </nav>
        </aside>
            
            <div class="article-main">
                <div class="article-hero">
                    <div class="breadcrumb">
                        <a href="../../index.html">Home</a>
                        <span>/</span>
                        <a href="../../modules/{module_id}.html">{module["title"]}</a>
                        <span>/</span>
                        <span class="current">{article["title"]}</span>
                    </div>
                    <div class="article-hero-content">
                        <div class="module-hero-icon">
                            {icon_svg}
                        </div>
                        <div class="article-hero-text">
                            <span class="article-module-tag">{module["title"]}</span>
                            <h1>{article["title"]}</h1>
                            <p class="article-description">{article["description"]}</p>
                        </div>
                    </div>
                </div>

                <article class="article-content">
                    {content_html}
                </article>

                {continue_section}

                <nav class="article-navigation">
                    {prev_link}
                    {next_link}
                </nav>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <p class="footer-text">© 2025 360° Artist Management. All rights reserved.</p>
        </div>
    </footer>

    <script src="../../js/app.js"></script>
</body>
</html>'''

def generate_module_html(module_id, module):
    """Generate HTML for a module page."""
    
    articles_html = ''
    for i, article in enumerate(module['articles']):
        articles_html += f'''
        <a href="../lessons/{module_id}/{article["slug"]}.html" class="lesson-card">
            <div class="lesson-number">{str(i + 1).zfill(2)}</div>
            <div class="lesson-info">
                <div class="lesson-title">{article["title"]}</div>
                <div class="lesson-type">{article["description"]}</div>
            </div>
            <div class="lesson-action">
                Read
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
            </div>
        </a>'''
    
    icon_svg = get_icon_svg(module.get('icon', 'layers'))
    
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{module["title"]} | 360° Artist Management</title>
    <link rel="stylesheet" href="../css/style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Clash+Display:wght@400;500;600;700&family=Satoshi:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="bg-gradient"></div>
    <div class="noise-overlay"></div>

    <nav class="nav">
        <div class="nav-container">
            <a href="../index.html" class="logo">
                <span class="logo-360">360°</span>
                <span class="logo-text">Artist Management</span>
            </a>
            <div class="nav-links">
                <a href="../index.html#modules" class="nav-link">Topics</a>
                <a href="../index.html#about" class="nav-link">About</a>
            </div>
            <button class="mobile-menu-btn" id="mobileMenuBtn">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </nav>

    <div class="mobile-menu" id="mobileMenu">
        <a href="../index.html#modules" class="mobile-link">Topics</a>
        <a href="../index.html#about" class="mobile-link">About</a>
    </div>

    <main class="module-page">
        <div class="module-hero">
            <div class="breadcrumb">
                <a href="../index.html">Home</a>
                <span>/</span>
                <span class="current">{module["title"]}</span>
            </div>
            <div class="module-hero-content">
                <div class="module-hero-icon">
                    {icon_svg}
                </div>
                <div class="module-hero-text">
                    <h1>{module["title"]}</h1>
                    <p>{module["description"]}</p>
                    <div class="module-stats">
                        <span>{len(module["articles"])} articles</span>
                    </div>
                </div>
            </div>
        </div>

        <section class="lessons-section">
            <div class="lessons-grid">
                {articles_html}
            </div>
        </section>
    </main>

    <footer class="footer">
        <div class="footer-content">
            <p class="footer-text">© 2025 360° Artist Management. All rights reserved.</p>
        </div>
    </footer>

    <script src="../js/app.js"></script>
</body>
</html>'''

def main():
    data = load_content()
    
    # Create directories
    Path('modules').mkdir(exist_ok=True)
    Path('lessons').mkdir(exist_ok=True)
    
    # Generate modules and articles
    for module_id, module in data['modules'].items():
        # Create module directory for lessons
        module_dir = Path('lessons') / module_id
        module_dir.mkdir(exist_ok=True)
        
        # Generate module page
        with open(f'modules/{module_id}.html', 'w') as f:
            f.write(generate_module_html(module_id, module))
        print(f'✓ Generated modules/{module_id}.html')
        
        # Generate articles
        for i, article in enumerate(module['articles']):
            article_path = module_dir / f'{article["slug"]}.html'
            with open(article_path, 'w') as f:
                f.write(generate_article_html(module_id, module, article, module['articles'], i))
        print(f'  ✓ Generated {len(module["articles"])} articles for {module_id}')
    
    print('\n✅ All pages generated successfully!')

if __name__ == '__main__':
    main()
