# Personal Site

This repository still publishes as a plain static site on GitHub Pages, but the HTML pages are now generated from shared templates and a single content file so you do not have to repeat the same edits across multiple pages.

## Edit flow

Update these files first:

- `content/site.json` for site copy, links, resume entries, and blog post content
- `templates/` for shared page structure
- `styles.css` and `script.js` for styling and interactions

Do not edit the generated `index.html`, `blog.html`, `resume.html`, `404.html`, or files in `posts/` by hand. Rebuild them instead.

On the home page, `home.hero_lead` can be either a single string or an array of strings if you want multiple intro paragraphs.

## Build the site

Run:

```bash
python3 tools/build_site.py
```

That command regenerates:

- `index.html`
- `blog.html`
- `resume.html`
- `404.html`
- `posts/*.html`

## Local preview

1. Rebuild the site:

```bash
python3 tools/build_site.py
```

2. Start a local server:

```bash
python3 -m http.server 8000
```

3. Open `http://localhost:8000`

When you change `content/site.json` or files in `templates/`, rerun `python3 tools/build_site.py` and refresh the browser.

## Publish with GitHub Pages

1. Commit the generated HTML files along with your template/content changes.
2. Push the repository to GitHub.
3. In repository settings, open `Pages`.
4. Under `Build and deployment`, set `Source` to `Deploy from a branch`.
5. Select your default branch and `/ (root)`.
6. Save and wait for GitHub to publish the site.

If this is a user or organization site, name the repository `<your-github-username>.github.io`.
