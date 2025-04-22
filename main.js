// Gene analysis patterns
const genePatterns = {
    'ATCG': {
      nutrients: ['Folic Acid', 'Iron', 'Calcium'],
      foods: [
        { name: 'Spinach', icon: '🥬' },
        { name: 'Salmon', icon: '🐟' },
        { name: 'Greek Yogurt', icon: '🥛' }
      ]
    },
    'GCTA': {
      nutrients: ['Vitamin D', 'Omega-3', 'Protein'],
      foods: [
        { name: 'Eggs', icon: '🥚' },
        { name: 'Nuts', icon: '🥜' },
        { name: 'Fish', icon: '🐟' }
      ]
    },
    'TGCA': {
      nutrients: ['Vitamin B12', 'Zinc', 'Magnesium'],
      foods: [
        { name: 'Lean Meat', icon: '🥩' },
        { name: 'Legumes', icon: '🫘' },
        { name: 'Seeds', icon: '🌱' }
      ]
    },
    'CGAT': {
      nutrients: ['Vitamin C', 'Fiber', 'Potassium'],
      foods: [
        { name: 'Citrus Fruits', icon: '🍊' },
        { name: 'Sweet Potato', icon: '🍠' },
        { name: 'Avocado', icon: '🥑' }
      ]
    },
    'TAGC': {
      nutrients: ['Vitamin E', 'Selenium', 'Copper'],
      foods: [
        { name: 'Almonds', icon: '🥜' },
        { name: 'Brazil Nuts', icon: '🌰' },
        { name: 'Quinoa', icon: '🌾' }
      ]
    },
    'GACT': {
      nutrients: ['Vitamin A', 'Iodine', 'Choline'],
      foods: [
        { name: 'Carrots', icon: '🥕' },
        { name: 'Seaweed', icon: '🌿' },
        { name: 'Eggs', icon: '🥚' }
      ]
    }
  };
  
  const mealPlans = {
    'ATCG': [
      { time: 'Breakfast', items: 'Greek yogurt with berries and nuts' },
      { time: 'Lunch', items: 'Spinach salad with grilled salmon' },
      { time: 'Dinner', items: 'Quinoa bowl with roasted vegetables' },
      { time: 'Snacks', items: 'Apple slices with almond butter, calcium-fortified orange juice' }
    ],
    'GCTA': [
      { time: 'Breakfast', items: 'Scrambled eggs with whole grain toast and avocado' },
      { time: 'Lunch', items: 'Tuna sandwich with mixed greens' },
      { time: 'Dinner', items: 'Grilled fish with sweet potato and broccoli' },
      { time: 'Snacks', items: 'Mixed nuts, banana with peanut butter' }
    ],
    'TGCA': [
      { time: 'Breakfast', items: 'Oatmeal with seeds, fruits, and honey' },
      { time: 'Lunch', items: 'Lentil soup with whole grain bread and hummus' },
      { time: 'Dinner', items: 'Lean beef stir-fry with brown rice and vegetables' },
      { time: 'Snacks', items: 'Pumpkin seeds, yogurt with berries' }
    ],
    'CGAT': [
      { time: 'Breakfast', items: 'Smoothie bowl with mixed fruits and granola' },
      { time: 'Lunch', items: 'Baked sweet potato with black beans and salsa' },
      { time: 'Dinner', items: 'Grilled chicken with roasted vegetables' },
      { time: 'Snacks', items: 'Orange slices, avocado toast' }
    ],
    'TAGC': [
      { time: 'Breakfast', items: 'Quinoa breakfast bowl with nuts and dried fruits' },
      { time: 'Lunch', items: 'Mediterranean salad with olive oil dressing' },
      { time: 'Dinner', items: 'Baked fish with quinoa and steamed vegetables' },
      { time: 'Snacks', items: 'Trail mix with brazil nuts, dark chocolate' }
    ],
    'GACT': [
      { time: 'Breakfast', items: 'Vegetable omelet with seaweed rice balls' },
      { time: 'Lunch', items: 'Carrot ginger soup with seaweed salad' },
      { time: 'Dinner', items: 'Salmon with roasted root vegetables' },
      { time: 'Snacks', items: 'Dried seaweed snacks, hard-boiled eggs' }
    ]
  };
  
  // DOM Elements
  const analyzeButton = document.getElementById('analyzeButton');
  const geneSequence = document.getElementById('geneSequence');
  const results = document.getElementById('results');
  const nutrientsList = document.getElementById('nutrientsList');
  const foodGrid = document.getElementById('foodGrid');
  const mealPlanDiv = document.getElementById('mealPlan');
  const sequenceInfo = document.querySelector('.sequence-info');
  
  // Analyze sequence function
  async function analyzeSequence() {
    const sequence = geneSequence.value.trim().toUpperCase();
    
    if (!sequence) {
      alert('Please enter a gene sequence');
      return;
    }
  
    if (sequence.length < 4) {
      alert('Please enter a sequence of at least 4 characters');
      return;
    }
  
    if (!/^[ATCG]+$/.test(sequence)) {
      alert('Please enter a valid DNA sequence containing only A, T, C, and G');
      return;
    }
  
    analyzeButton.disabled = true;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const pattern = sequence.slice(0, 4);
    const recommendations = genePatterns[pattern] || genePatterns['ATCG'];
    const plan = mealPlans[pattern] || mealPlans['ATCG'];
    
    sequenceInfo.textContent = `Analyzed sequence pattern: ${pattern}`;
    
    nutrientsList.innerHTML = recommendations.nutrients
      .map(nutrient => `<li>${nutrient}</li>`)
      .join('');
    
    foodGrid.innerHTML = recommendations.foods
      .map(food => `
        <div class="food-item">
          <div class="food-icon">${food.icon}</div>
          <div class="food-name">${food.name}</div>
        </div>
      `)
      .join('');
    
    mealPlanDiv.innerHTML = plan
      .map(meal => `
        <div class="meal">
          <div class="meal-title">${meal.time}</div>
          <div class="meal-items">${meal.items}</div>
        </div>
      `)
      .join('');
    
    results.classList.remove('hidden');
    results.classList.add('visible');
    
    analyzeButton.disabled = false;
  }
  
  // Event Listeners
  analyzeButton.addEventListener('click', analyzeSequence);