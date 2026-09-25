exports.handler = async () => {
  const { generateWithFreeAI } = require("./lib/ai-engine");
  const { generateFoodImageFree } = require("./lib/image-engine");
  const { runPipeline } = require("./lib/pipeline");
  const { saveRecipe } = require("./lib/db");
  try {
    const { recipe } = await generateWithFreeAI("Family Dinner Rice Cooker High-Protein");
    const p = await runPipeline(recipe);
    if (!p.ok) throw new Error("Q");
    const img = await generateFoodImageFree(recipe);
    await saveRecipe(recipe, img);
    return { statusCode: 200, body: "Dinner OK" };
  } catch (e) { return { statusCode: 500, body: e.message }; }
};
