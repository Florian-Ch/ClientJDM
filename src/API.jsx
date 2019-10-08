
export default class API {

    static async getRelations(word, relation) {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/${word}/${relation}`, {method: 'GET', mode: 'cors'})
        let json = await res.json()
        console.log(json)
    }

    static async getDefinitions(word) {
        let res = await fetch(`${process.env.REACT_APP_API_URL}/${word}/definitions`)
        let json = await res.json()
        return json
    }
}