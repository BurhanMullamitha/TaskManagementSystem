export const generateColorArray = (numLabels: string[]) => {
    let colorArray = [];
    for (let i = 0; i < numLabels.length; i++) {
        const red = Math.floor(Math.random() * 128) + 127;
        const green = Math.floor(Math.random() * 128) + 127;
        const blue = Math.floor(Math.random() * 128) + 127;
        colorArray.push(`rgba(${red}, ${green}, ${blue}, 0.6)`);
    }
    return colorArray;
}