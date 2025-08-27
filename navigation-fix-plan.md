# Navigation Fix Plan

## Issues Identified

1. Inconsistent navigation structure between index.html and produtos.html
2. Active link states don't persist correctly when navigating between pages
3. Mixed use of relative paths (with and without "./")
4. Some navigation links point to anchor sections while others point to separate pages

## Planned Changes

### 1. index.html
- Standardize navigation structure
- Ensure HOME link has the active class when on the home page
- Make all paths consistent (use "./" for internal pages)
- Update navigation links to:
  ```html
  <li><a href="./index.html" class="nav-link active"><i class="fas fa-home"></i> HOME</a></li>
  <li><a href="./blog.html" class="nav-link"><i class="fas fa-blog"></i> BLOG</a></li>
  <li><a href="./servicos.html" class="nav-link"><i class="fas fa-cogs"></i> SERVIÇOS</a></li>
  <li><a href="./produtos.html" class="nav-link"><i class="fas fa-box"></i> PRODUTOS</a></li>
  <li><a href="./contatos.html" class="nav-link"><i class="fas fa-envelope"></i> CONTATOS</a></li>
  ```

### 2. produtos.html
- Standardize navigation structure
- Ensure PRODUTOS link has the active class when on the products page
- Make all paths consistent (use "./" for internal pages)
- Update navigation links to:
  ```html
  <li><a href="./index.html" class="nav-link"><i class="fas fa-home"></i> HOME</a></li>
  <li><a href="./blog.html" class="nav-link"><i class="fas fa-blog"></i> BLOG</a></li>
  <li><a href="./servicos.html" class="nav-link"><i class="fas fa-cogs"></i> SERVIÇOS</a></li>
  <li><a href="./produtos.html" class="nav-link active"><i class="fas fa-box"></i> PRODUTOS</a></li>
  <li><a href="./contatos.html" class="nav-link"><i class="fas fa-envelope"></i> CONTATOS</a></li>
  ```

### 3. script.js
- Add functionality to automatically set active states based on current page
- Add a function that runs on page load to check the current page and set the appropriate nav link as active
- Ensure consistent navigation behavior across all pages

### 4. Footer Links
- Update footer links to be consistent with navigation links
- Ensure all links point to the correct pages with consistent paths

## Implementation Steps

1. Update index.html navigation structure
2. Update produtos.html navigation structure
3. Enhance script.js to handle active states automatically
4. Update footer links for consistency
5. Test navigation between all pages