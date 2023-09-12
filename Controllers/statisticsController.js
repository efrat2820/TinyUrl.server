import context from "../Contexts/statisticsContext.js"
const Statistics = {
  clicForTarget: async (req, res) => {
      console.log("controller");
      
    const target=await context.clicForTarget(req.params.uniqueName);
    res.send(target);
  },
};

export default Statistics; 