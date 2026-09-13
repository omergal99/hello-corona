# Next Steps

Hello Corona already has a strong visual identity: a map-first dashboard, country detail views, a HUD frame, animated data states, and theme controls. The next opportunity is to turn that visual foundation into a trusted decision product.

## Product direction

### 1. Global intelligence workspace

Move from a single corona dashboard toward a reusable global events platform:

- Track public health, climate, population, migration, energy, food, and economic indicators.
- Let users switch between datasets without changing the map interaction model.
- Add a date slider so users can compare current conditions with historical periods.
- Save named views such as `Europe / active cases / last 30 days`.

The core product idea is simple: one geographic interface for answering "what is happening, where, and how fast is it changing?"

### 2. Country intelligence pages

Expand each country page into a concise profile:

- Key indicators and their change over time.
- A timeline of important events and policy changes.
- Regional comparisons and peer countries.
- Data source, update time, methodology, and confidence labels.
- Exportable briefing view for a selected date range.

The existing country title, metric list, SVG presentation, and loader are a good visual base for this profile.

### 3. Alerts and monitoring

Make the dashboard useful between visits:

- Users choose countries, regions, metrics, and thresholds.
- Send email, Slack, or webhook notifications when a threshold changes.
- Add an alert history so users can understand why they were notified.
- Offer a daily or weekly summary with only meaningful changes.

This is a natural paid feature because it saves teams from repeatedly checking dashboards.

## Revenue opportunities

### Free explorer

Keep the public map as the acquisition channel. It should demonstrate the quality of the view, show current data, and allow basic country exploration.

### Pro research workspace

Charge for:

- More datasets and longer historical ranges.
- Saved dashboards and private notes.
- CSV, JSON, and PDF exports.
- Custom comparison groups.
- Scheduled reports and alerts.

### Team and institutional plan

Sell to universities, NGOs, journalists, analysts, and operations teams with:

- Shared workspaces and role-based access.
- Audit history for saved views and reports.
- API access with usage limits and keys.
- White-label or embeddable map views.
- Support and data quality commitments.

### Data API

Expose normalized country and region data as an API. Customers could pay for higher limits, historical archives, webhooks, and guaranteed update frequency. Keep source attribution and licensing visible for every dataset.

## Performance roadmap

### Immediate wins

- Remove development logging from production paths.
- Lazy-load graphs and country detail routes so the initial dashboard becomes interactive sooner.
- Debounce country search for larger datasets.
- Avoid recalculating all map circles and paths when only a display setting changes.
- Add stable keys and verify that memoized components receive stable props.

### Map performance

- Keep the SVG map for the current dataset size, but measure render time with realistic country and circle counts.
- Render only the visible or selected data layers when possible.
- Move expensive derived data into selectors or precomputed service data.
- Consider Canvas or WebGL only after profiling proves SVG is the bottleneck; the current SVG approach is valuable for crisp styling and accessibility.
- Keep wheel, pointer, and touch updates batched and avoid updating unrelated UI state during drag.

### Network and data performance

- Add a data service layer with request caching and stale-while-revalidate behavior.
- Store the last successful dataset for offline startup and show its timestamp clearly.
- Compress large country and geometry payloads and load detailed geometry only on demand.
- Add API retry rules with backoff and a visible stale-data state.
- Version normalized datasets so the client can reject incompatible payloads safely.

### Product observability

Measure before optimizing:

- First contentful paint and time to interactive.
- Map interaction latency while zooming and dragging.
- API response time and error rate.
- Search response latency.
- Which countries, metrics, and views users actually open.

Use privacy-respecting analytics and do not collect sensitive personal data by default.

## Trust and data quality

For a product that sells information, trust is a feature:

- Display source, timestamp, geographic definition, and update frequency beside each metric.
- Distinguish `0`, `No Data`, and `Not Applicable`.
- Show methodology notes and known limitations.
- Preserve historical values rather than silently rewriting them.
- Add automated checks for missing countries, impossible negative values, duplicate records, and stale feeds.
- Provide a report-data-issue action with an internal triage queue.

## A practical sequence

1. Add a normalized data model and explicit source metadata.
2. Add date range selection and a small historical chart to country pages.
3. Add saved views in local storage, then move them to accounts when authentication exists.
4. Add exports and scheduled email reports as the first paid workflow.
5. Add alert rules and team sharing.
6. Introduce multiple datasets behind the same map and filter architecture.
7. Profile the real application before replacing SVG or adding a heavier rendering engine.

The strongest long-term positioning is not "another map." It is a calm, beautiful geographic intelligence tool that turns messy global data into a view people can understand, compare, monitor, and act on.