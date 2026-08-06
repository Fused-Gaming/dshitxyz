# dshit.xyz Design System v2

## Premium Web3 Postal Service Brand

**Philosophy:** 70% Premium SaaS + 20% Cyberpunk + 10% Satirical Internet

The product is the joke. The design is pristine.

---

## Color Palette

### Background
- **Background Primary:** `#09090B` - Main background
- **Background Secondary:** `#111113` - Secondary surfaces
- **Surface:** `#18181B` - Card surfaces
- **Surface Elevated:** `#27272A` - Elevated surfaces

### Text & Semantic
- **Text Primary:** `#FAFAFA` - Primary text
- **Text Secondary:** `#A1A1A6` - Secondary text
- **Text Tertiary:** `#71717A` - Tertiary text

### Interactive
- **Purple Primary:** `#7C3AED` - Primary actions
- **Purple Hover:** `#A855F7` - Hover state
- **Purple Light:** `#C084FC` - Highlights
- **Purple Glow:** `#A855F7` - Glow effects (same as hover)

### Semantic
- **Success:** `#10B981` - Success states
- **Warning:** `#F59E0B` - Warning states
- **Error:** `#EF4444` - Error states
- **Info:** `#3B82F6` - Info states

### Special
- **Gold:** `#FBBF24` - Legendary NFTs only
- **Border:** `#27272A` - Default border color
- **Divider:** `#1F1F23` - Divider lines

---

## Typography

### Font Stack
- **Headings:** Space Grotesk (geometric, modern, confident)
- **Body:** Inter (readable, neutral, professional)
- **Numbers:** JetBrains Mono (technical, precise)

### Font Scale
- **H1:** 48px / 56px (line-height) - Hero headlines
- **H2:** 36px / 44px - Section headers
- **H3:** 24px / 32px - Subsection headers
- **H4:** 20px / 28px - Card titles
- **Body Large:** 16px / 24px - Primary text
- **Body Regular:** 14px / 20px - Default body text
- **Body Small:** 12px / 16px - Secondary text
- **Caption:** 12px / 16px - Labels, metadata
- **Label:** 11px / 16px - Small labels

### Font Weights
- **Display:** 700 (Space Grotesk)
- **Heading:** 600 (Space Grotesk)
- **Subheading:** 500 (Inter)
- **Body:** 400 (Inter)
- **Label:** 500 (Inter)

---

## Spacing System

**8-point baseline grid**

- **xs:** 4px
- **sm:** 8px
- **md:** 12px
- **lg:** 16px
- **xl:** 24px
- **2xl:** 32px
- **3xl:** 48px
- **4xl:** 64px
- **5xl:** 96px

---

## Components

### Buttons

**Primary Button**
- Background: `#7C3AED`
- Hover: `#A855F7`
- Text: `#FAFAFA`
- Padding: 12px 24px
- Border radius: 8px
- Font: 14px / 500 (Inter)

**Secondary Button**
- Background: `#27272A`
- Border: 1px solid `#3F3F46`
- Text: `#FAFAFA`
- Hover: Border `#A855F7`, Text `#A855F7`
- Padding: 12px 24px
- Border radius: 8px

**Ghost Button**
- Background: transparent
- Border: 1px solid `#27272A`
- Text: `#A1A1A6`
- Hover: Text `#FAFAFA`, Border `#3F3F46`

### Cards
- Background: `#18181B`
- Border: 1px solid `#27272A`
- Border radius: 12px
- Padding: 24px
- Box shadow: 0 4px 12px rgba(0, 0, 0, 0.3)

### Inputs
- Background: `#111113`
- Border: 1px solid `#27272A`
- Focus Border: 1px solid `#7C3AED`
- Padding: 12px 16px
- Border radius: 8px
- Font: 14px (Inter)
- Placeholder: `#71717A`

### Progress Stepper
- Active step: `#7C3AED`
- Completed: `#10B981`
- Inactive: `#27272A`
- Connect line: `#27272A`

### Badges
- Background: `#27272A`
- Text: `#FAFAFA`
- Padding: 4px 12px
- Border radius: 4px
- Font: 11px / 500

---

## Animations

**Motion Duration**
- Quick: 150ms
- Standard: 250ms
- Slow: 350ms

**Easing**
- Primary: cubic-bezier(0.4, 0, 0.2, 1) (ease-in-out)
- Entry: cubic-bezier(0, 0, 0.2, 1) (ease-out)
- Exit: cubic-bezier(0.4, 0, 1, 1) (ease-in)

