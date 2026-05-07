export const FOODS = [
  // ── Vegetables ──
  { id: 'sweet-potato', name: 'Sweet Potato', emoji: '🍠', category: 'Vegetable', minAge: 4, allergen: false, texture: 'Purée → Mash → Soft chunks', nutrients: ['Vitamin A', 'Fiber', 'Potassium'], tip: 'Steam or roast for best flavor. Freezes beautifully.' },
  { id: 'carrot', name: 'Carrot', emoji: '🥕', category: 'Vegetable', minAge: 4, allergen: false, texture: 'Purée → Soft sticks (BLW)', nutrients: ['Vitamin A', 'Vitamin K'], tip: 'Always cook thoroughly — raw carrots are a choking hazard.' },
  { id: 'broccoli', name: 'Broccoli', emoji: '🥦', category: 'Vegetable', minAge: 6, allergen: false, texture: 'Purée → Florets (BLW)', nutrients: ['Vitamin C', 'Folate', 'Iron'], tip: 'Steam until very soft. Great BLW finger food when soft.' },
  { id: 'yellow-squash', name: 'Yellow Squash', emoji: '🌽', category: 'Vegetable', minAge: 4, allergen: false, texture: 'Purée → Soft pieces', nutrients: ['Vitamin C', 'Magnesium'], tip: 'Mild flavor — great for mixing into stronger purées.' },
  { id: 'tomato', name: 'Tomato', emoji: '🍅', category: 'Vegetable', minAge: 6, allergen: false, texture: 'Purée (seeded)', nutrients: ['Vitamin C', 'Lycopene'], tip: 'Roast first for sweetness. Remove seeds. Acidic — introduce in small amounts.' },
  { id: 'peas', name: 'Peas', emoji: '🟢', category: 'Vegetable', minAge: 4, allergen: false, texture: 'Purée → Squished whole peas', nutrients: ['Protein', 'Fiber', 'Iron'], tip: 'Frozen peas steamed then puréed are just as nutritious as fresh.' },
  { id: 'spinach', name: 'Spinach', emoji: '🥬', category: 'Vegetable', minAge: 6, allergen: false, texture: 'Purée (blended into other purées)', nutrients: ['Iron', 'Folate', 'Vitamin K'], tip: 'Blend into sweet potato or banana to mask bitterness.' },
  { id: 'cauliflower', name: 'Cauliflower', emoji: '🥦', category: 'Vegetable', minAge: 6, allergen: false, texture: 'Purée → Soft florets', nutrients: ['Vitamin C', 'Choline'], tip: 'Mild and creamy when puréed. Easy to mix with other veg.' },
  { id: 'butternut-squash', name: 'Butternut Squash', emoji: '🎃', category: 'Vegetable', minAge: 4, allergen: false, texture: 'Purée → Soft cubes', nutrients: ['Vitamin A', 'Vitamin C'], tip: 'Naturally sweet — babies love it. Roast for deeper flavor.' },
  { id: 'zucchini', name: 'Zucchini', emoji: '🫑', category: 'Vegetable', minAge: 6, allergen: false, texture: 'Purée → Soft sticks', nutrients: ['Potassium', 'Vitamin B6'], tip: 'High water content — blend with thicker veg for better consistency.' },
  { id: 'cucumber', name: 'Cucumber', emoji: '🥒', category: 'Vegetable', minAge: 6, allergen: false, texture: 'Purée (peeled, seeded) → Soft spear (BLW)', nutrients: ['Hydration', 'Vitamin K', 'Potassium'], tip: 'Always peel and remove seeds. Cold cucumber spears can soothe teething gums.' },
  { id: 'eggplant', name: 'Eggplant', emoji: '🍆', category: 'Vegetable', minAge: 7, allergen: false, texture: 'Purée (roasted) → Soft mash', nutrients: ['Fiber', 'Antioxidants', 'Vitamin B6'], tip: 'Roast or steam until very soft before blending. Great mixed into dal or lentil purées.' },

  // ── Fruits ──
  { id: 'banana', name: 'Banana', emoji: '🍌', category: 'Fruit', minAge: 4, allergen: false, texture: 'Mash → Spear (BLW)', nutrients: ['Potassium', 'Vitamin B6', 'Magnesium'], tip: 'No cooking needed. Riper = sweeter and easier to digest.' },
  { id: 'avocado', name: 'Avocado', emoji: '🥑', category: 'Fruit', minAge: 4, allergen: false, texture: 'Mash → Spear (BLW)', nutrients: ['Healthy fats', 'Folate', 'Potassium'], tip: 'Best fresh — browns quickly. Healthy fat is great for brain development.' },
  { id: 'pear', name: 'Pear', emoji: '🍐', category: 'Fruit', minAge: 4, allergen: false, texture: 'Purée → Soft pieces', nutrients: ['Fiber', 'Vitamin C'], tip: 'Very gentle on digestion. Good for constipation.' },
  { id: 'mango', name: 'Mango', emoji: '🥭', category: 'Fruit', minAge: 6, allergen: false, texture: 'Purée → Soft spears', nutrients: ['Vitamin A', 'Vitamin C', 'Folate'], tip: 'Very ripe Alphonso mangoes (in season) are naturally sweet and creamy.' },
  { id: 'apple', name: 'Apple', emoji: '🍎', category: 'Fruit', minAge: 4, allergen: false, texture: 'Purée (cooked) → Soft pieces', nutrients: ['Fiber', 'Vitamin C'], tip: 'Always cook before serving. Great mixed with cinnamon.' },
  { id: 'peach', name: 'Peach', emoji: '🍑', category: 'Fruit', minAge: 6, allergen: false, texture: 'Purée → Soft pieces', nutrients: ['Vitamin A', 'Vitamin C'], tip: 'Peel well. Frozen peaches work great year-round.' },
  { id: 'blueberry', name: 'Blueberry', emoji: '🫐', category: 'Fruit', minAge: 6, allergen: false, texture: 'Purée or halved/squished (BLW)', nutrients: ['Antioxidants', 'Vitamin C', 'Fiber'], tip: 'Always squish or purée — whole blueberries are a choking hazard.' },
  { id: 'strawberry', name: 'Strawberry', emoji: '🍓', category: 'Fruit', minAge: 6, allergen: false, texture: 'Purée → Soft mashed pieces', nutrients: ['Vitamin C', 'Folate', 'Antioxidants'], tip: 'Remove the top and mash or purée well. Pairs beautifully with banana or yogurt.' },

  // ── Proteins ──
  { id: 'egg', name: 'Egg', emoji: '🥚', category: 'Protein', minAge: 6, allergen: true, allergenName: 'Egg', texture: 'Scrambled soft → Strips (BLW)', nutrients: ['Protein', 'Choline', 'Iron'], tip: 'Top allergen — introduce separately. Serve fully cooked.' },
  { id: 'black-beans', name: 'Black Beans', emoji: '🫘', category: 'Protein', minAge: 6, allergen: false, texture: 'Mash → Soft whole beans (older)', nutrients: ['Protein', 'Iron', 'Fiber'], tip: 'Use no-salt canned beans. Pair with vitamin C foods to boost iron absorption.' },
  { id: 'lentils', name: 'Lentils', emoji: '🌿', category: 'Protein', minAge: 6, allergen: false, texture: 'Purée → Soft whole', nutrients: ['Protein', 'Iron', 'Folate'], tip: 'Red lentils cook fastest and purée smoothly. Dal is a perfect first food.' },
  { id: 'chickpeas', name: 'Chickpeas', emoji: '🟡', category: 'Protein', minAge: 7, allergen: false, texture: 'Mash → Soft whole (older)', nutrients: ['Protein', 'Iron', 'Fiber'], tip: 'Remove skins for easier digestion. Great in dal or hummus-style mash.' },
  { id: 'tofu', name: 'Tofu', emoji: '🟨', category: 'Protein', minAge: 6, allergen: true, allergenName: 'Soy', texture: 'Soft cubes (BLW) → Scrambled', nutrients: ['Protein', 'Calcium', 'Iron'], tip: 'Silken tofu can be blended into purées. Firm tofu makes good BLW strips.' },
  { id: 'salmon', name: 'Salmon', emoji: '🐟', category: 'Protein', minAge: 6, allergen: true, allergenName: 'Fish', texture: 'Flaked into purée → Soft flakes (BLW)', nutrients: ['Omega-3', 'Protein', 'Vitamin D'], tip: 'Check carefully for bones. Baked or steamed is safest.' },
  { id: 'chicken', name: 'Chicken', emoji: '🍗', category: 'Protein', minAge: 6, allergen: false, texture: 'Purée → Shredded (BLW)', nutrients: ['Protein', 'Iron', 'Zinc'], tip: 'Thigh meat stays juicier and is easier to purée than breast.' },
  { id: 'peanut-butter', name: 'Peanut Butter', emoji: '🥜', category: 'Protein', minAge: 6, allergen: true, allergenName: 'Peanut', texture: 'Thinned into purée or spread (never whole nuts)', nutrients: ['Protein', 'Healthy fats', 'Vitamin E'], tip: 'Early introduction reduces allergy risk. Always thin with water/formula — thick PB is a choking hazard. Use smooth, no-added-salt only.' },
  { id: 'white-fish', name: 'White Fish', emoji: '🐠', category: 'Protein', minAge: 6, allergen: true, allergenName: 'Fish', texture: 'Flaked into purée → Soft flakes (BLW)', nutrients: ['Protein', 'Omega-3', 'Vitamin D'], tip: 'Cod, tilapia, or sole are mild and low-mercury. Always check for bones carefully. Steam or bake.' },

  // ── Dairy ──
  { id: 'greek-yogurt', name: 'Greek Yogurt', emoji: '🫙', category: 'Dairy', minAge: 6, allergen: true, allergenName: 'Dairy', texture: 'Spoon-fed', nutrients: ['Protein', 'Calcium', 'Probiotics'], tip: 'Full-fat plain only. Supports gut health and brain development.' },
  { id: 'paneer', name: 'Paneer', emoji: '🧀', category: 'Dairy', minAge: 7, allergen: true, allergenName: 'Dairy', texture: 'Soft cubes (BLW) → Crumbled', nutrients: ['Protein', 'Calcium', 'Fat'], tip: 'Soft paneer is a wonderful BLW food and a staple Indian protein for babies.' },
  { id: 'ghee', name: 'Ghee', emoji: '✨', category: 'Dairy', minAge: 6, allergen: false, texture: 'Cooked in / added to food', nutrients: ['Healthy fats', 'Vitamins A,D,E,K'], tip: 'A small amount added to dal or khichdi boosts nutrition and flavor.' },

  // ── Grains ──
  { id: 'oatmeal', name: 'Oatmeal', emoji: '🌾', category: 'Grain', minAge: 6, allergen: false, texture: 'Smooth porridge → Thicker', nutrients: ['Iron', 'Fiber', 'Zinc'], tip: 'Use quick oats for smoothest texture. Fortified oats add extra iron.' },
  { id: 'rice', name: 'Rice', emoji: '🍚', category: 'Grain', minAge: 6, allergen: false, texture: 'Congee / very soft rice', nutrients: ['Carbohydrates', 'B vitamins'], tip: 'Overcooked rice (congee) is a great first grain. Add to khichdi.' },
  { id: 'whole-wheat-bread', name: 'Whole Wheat Toast', emoji: '🍞', category: 'Grain', minAge: 7, allergen: true, allergenName: 'Gluten', texture: 'Strips (BLW)', nutrients: ['Fiber', 'Iron', 'B vitamins'], tip: 'Toast well and cut into finger-length strips. Easy first BLW food.' },

  // ── Spices & Flavor ──
  { id: 'cinnamon', name: 'Cinnamon', emoji: '🟫', category: 'Spice', minAge: 6, allergen: false, texture: 'Added to food', nutrients: ['Antioxidants'], tip: 'Ceylon cinnamon is gentler. Great in apple, banana, or oatmeal.' },
  { id: 'cumin', name: 'Cumin', emoji: '🌰', category: 'Spice', minAge: 6, allergen: false, texture: 'Added to food', nutrients: ['Iron', 'Antioxidants'], tip: 'Lightly bloomed in ghee adds flavor to dal and khichdi. Very baby-friendly.' },
  { id: 'turmeric', name: 'Turmeric', emoji: '🟡', category: 'Spice', minAge: 6, allergen: false, texture: 'Pinch added to food', nutrients: ['Anti-inflammatory'], tip: 'A small pinch in khichdi or dal is traditional and beneficial.' },
  { id: 'coriander', name: 'Coriander', emoji: '🌿', category: 'Spice', minAge: 6, allergen: false, texture: 'Added to food', nutrients: ['Vitamin K', 'Antioxidants'], tip: 'Ground coriander is gentle and fragrant. Works well in vegetable purées.' },
]

export const CATEGORIES = ['All', 'Vegetable', 'Fruit', 'Protein', 'Dairy', 'Grain', 'Spice']
