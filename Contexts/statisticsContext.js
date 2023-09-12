import link from "../Models/LinksModel.js";

const Statistics = {
  clicForTarget: async (uniqueName) => {
    console.log("context",uniqueName);
    let target = await link.find({ uniqueName });
    console.log(target);
    let clicks = target[0].clicks;
    console.log("clicks",clicks);
    let targetValues = target[0].targetValues;
    let valueTarget = [];
    for (let i = 0; i < targetValues.length; i++) {
      await valueTarget.push({ value: targetValues[i].value, cnt: 0 });
    }
    console.log(valueTarget);  
    let index;
    for (let i = 0; i < clicks.length; i++) {
      for (index = 0; index < valueTarget.length; index++) {
        console.log("innerInd",index)
        if (valueTarget[index].valuTe === clicks[i].targetParamValue) { break; }
      }
      console.log("outInd",index);
      console.log("value",valueTarget);
      await valueTarget[index].cnt++;
    } 
    return valueTarget;  
  },
};

export default Statistics;
