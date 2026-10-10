#!/usr/bin/env bash
# Run ONCE from the project root, after `git init`, to create 10 meaningful commits
# under YOUR git identity (git config user.name / user.email must already be set).
set -e
[ -d .git ] || git init -b main

c() { git add "${@:2}" && git commit -m "$1"; }

c "chore: set up Next.js, TypeScript, Tailwind and DaisyUI"            package.json tsconfig.json next.config.mjs postcss.config.js tailwind.config.ts .gitignore .env.example
c "feat: add bazar green DaisyUI theme and Bangla font"                src/app/globals.css src/app/layout.tsx public
c "feat: add data layer (API hooks with fallback URL, Bengali helpers)" src/lib/types.ts src/lib/api.ts src/lib/bn.ts
c "feat: add navbar with category links and bangla date"               src/components/Navbar.tsx
c "feat: add price ticker marquee and footer"                          src/components/Ticker.tsx src/components/Footer.tsx
c "feat: add hero and home page sections with product cards"           src/components/Hero.tsx src/components/ProductCard.tsx src/components/ProductGrid.tsx src/components/ChangeBadge.tsx src/components/Skeletons.tsx src/app/page.tsx
c "feat: add category page with numeric sort and empty state"          src/components/SortSelect.tsx src/components/NotFoundView.tsx src/app/category src/app/not-found.tsx
c "feat: add product details page with market-wise prices"             src/app/product
c "feat: add BetterAuth setup, sign in/sign up, social login, middleware" src/lib/auth.ts src/lib/auth-client.ts src/app/api src/middleware.ts src/components/SocialButtons.tsx src/app/signin src/app/signup
c "feat: add profile page and update-name flow"                        src/app/profile
c "docs: add README"                                                    README.md git-commits.sh