**Specific Animations**

1. **Envelope Assembly** (250ms)
   - Pixels fade in from transparent
   - Slight scale effect: 0.95 → 1
   - Easing: ease-out

2. **Glitch Effect** (100ms)
   - Very subtle, minimal duration
   - Small translate: ±1px
   - Only on special interactions

3. **Bloom Effect** (300ms)
   - Purple glow expands
   - Box-shadow: 0 0 0px → 0 0 20px
   - Color: rgba(168, 85, 247, 0)

4. **Receipt Print** (400ms)
   - Slide down and fade in
   - Transform: translateY(-20px) → 0
   - Opacity: 0 → 1

5. **Delivery Confirmation** (350ms)
   - Checkmark animates in
   - Scale: 0 → 1
   - Easing: cubic-bezier(0.34, 1.56, 0.64, 1) (bounce)

6. **Wallet Connected** (250ms)
   - Icon rotates 360°
   - Followed by green glow

---

## Elevation (Shadows)

- **Level 1:** `0 1px 2px rgba(0, 0, 0, 0.05)`
- **Level 2:** `0 4px 6px rgba(0, 0, 0, 0.1)`
- **Level 3:** `0 10px 15px rgba(0, 0, 0, 0.1)`
- **Level 4:** `0 20px 25px rgba(0, 0, 0, 0.15)`
- **Glow:** `0 0 20px rgba(168, 85, 247, 0.5)`

---

## Iconography

**Grid:** 24x24px base
**Stroke Width:** 1.5px
**Rounded Corners:** 2px (subtle, modern)

**Icon Set (Pixel Perfect)**
- Envelope (postal theme)
- Wallet
- Mailbox
- Receipt
- Postage Stamp
- Transaction/Arrow
- Marketplace/Store
- DAO/Governance
- Settings
- Notifications
- Copy/Clipboard
- Success/Checkmark
- Error/X
- Loading/Spinner

---

## Responsive Design

**Breakpoints**
- **Mobile:** 0px - 639px
- **Tablet:** 640px - 1023px
- **Desktop:** 1024px+

**Mobile First Approach**
- Bottom navigation (Home, Mailbox, Send, Market, Profile)
- Full-width cards
- Single column layouts
- Large tap targets (min 48px)
- Safe area consideration

**Desktop Approach**
- Persistent top navigation
- Sidebar optional
- Multi-column grids
- Larger whitespace
- Hover interactions

---

## Accessibility

- **Contrast:** WCAG AA minimum
- **Focus Indicators:** Visible on all interactive elements
- **Keyboard Navigation:** Full support
- **Screen Readers:** Semantic HTML + ARIA labels
- **Reduced Motion:** Respects `prefers-reduced-motion`
- **Color Not Sole Means:** Information conveyed through multiple channels

---

## Information Architecture

### Landing Page Sections
1. **Hero** - Envelope, headline, CTA
2. **Social Proof** - Trust row (Monad, fixed postage, immutable, anonymous)
3. **How It Works** - 8-step stepper
4. **Featured Collections** - NFT showcase
5. **Live Deliveries** - Real-time activity
6. **Marketplace Preview** - Quick browse
7. **FAQ** - Common questions
8. **Newsletter** - Email signup
9. **Footer** - Links, social

### App Navigation
- **Home** - Dashboard, live activity
- **Mailbox** - Inbox, sent, receipts
- **Send Mail** - Step-by-step mint/send flow
- **Marketplace** - Browse collections
- **Profile** - Settings, wallet, history

---

## Design Principles

1. **Minimal First** - Only add what serves the user
2. **Pixel Perfect** - Precision in every detail
3. **Whitespace is Content** - Use breathing room
4. **Progressive Disclosure** - Hide complexity until needed
5. **Direct Interaction** - Clear cause-effect
6. **Subtle Feedback** - Small, non-distracting animations
7. **Crypto Native** - Assumes wallet familiarity
8. **Humor as Easter Egg** - Reveals itself over time

---

## References

- **Inspiration:** Apple, Linear, Coinbase Wallet, Arc, Stripe, Raycast
- **Anti-Pattern:** Meme generators, flash websites, cheap NFT pages
- **Tone:** Confident, official, premium, slightly retro-internet

---

*The joke is the product. The design is the experience.*
