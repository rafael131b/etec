# Navigation Test Plan

## Test Cases

### 1. Page Navigation
- [ ] Navigate from index.html to produtos.html using the main navigation menu
- [ ] Navigate from produtos.html to index.html using the main navigation menu
- [ ] Navigate from index.html to produtos.html using the footer links
- [ ] Navigate from produtos.html to index.html using the footer links

### 2. Active State Management
- [ ] When on index.html, the "HOME" link should have the "active" class
- [ ] When on produtos.html, the "PRODUTOS" link should have the "active" class
- [ ] When on index.html and clicking anchor links (#servicos, #contatos), the corresponding nav link should become active
- [ ] When scrolling on index.html, the active nav link should update based on the current section

### 3. Footer Links
- [ ] All footer links should point to the correct pages
- [ ] Footer links should be consistent with main navigation links
- [ ] Footer links should work correctly for navigation

### 4. Mobile Menu
- [ ] Mobile menu should open and close correctly
- [ ] Navigation links in mobile menu should work
- [ ] Active states should be correctly managed in mobile menu

## Expected Results

### Page Navigation
- Clicking "PRODUTOS" in the main navigation should take the user from index.html to produtos.html
- Clicking "HOME" in the main navigation should take the user from produtos.html to index.html
- All navigation should be smooth and without errors

### Active State Management
- The active class should be automatically applied to the correct navigation link based on the current page
- When navigating between pages, the active state should update correctly
- Anchor links on the home page should update the active state when clicked

### Footer Links
- Footer links should navigate to the correct pages
- Footer links should have the same paths as the main navigation links

### Mobile Menu
- Mobile menu should function correctly on smaller screens
- All navigation functionality should work in the mobile menu

## Testing Instructions

1. Open index.html in a browser
2. Check that the "HOME" link has the "active" class
3. Click on the "PRODUTOS" link in the main navigation
4. Verify that you are taken to produtos.html
5. Check that the "PRODUTOS" link now has the "active" class
6. Click on the "HOME" link in the main navigation
7. Verify that you are taken back to index.html
8. Check that the "HOME" link now has the "active" class
9. Test all footer links for correct navigation
10. Test mobile menu functionality if on a mobile device or using browser developer tools