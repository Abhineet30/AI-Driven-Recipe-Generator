document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ingredient-form');
    const recipeOutput = document.getElementById('recipe-output');
    const recipeSteps = document.getElementById('recipe-steps');
    const timerSection = document.getElementById('timer-section');
    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer');
    const resetTimerBtn = document.getElementById('reset-timer');

    let timerDuration = 0; // in seconds
    let timerInterval = null;
    let timeLeft = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const ingredientsInput = document.getElementById('ingredients').value.trim();
        if (!ingredientsInput) return;

        const ingredients = ingredientsInput.split(',').map(i => i.trim()).filter(i => i.length > 0);
        if (ingredients.length === 0) return;

        generateRecipe(ingredients);
    });

    function generateRecipe(ingredients) {
        // Simulate AI recipe generation based on ingredients and prompt
        // For demo, we use a fixed recipe for broccoli, chicken, and rice under 30 minutes
        const lowerIngredients = ingredients.map(i => i.toLowerCase());
        if (lowerIngredients.includes('broccoli') && lowerIngredients.includes('chicken') && lowerIngredients.includes('rice')) {
            const recipe = {
                title: "Healthy Broccoli, Chicken, and Rice Dinner",
                steps: [
                    "1. Rinse and chop the broccoli into florets.",
                    "2. Cut the chicken into bite-sized pieces.",
                    "3. Cook the rice according to package instructions (about 20 minutes).",
                    "4. In a large pan, heat some olive oil over medium heat.",
                    "5. Add the chicken pieces and cook until browned and cooked through, about 7-8 minutes.",
                    "6. Add the broccoli florets to the pan and sauté for 4-5 minutes until tender-crisp.",
                    "7. Season with salt, pepper, and your favorite herbs.",
                    "8. Serve the chicken and broccoli over the cooked rice.",
                    "9. Enjoy your healthy dinner!"
                ],
                cookingTime: 30 // minutes
            };
            displayRecipe(recipe);
        } else {
            // Generic fallback recipe
            const recipe = {
                title: "Simple Mixed Ingredient Recipe",
                steps: [
                    "1. Prepare your ingredients.",
                    "2. Cook them according to your preference.",
                    "3. Season and serve."
                ],
                cookingTime: 20
            };
            displayRecipe(recipe);
        }
    }

    function displayRecipe(recipe) {
        recipeOutput.classList.remove('hidden');
        recipeSteps.innerHTML = `<h3>${recipe.title}</h3><ol>${recipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>`;
        timerDuration = recipe.cookingTime * 60; // convert minutes to seconds
        timeLeft = timerDuration;
        timerDisplay.textContent = formatTime(timeLeft);
        timerSection.classList.remove('hidden');
    }

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    startTimerBtn.addEventListener('click', () => {
        if (timerInterval) return; // timer already running
        timerInterval = setInterval(() => {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("Time's up! Your dish should be ready.");
                return;
            }
            timeLeft--;
            timerDisplay.textContent = formatTime(timeLeft);
        }, 1000);
    });

    resetTimerBtn.addEventListener('click', () => {
        clearInterval(timerInterval);
        timerInterval = null;
        timeLeft = timerDuration;
        timerDisplay.textContent = formatTime(timeLeft);
    });
});
