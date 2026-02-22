# UI Mockups and Screenshots

## Application Flow

This document describes the visual design and user flow of the Food Tracker application.

## 1. Login Screen

**Features:**
- App logo (restaurant icon)
- "Food Tracker" title
- Email input field with email icon
- Password input field with lock icon
- Login button (primary color)
- Toggle to switch between Login/Registration

**Registration Mode:**
- Additional "Name" field appears
- Button text changes to "Register"
- Toggle text: "Already have an account? Login"

**Visual Design:**
- Gradient background (green primary color)
- White card with rounded corners
- Material Design 3 styling
- Form validation with error messages

**User Flow:**
- User enters credentials
- Taps Login/Register button
- Loading spinner appears during authentication
- Success: Navigate to Home Screen
- Failure: Show error snackbar

---

## 2. Home Screen

**Layout:**
```
┌─────────────────────────────────┐
│ Food Tracker          [Logout]  │ ← App Bar
├─────────────────────────────────┤
│ 📅 Date Selector Card            │
│   "Wednesday, February 3, 2026" │
│                              ▼  │
├─────────────────────────────────┤
│ Daily Summary Card              │
│   Calories: ████░░░░░░  1234/2000│
│   Protein:  ████░░░░░░   62/100g│
│   Carbs:    ███░░░░░░░  150/250g│
│   Fat:      ██░░░░░░░░   35/70g │
├─────────────────────────────────┤
│ Today's Meals        (3 items)  │
├─────────────────────────────────┤
│ 🥐 Breakfast                     │
│ Oatmeal - Rolled Oats           │
│ 1.0 serving(s)                  │
│ Cal:389  Pro:16.9g Carb:66g F:6.9│
│                        [Delete]  │
├─────────────────────────────────┤
│ 🍱 Lunch                         │
│ Chicken Breast - Generic        │
│ 1.5 servings                    │
│ Cal:248  Pro:46.5g Carb:0g F:5.4g│
│                        [Delete]  │
├─────────────────────────────────┤
│ 🍽️ Dinner                        │
│ Salmon - Atlantic               │
│ 1.0 serving(s)                  │
│ Cal:208  Pro:20g Carb:0g F:13g  │
│                        [Delete]  │
└─────────────────────────────────┘
                    [+] Add Food ← FAB
```

**Features:**
- Date selector with calendar icon
- Daily summary with progress bars
- Color-coded macros (orange, red, blue, purple)
- Meal type icons and colors
- Nutritional breakdown for each entry
- Delete button with confirmation
- Floating Action Button to add food

**Empty State:**
- Large restaurant icon
- "No meals logged yet"
- Instruction text: "Tap the + button to add your first meal"

---

## 3. Add Food Screen (Search)

**Layout:**
```
┌─────────────────────────────────┐
│ ← Add Food                      │ ← App Bar
├─────────────────────────────────┤
│ 🔍 Search foods...          [X] │ ← Search Bar
├─────────────────────────────────┤
│ Search Results:                 │
├─────────────────────────────────┤
│ 🍎 Apple                      > │
│ Fresh • 100g • 52 cal          │
├─────────────────────────────────┤
│ 🍌 Banana                     > │
│ Fresh • 100g • 89 cal          │
├─────────────────────────────────┤
│ 🍗 Chicken Breast             > │
│ Generic • 100g • 165 cal       │
├─────────────────────────────────┤
│ 🍚 Brown Rice                 > │
│ Generic • 100g • 111 cal       │
└─────────────────────────────────┘
```

**Empty Search State:**
- Large search icon
- "Search for foods to track"

**No Results State:**
- Sad face icon
- "No foods found"

---

## 4. Add Food Screen (Food Details)

**Layout:**
```
┌─────────────────────────────────┐
│ ← Add Food                      │ ← App Bar
├─────────────────────────────────┤
│ ← Back to search                │
├─────────────────────────────────┤
│ ┌─────────────────────────────┐ │
│ │ Chicken Breast              │ │
│ │ Generic • 100g              │ │
│ │ ─────────────────────────   │ │
│ │ Nutrition Facts             │ │
│ │                             │ │
│ │ Calories        165 kcal    │ │
│ │ Protein          31.0 g     │ │
│ │ Carbs             0.0 g     │ │
│ │ Fat               3.6 g     │ │
│ └─────────────────────────────┘ │
├─────────────────────────────────┤
│ Servings                        │
│ ┌──────────────────────────┐   │
│ │ 1.0            servings  │   │
│ └──────────────────────────┘   │
├─────────────────────────────────┤
│ Meal Type                       │
│ [Breakfast][Lunch][Dinner][Snack]│
│    (segmented buttons)          │
├─────────────────────────────────┤
│ ┌──────────────────────────┐   │
│ │     Add to Log           │   │
│ └──────────────────────────┘   │
└─────────────────────────────────┘
```

