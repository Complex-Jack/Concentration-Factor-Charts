# Stress Concentration Atlas

A dependency-free teaching widget for the 17 geometry and loading cases in
Shigley Table A-15.

The widget:

- searches and filters all 17 cases;
- orders dimensional inputs according to the chart ratios;
- interpolates characterized source-chart curves;
- reports `Kt` or `Kts`;
- displays source-axis bounds, major grids, and minor subdivisions;
- shows representative geometry, dimensions, and directional loading;
- warns when a geometry falls outside the characterized chart domain.

## Files To Upload To GitHub

Upload the complete contents of this folder, including the hidden `.github`
folder and `.nojekyll` file.

Required site files:

- `index.html`
- `app.js`
- `styles.css`
- `readability.css`
- `.nojekyll`
- `.github/workflows/deploy-pages.yml`

Documentation and Canvas helper files:

- `CANVAS_IFRAME.html`
- `CURVE_AUDIT.md`
- `GEOMETRY_AUDIT.md`
- `INPUT_ORDER_AUDIT.md`
- `PLOT_AXIS_AUDIT.md`
- `README.md`

## Deploy With GitHub Pages

1. Create a new public GitHub repository named:

   ```text
   stress-concentration-atlas
   ```

2. Upload every file and folder from this package to the repository root.
3. Commit the files to the `main` branch.
4. Open the repository's **Settings > Pages**.
5. Under **Build and deployment**, select **GitHub Actions** as the source.
6. Wait for the `Deploy static site to GitHub Pages` workflow to finish.

The published URL will be:

```text
https://YOUR-GITHUB-USERNAME.github.io/stress-concentration-atlas/
```

If GitHub Actions is unavailable, choose **Deploy from a branch**, select
`main`, and use `/ (root)`.

## Embed In Canvas

First confirm the published GitHub Pages URL opens normally. Then edit a Canvas
Page, switch to the HTML editor, and insert:

```html
<iframe
  src="https://YOUR-GITHUB-USERNAME.github.io/stress-concentration-atlas/"
  title="Stress Concentration Atlas"
  width="100%"
  height="2200"
  style="border: 0; width: 100%; min-height: 2200px;"
  loading="lazy"
  allowfullscreen>
</iframe>
```

Replace `YOUR-GITHUB-USERNAME` with the GitHub account or organization that owns
the repository. The same snippet is provided in `CANVAS_IFRAME.html`.

If Canvas removes iframe markup or blocks `github.io`, add the GitHub Pages URL
as an External URL module item and enable **Load in a new tab**, or ask the
Canvas administrator to allow the domain.

## Local Preview

```bash
python3 -m http.server 8765
```

Then open:

```text
http://127.0.0.1:8765/
```

## Engineering Note

The curves are characterized from the supplied Table A-15 charts. Values should
be treated with the same precision as reading the printed graph. For critical
design, verify against Peterson's *Stress Concentration Factors* or a validated
finite-element model.
