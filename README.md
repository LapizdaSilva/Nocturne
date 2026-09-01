# Nocturne Atelier

Nocturne Atelier is a dark, editorial e-commerce storefront concept for tattoo and art-supply instruments.

The project was created as a front-end commerce demonstration, with a focus on responsive design, product presentation, customer interactions, accessibility, and quality assurance. The storefront is intentionally lightweight and dependency-free, making it easy to review and run locally.

> **Portfolio note:** This is a front-end e-commerce prototype. It models storefront and cart interactions without processing real payments or connecting to a production commerce backend.

## Project Objective

The goal was to create a premium e-commerce experience for professional tattoo artists and creative practitioners, combining an art-directed visual identity with practical shopping interactions.

The project was developed with an emphasis on:

* Clear product presentation
* Responsive desktop and mobile experiences
* Intuitive e-commerce interactions
* Accessible navigation and controls
* Consistent product merchandising
* Quality assurance and documentation
* International, English-language customer-facing content

## Target Audience

The storefront is designed for:

* Professional tattoo artists
* Tattoo apprentices building their equipment
* Creative practitioners
* Independent tattoo studios and ateliers
* Design-conscious customers looking for premium tools

## Features

| Area              | Included Experience                                                                                                                      |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Storefront        | Editorial hero, collections, product grid, manifesto, and footer navigation                                                              |
| Product Detail    | Product imagery, pricing, description, specifications, quantity selector, add-to-cart action, shipping information, and related products |
| Cart              | Slide-in cart drawer, product thumbnails, subtotal, quantity controls, item removal, empty state, and demo checkout CTA                  |
| Navigation        | Desktop navigation, mobile menu drawer, section anchors, visible focus states, and Escape-to-close behavior                              |
| Merchandising     | Product cards, quick-add controls, related products, hover states, and responsive content hierarchy                                      |
| Communication     | Client-side newsletter validation with live success feedback                                                                             |
| Accessibility     | Semantic landmarks, labelled controls, descriptive image alt text, live cart status, focus-visible states, and keyboard-friendly drawers |
| Responsive Design | Desktop and mobile layouts with dedicated interaction patterns for smaller screens                                                       |

## Tech Stack

| Technology                      | Role                                                                                                 |
| ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| HTML5                           | Semantic storefront structure and accessible form controls                                           |
| CSS3                            | Layout, responsive design, design tokens, typography, animations, and visual styling                 |
| Vanilla JavaScript              | Product data, rendering, cart state, quantity logic, drawers, notifications, and newsletter behavior |
| Google Fonts                    | Cormorant Garamond and DM Sans                                                                       |
| Local Assets                    | Product photography, collection imagery, hero imagery, and branding                                  |
| GitHub Pages-friendly structure | Static files with no build step or package installation                                              |

## Responsive Behavior

The storefront is designed to work across desktop and mobile viewport sizes.

At smaller breakpoints:

* Desktop navigation becomes a mobile slide-in menu
* Multi-column sections adapt to a vertical layout
* Product information becomes easier to scan on smaller screens
* Purchase controls expand to available width
* Related products transition to a single-column layout
* Touch-friendly controls remain available for interactive elements
* Non-essential animations are reduced when `prefers-reduced-motion` is enabled

The project uses fluid sizing and responsive image behavior to maintain the visual hierarchy without distorting product photography.

## E-commerce Workflow

The storefront models a simplified customer journey:

```text
Homepage
   ↓
Collection / Product Discovery
   ↓
Product Detail
   ↓
Quantity Selection
   ↓
Add to Cart
   ↓
Cart Review
   ↓
Demo Checkout
```

Product information is represented through a centralized JavaScript data structure so that product cards, product details, and cart items remain consistent.

The cart supports:

* Adding products
* Increasing and decreasing quantities
* Removing products
* Calculating subtotals
* Empty-cart recovery
* Visual cart count updates

The checkout intentionally stops at a local demo state rather than attempting to process real payments.

## Shopify Relevance

Nocturne is currently implemented as a static front-end prototype rather than a Shopify theme.

However, the project was structured around common e-commerce concepts that can be translated into a commerce platform such as Shopify:

* Products
* Collections
* Product merchandising
* Product detail pages
* Cart interactions
* Responsive storefront layouts
* Navigation
* Customer-facing content
* Checkout flow