**Features:**
- Food name and details
- Complete nutritional breakdown
- Serving size input (decimal keyboard)
- Meal type segmented buttons
- Primary action button

---

## Color Scheme

**Primary Colors:**
- Green (primary): #4CAF50
- Green Light: #81C784
- Green Dark: #388E3C

**Macro Colors:**
- Calories: Orange (#FF9800)
- Protein: Red (#F44336)
- Carbs: Blue (#2196F3)
- Fat: Purple (#9C27B0)

**Meal Type Colors:**
- Breakfast: Orange (#FF9800)
- Lunch: Green (#4CAF50)
- Dinner: Blue (#2196F3)
- Snack: Purple (#9C27B0)

**Neutral Colors:**
- Background: White (#FFFFFF)
- Card: White with elevation
- Text Primary: Black (#000000)
- Text Secondary: Grey (#757575)
- Divider: Light Grey (#E0E0E0)

---

## Typography

**Material Design 3 Text Styles:**
- Headline Large: 32px, Bold (Screen titles)
- Headline Medium: 28px, Bold (Card titles)
- Title Large: 22px, Medium (Section headers)
- Body Large: 16px, Regular (Main content)
- Body Medium: 14px, Regular (Secondary text)
- Label Large: 14px, Medium (Buttons)

---

## Icons

**App Icons:**
- Logo: restaurant_menu
- Logout: logout
- Calendar: calendar_today
- Search: search
- Delete: delete_outline
- Add: add
- Navigation: chevron_right
- Back: arrow_back

**Meal Type Icons:**
- Breakfast: free_breakfast
- Lunch: lunch_dining
- Dinner: dinner_dining
- Snack: cookie
- Generic: restaurant

---

## Interactions

**Button States:**
- Normal: Full color
- Pressed: Darker shade
- Disabled: Grey with 38% opacity
- Loading: Spinner animation

**Animations:**
- Screen transitions: Slide animation
- Progress bars: Smooth fill animation
- List items: Fade in on load
- Delete confirmation: Dialog slide up

**Feedback:**
- Success: Green snackbar with checkmark
- Error: Red snackbar with error message
- Loading: Circular progress indicator
- Empty state: Grey icon with text

---

## Responsive Design

**Phone (Portrait):**
- Single column layout
- Full-width cards
- Stacked components
- Floating action button bottom right

**Tablet (Landscape):**
- Two-column layout possible
- Wider cards with max-width
- More horizontal space for content

**Accessibility:**
- Minimum touch target: 48x48dp
- Color contrast ratio: 4.5:1
- Screen reader support
- Keyboard navigation

---

## User Experience Features

1. **Pull to Refresh**: Swipe down on home screen to reload data
2. **Swipe to Delete**: Swipe food entry card to reveal delete
3. **Date Picker**: Material date picker with calendar view
4. **Search Debouncing**: Search triggers after typing pause
5. **Form Validation**: Real-time validation with error messages
6. **Confirmation Dialogs**: Destructive actions require confirmation
7. **Loading States**: Spinners during async operations
8. **Empty States**: Helpful messages when no data
9. **Error States**: Clear error messages with retry options

---

## Navigation Flow

```
Login Screen
    ↓ (Success)
Home Screen
    ↓ (Tap FAB)
Add Food Screen (Search)
    ↓ (Select Food)
Add Food Screen (Details)
    ↓ (Add to Log)
Home Screen (Updated)
    ↓ (Tap Logout)
Login Screen
```

---

## Notes for Implementation

- All screens use Material Design 3
- Consistent spacing (8dp, 16dp, 24dp)
- Elevation for depth (2dp, 4dp, 8dp)
- Rounded corners (8dp, 12dp, 16dp)
- Smooth animations (300ms duration)
- Haptic feedback on buttons
- Network error handling
- Offline capability with local storage

---

## Testing Checklist

- [ ] All screens render correctly
- [ ] Navigation works smoothly
- [ ] Forms validate properly
- [ ] Buttons provide feedback
- [ ] Loading states appear
- [ ] Error states handle gracefully
- [ ] Empty states are informative
- [ ] Colors match design system
- [ ] Typography is consistent
- [ ] Icons render properly
- [ ] Responsive on different sizes
- [ ] Accessibility standards met
- [ ] Animations are smooth
- [ ] Touch targets are adequate
- [ ] Dark mode support (future)
