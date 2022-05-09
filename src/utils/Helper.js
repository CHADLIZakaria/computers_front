class Helper {
    extractTitle = (title) => {
        const words = 
            title.split(',')
            .filter(element => !element.trim().includes('Aucun'))
            .map((element, i) => {
            if(i < title.split(',').length-2) return element+' -'
            
            else return element;
            })
            .join('')
        return words;
    }
}
export default new Helper();