A production implementation could migrate the product catalog, theme structure, inventory, cart persistence, analytics, and checkout to Shopify.

This project therefore represents my existing web development foundation while demonstrating my interest in developing further experience with Shopify and web commerce platforms.

## Project Management Approach

Although Nocturne is a personal project, it was developed using a simplified project workflow rather than treating the website as a single coding task.

The work was organized around:

1. Defining the storefront objective and target audience
2. Establishing the visual direction
3. Building the core storefront
4. Adding e-commerce interactions
5. Developing the product detail experience
6. Adapting the experience for mobile
7. Translating customer-facing content to English
8. Performing a QA pass
9. Documenting limitations and future improvements

The repository history also reflects incremental feature development and revisions rather than a single final submission.

## QA Checklist

The following checklist records the verification pass performed for the current portfolio build.

| Check                 | Status | Verification                                                         |
| --------------------- | ------ | -------------------------------------------------------------------- |
| Desktop layout        | [x]    | Main storefront sections reviewed in desktop browser view            |
| Mobile layout         | [x]    | Responsive behavior reviewed against the mobile breakpoint           |
| Navigation            | [x]    | Header, section anchors, footer links, and mobile menu checked       |
| Product rendering     | [x]    | Product cards and related products checked                           |
| Product detail        | [x]    | Image, price, description, specifications, quantity, and CTA checked |
| Add to cart           | [x]    | Product addition and cart badge update checked                       |
| Quantity controls     | [x]    | Increase/decrease behavior and subtotal calculations checked         |
| Remove product        | [x]    | Removing items returns the cart to the appropriate state             |
| Empty cart            | [x]    | Empty state and recovery action checked                              |
| Newsletter validation | [x]    | Required email validation and success feedback checked               |
| Escape key behavior   | [x]    | Cart and mobile menu drawers close with Escape                       |
| Accessibility labels  | [x]    | Interactive controls and image descriptions reviewed                 |
| JavaScript syntax     | [x]    | `node --check js/app.js` completed successfully                      |
| HTML parsing          | [x]    | Updated HTML passed a parser smoke check                             |

## Future Roadmap

### Phase 1 — Completed

* [x] Responsive storefront
* [x] Product catalog
* [x] Collection presentation
* [x] Product detail page
* [x] Cart functionality
* [x] Mobile navigation
* [x] English localization
* [x] Accessibility improvements
* [x] QA checklist

### Phase 2 — Planned

* [ ] Product search
* [ ] Product filtering
* [ ] Individual product routes
* [ ] Persistent cart state
* [ ] Improved form handling
* [ ] Analytics event tracking
* [ ] Expanded product catalog

### Phase 3 — Production Commerce

* [ ] Shopify integration
* [ ] Real product and inventory data
* [ ] Customer accounts
* [ ] Persistent orders
* [ ] Shipping and tax calculation
* [ ] Payment provider
* [ ] Production checkout
* [ ] E-commerce analytics

## Known Limitations

Nocturne is a portfolio prototype rather than a production commerce deployment.

It currently does not include:

* User authentication
* Persistent cart storage
* Real inventory management
* CMS integration
* Order persistence
* Shipping calculation
* Tax calculation
* Payment processing
* Production checkout
* External newsletter service

I deliberately kept this dependency-free because this project is demonstrating storefront architecture rather than framework usage.

The newsletter form currently performs client-side validation and displays a local success message without sending data to an external mailing platform.

Product cards currently lead to the featured product experience. A production implementation would provide individual product routes and connect the storefront to a commerce backend.

## What I Learned

This project reinforced how closely visual design and functional e-commerce experiences are connected.

A premium storefront needs more than an attractive visual identity. Product specifications, purchase controls, shipping information, related products, navigation, and responsive behavior all contribute to the customer's ability to understand and evaluate a product.

The project also provided practical experience with:

* Designing around an e-commerce customer journey
* Translating a customer-facing experience into English
* Responsive web interaction patterns
* Accessibility considerations
* QA planning and verification
* Documenting technical limitations
* Thinking about how a static prototype could evolve into a production commerce platform

## Run Locally

Clone the repository:

```bash
git clone https://github.com/LapizdaSilva/Nocturne.git
cd Nocturne
```

Start a local static server:

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173
```

No package installation or build step is required.

## License

This project is released under the MIT License. See [LICENSE](LICENSE).
