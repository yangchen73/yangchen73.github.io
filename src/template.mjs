const escape = (value = '') => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const icons = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  scholar: '<path d="m2 9 10-5 10 5-10 5zM6 11v6c4 3 8 3 12 0v-6M22 9v7"/>',
  github: '<path d="M9 19c-4 1-4-2-6-2m12 5v-4c0-1 .1-2-.5-2.5C19 15 20 12 20 10a6 6 0 0 0-1.5-4 5 5 0 0 0-.1-4S17 2 14 4a14 14 0 0 0-4 0C7 2 5.6 2 5.6 2a5 5 0 0 0-.1 4A6 6 0 0 0 4 10c0 2 1 5 5.5 5.5C9 16 9 17 9 18v4"/>',
  file: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5"/>',
  arrow: '<path d="M5 19 19 5M5 5h14v14"/>',
  up: '<path d="m6 12 6-6 6 6M12 6v14"/>',
  lab: '<path d="M9 3h6M10 3v6l-6 10a1 1 0 0 0 1 2h14a1 1 0 0 0 1-2L14 9V3M7 15h10"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.arrow}</svg>`;
// Only explicit web/email URLs and local relative paths are rendered as links.
function safeUrl(value = '') {
  const url = String(value).trim();
  if (!url || /[\\\u0000-\u001f]/.test(url) || url.startsWith('//')) return '';
  if (/^[a-z][a-z0-9+.-]*:/i.test(url) && !/^(https?:|mailto:)/i.test(url)) return '';
  return escape(url.replace(/ /g, '%20'));
}
function link(label, url, inner = escape(label), className = '') {
  const href = safeUrl(url);
  return href ? `<a class="${className}" href="${href}"${/^https?:/i.test(href) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${inner}</a>` : `<span class="${className} unavailable">${inner}</span>`;
}
function media(project) {
  const m = project.media || {};
  const src = safeUrl(m.src);
  const width = Number.isInteger(m.width) && m.width > 0 ? m.width : 640;
  const height = Number.isInteger(m.height) && m.height > 0 ? m.height : 400;
  const visual = src ? m.type === 'video'
    ? `<video controls playsinline preload="metadata"${m.poster ? ` poster="${safeUrl(m.poster)}"` : ''} width="${width}" height="${height}" aria-label="${escape(m.alt || project.title)}"><source src="${src}">Your browser does not support this video.</video>`
    : `<img src="${src}" alt="${escape(m.alt || project.title)}" width="${width}" height="${height}" loading="lazy" decoding="async">`
    : `<div class="media-empty">Your research visual</div>`;
  const fit = src && m.type !== 'video' ? m.fit === 'cover' ? ' project-media-cover' : m.fit === 'natural' ? ' project-media-natural' : '' : '';
  const ratio = src && m.type === 'video' ? ` style="aspect-ratio: ${width} / ${height}"` : '';
  return `<figure class="project-media${fit}"${ratio}>${visual}</figure>`;
}
function projectCard(project, index) {
  return `<article class="project" id="${escape(project.id || `project-${index + 1}`)}">
    ${media(project)}
    <div class="project-copy">
      <h3>${escape(project.title)}</h3>
      ${project.authors ? `<p class="authors">${escape(project.authors)}</p>` : ''}
      ${project.venue || project.year ? `<p class="project-meta">${project.venue ? `<span class="project-venue">${escape(project.venue)}</span>` : ''}${project.year ? `<span class="project-year">${escape(project.year)}</span>` : ''}</p>` : ''}
      ${project.summary ? `<p class="project-summary">${escape(project.summary)}</p>` : ''}
      ${project.links?.length ? `<div class="project-links">${project.links.map(item => link(item.label, item.url, `${escape(item.label)}${icon('arrow')}`, 'resource-link')).join('')}</div>` : ''}
      ${project.contribution || project.details ? `<details class="project-details"><summary>Details${icon('plus')}</summary><div class="project-details-body">${project.contribution ? `<p class="contribution"><strong>My contribution.</strong> ${escape(project.contribution)}</p>` : ''}${project.details ? `<p>${escape(project.details)}</p>` : ''}</div></details>` : ''}
    </div>
  </article>`;
}
function timeline(items, id, title, symbol) {
  return `<section class="timeline-section section" id="${id}" aria-labelledby="${id}-title">
    <div class="section-heading"><h2 id="${id}-title">${title}</h2></div>
    <ol class="timeline">${items.map(item => `<li class="timeline-item">
      <div class="timeline-date">${escape(item.period)}</div>
      <span class="timeline-node" aria-hidden="true"></span>
      <div class="timeline-entry">
        <div class="institution-mark${item.logoTight ? ' institution-mark-tight' : ''}${item.logoCrest ? ' institution-mark-crest' : ''}${item.logoSeal ? ' institution-mark-seal' : ''}" aria-hidden="true">${safeUrl(item.logo) ? `<img src="${safeUrl(item.logo)}" alt="" width="44" height="44" loading="lazy">` : icon(symbol)}</div>
        <div class="timeline-copy"><h3>${item.url ? link(item.institution, item.url) : escape(item.institution)}</h3>
          ${item.role ? `<p class="timeline-role">${escape(item.role)}</p>` : ''}
          ${item.supervisors?.length ? `<p class="timeline-advisor">Supervisor${item.supervisors.length > 1 ? 's' : ''}: ${item.supervisors.map(person => link(person.name, person.url)).join(' and ')}</p>` : item.advisor ? `<p class="timeline-advisor">${escape(item.advisor)}</p>` : ''}
          ${item.mentor?.name ? `<p class="timeline-detail">Mentor: ${link(item.mentor.name, item.mentor.url)}</p>` : item.detail ? `<p class="timeline-detail">${escape(item.detail)}</p>` : ''}
          ${item.honors?.length ? `<ul class="education-honors" aria-label="Honors and awards">${item.honors.map(award => `<li>${escape(award.name)}${award.years ? `<span class="award-years"> · ${escape(award.years)}</span>` : ''}</li>`).join('')}</ul>` : ''}
        </div>
      </div>
    </li>`).join('')}</ol>
  </section>`;
}
export function render(data) {
  const hasResearch = data.research?.length > 0;
  const hasNews = data.news?.length > 0;
  const hasExperience = data.experience?.length > 0;
  const hasEducation = data.education?.length > 0;
  const hasTeaching = data.teaching?.some(group => group.courses?.length > 0);
  const shareTitle = `${data.name} — ${data.field}`;
  const tabTitle = data.tabTitle || shareTitle;
  const canonical = /^https?:\/\//i.test(data.url || '') ? safeUrl(data.url) : '';
  return `<!doctype html>
<html lang="${escape(data.lang || 'en')}" data-appearance="${data.appearance === 'white' ? 'white' : 'soft'}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f7f8fa">
  <meta name="description" content="${escape(data.description)}">
  ${data.draft ? '<meta name="robots" content="noindex, nofollow">' : ''}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${escape(shareTitle)}">
  <meta property="og:description" content="${escape(data.description)}">
  ${canonical ? `<link rel="canonical" href="${canonical}"><meta property="og:url" content="${canonical}">` : ''}
  <title>${escape(tabTitle)}</title>
  <link rel="icon" type="image/svg+xml" href="favicon.svg?v=paimon">
  <link rel="stylesheet" href="styles.css">
  <script src="main.js" defer></script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <div class="site-shell" id="top">
    <header class="site-header">
      <a class="wordmark" href="#about">${escape(data.name)}</a>
      <nav aria-label="Main navigation">
        <a href="#about" aria-current="location">About</a>
        ${hasNews ? '<a href="#news">News</a>' : ''}
        ${hasResearch ? '<a href="#research">Research</a>' : ''}
        ${hasExperience || hasEducation || hasTeaching ? '<a href="#background">Background</a>' : ''}
      </nav>
    </header>
    <main class="page" id="main">
      <section class="profile" id="about" aria-labelledby="profile-title">
        <div class="profile-copy">
          <div class="identity">
            <h1 id="profile-title">${escape(data.name)}${data.nativeName ? `<span class="native-name" title="${escape(data.nativeName)} · Chinese name in Yan Zhenqing-style calligraphy"><span class="visually-hidden">${escape(data.nativeName)}</span><img src="images/yan-zhenqing-yang-chen.svg" alt="" aria-hidden="true" width="104" height="52"></span>` : ''}</h1>
          </div>
          <div class="biography">${(data.bio || []).map(p => `<p>${escape(p)}</p>`).join('')}</div>
          ${data.interests?.length ? `<ul class="interests" aria-label="Research interests">${data.interests.map(i => `<li>${escape(i)}</li>`).join('')}</ul>` : ''}
          <div class="social-links" aria-label="Contact and academic profiles">${(data.links || []).filter(item => safeUrl(item.url)).map(item => link(item.label, item.url, `${icon(item.icon)}<span>${escape(item.label)}</span>`, 'social-link')).join('')}</div>
        </div>
        <figure class="portrait${data.portrait?.src ? '' : ' portrait-placeholder'}">
          ${data.portrait?.src ? `<img src="${safeUrl(data.portrait.src)}" alt="${escape(data.portrait.alt || data.name)}" width="400" height="500" fetchpriority="high" style="object-position:${escape(/^[\w\s.%+-]+$/.test(data.portrait.position || '') ? data.portrait.position : 'center')}">` : '<svg viewBox="0 0 200 250" fill="none" aria-hidden="true"><path d="M20 49V20h29M151 20h29v29M180 201v29h-29M49 230H20v-29" stroke="#c8d1dc"/><circle cx="100" cy="97" r="29" fill="#dce3eb"/><path d="M47 186c0-32 21-53 53-53s53 21 53 53" fill="#dce3eb"/><path d="M46 196h108" stroke="#c5d0de"/></svg><figcaption>Your portrait</figcaption>'}
        </figure>
      </section>
      ${hasNews ? `<section class="news section" id="news" aria-labelledby="news-title"><div class="section-heading"><h2 id="news-title">News</h2></div><ol class="news-list">${data.news.map(n => `<li><time${n.datetime ? ` datetime="${escape(n.datetime)}"` : ''}>${escape(n.date)}</time><p>${n.url ? link(n.text, n.url) : escape(n.text)}</p></li>`).join('')}</ol></section>` : ''}
      ${hasResearch ? `<section class="research section" id="research" aria-labelledby="research-title"><div class="section-heading"><h2 id="research-title">Research &amp; Projects</h2></div><div class="projects">${data.research.map((p, i) => projectCard(p, i)).join('')}</div></section>` : ''}
      ${hasExperience || hasEducation || hasTeaching ? `<div class="background" id="background">
        ${hasExperience ? timeline(data.experience, 'experience', 'Research Experience', 'lab') : ''}
        ${hasEducation ? timeline(data.education, 'education', 'Education', 'scholar') : ''}
        ${hasTeaching ? `<section class="teaching section" id="teaching" aria-labelledby="teaching-title">
          <div class="section-heading"><h2 id="teaching-title">Teaching</h2></div>
          ${data.teaching.filter(group => group.courses?.length).map(group => `<div class="teaching-group">
            <h3 class="teaching-role">${escape(group.role || 'Teaching Assistant')}${group.institution || data.draft ? `<span> · ${escape(group.institution || 'University / Institution')}</span>` : ''}</h3>
            <ul class="course-list">${group.courses.map(course => `<li>
              <span class="course-code">${course.url ? link(course.code, course.url) : escape(course.code)}</span>
              <span class="course-title${!course.title ? ' placeholder' : ''}">${escape(course.title || (data.draft ? 'Course title' : ''))}</span>
              <span class="course-term${!course.term ? ' placeholder' : ''}">${escape(course.term || (data.draft ? 'Semester' : ''))}</span>
            </li>`).join('')}</ul>
          </div>`).join('')}
        </section>` : ''}
      </div>` : ''}
    </main>
    <footer class="site-footer"><p>${escape(data.name)}</p>${data.updated ? `<span>Updated ${escape(data.updated)}</span>` : ''}</footer>
  </div>
  <a href="#top" class="back-top" aria-label="Back to top">${icon('up')}</a>
</body>
</html>`;
}
